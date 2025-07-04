from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from transformers import pipeline
import time
import random
import re
import os
from dotenv import load_dotenv
from diffusers import StableDiffusionPipeline
import torch
from PIL import Image
import io
import base64

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Configure CORS specifically for API routes

# Load the emotion analysis pipeline (Hugging Face model)
try:
    emotion_pipeline = pipeline("text-classification", model=os.getenv("EMOTION_MODEL", "j-hartmann/emotion-english-distilroberta-base"))
except Exception as e:
    print(f"Error loading emotion pipeline: {e}")
    emotion_pipeline = None

# Initialize Stable Diffusion pipeline with a smaller model
try:
    model_id = os.getenv("MODEL_ID", "CompVis/stable-diffusion-v1-4")  # Using a smaller model
    pipe = StableDiffusionPipeline.from_pretrained(
        model_id,
        torch_dtype=torch.float32,
        safety_checker=None  # Disable safety checker for faster generation
    )
    if torch.cuda.is_available():
        pipe = pipe.to("cuda")
        pipe.enable_attention_slicing()  # Enable memory optimization
        print("Using CUDA for image generation")
    else:
        print("CUDA not available, using CPU. This will be slow!")
except Exception as e:
    print(f"Error loading Stable Diffusion model: {e}")
    pipe = None

def analyze_emotion(text):
    """Analyze emotion using a pre-trained NLP model."""
    try:
        if not emotion_pipeline:
            return "neutral"  # Default emotion if pipeline fails to load
        result = emotion_pipeline(text)[0]
        return result['label']
    except Exception as e:
        print(f"Error in emotion analysis: {e}")
        return "neutral"

def generate_image(scene_text, emotion, style):
    """Generate an image using Stable Diffusion."""
    try:
        if not pipe:
            return None

        # Create a more detailed prompt with better guidance
        prompt = f"A {style} scene: {scene_text}, {emotion} atmosphere, cinematic lighting, detailed, high quality, 4k, professional photography"
        negative_prompt = "blurry, low quality, distorted, ugly, bad anatomy, bad proportions, watermark, signature"
        
        # Generate the image with optimized parameters
        image = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=int(os.getenv("NUM_INFERENCE_STEPS", "20")),  # Reduced steps for faster generation
            guidance_scale=float(os.getenv("GUIDANCE_SCALE", "7.5")),
            width=int(os.getenv("IMAGE_WIDTH", "512")),
            height=int(os.getenv("IMAGE_HEIGHT", "512"))
        ).images[0]
        
        # Convert PIL image to base64 string
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG", quality=95)
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        return f"data:image/jpeg;base64,{img_str}"
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

@app.route('/api/analyze', methods=['POST'])
def analyze_script():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        script = data.get('script', '')
        style = data.get('style', 'cinematic')
        
        if not script:
            return jsonify({"error": "Script is required"}), 400
        
        scenes = re.split(r'\n{2,}', script)
        scenes = [scene.strip() for scene in scenes if scene.strip()]
        
        storyboard = []
        for scene in scenes[:6]:  # Limit to first 6 scenes
            emotion = analyze_emotion(scene)
            image_url = generate_image(scene, emotion, style)
            if image_url:  # Only add scenes with successfully generated images
                storyboard.append({
                    "scene": scene,
                    "emotion": emotion,
                    "imageUrl": image_url
                })
        
        if not storyboard:
            return jsonify({"error": "Failed to generate storyboard"}), 500
            
        return jsonify({"storyboard": storyboard})
        
    except Exception as e:
        print(f"Error in analyze_script: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(debug=True)
