# 🎬 Emotional Storyboard Generator for Filmmakers

An AI-powered web application that transforms film scripts into **emotionally expressive storyboards**, helping **filmmakers, writers, and content creators** previsualize their stories—**without manual sketching or artistic expertise**.

Developed as a final-year project (Jan 2025 - Apr 2025).

---

## 🧠 Overview

This tool uses **Natural Language Processing (NLP)** to analyze the **emotional tone** of each scene in a script and generate corresponding visuals using **Stable Diffusion**. It streamlines the pre-production process and accelerates visual storytelling.

---

## ✨ Key Features

- 🎭 **Emotion Detection**: Scene-wise emotion classification using fine-tuned **Hugging Face Transformers**
- 🖼️ **AI-Generated Visuals**: Uses **Stable Diffusion** to generate scene illustrations matching the detected emotion
- 📝 **Script Upload**: Secure file upload and backend processing
- 🎛️ **Interactive Storyboard**: Edit, rearrange, or regenerate individual frames
- 🚀 **Scalable Deployment**: Flask-based backend with deployment on **Vercel**
- 💾 **Database Support**: Flask-Migrate for versioned DB schema migrations

---

## 🧪 Tech Stack

| Category        | Technologies Used                                           |
|----------------|-------------------------------------------------------------|
| Backend         | Flask, Flask-Migrate, Python                                |
| AI/NLP          | HuggingFace Transformers (e.g., BERT, RoBERTa), Emotion Datasets |
| Image Generation| Stable Diffusion                                            |
| Frontend        | HTML/CSS (optional React integration)                       |
| Deployment      | Vercel, Gunicorn (optional), GitHub Actions (CI/CD)         |
| Tools/Other     | Cursor IDE, Git, Postman (for API testing)                  |

---

## 📂 Project Structure
![{25540F98-F581-4CC3-9625-DA1BCF530950}](https://github.com/user-attachments/assets/ec4b566c-1910-4a52-b61d-b076ace9febc)


## 🚀 Getting Started (Local Setup)

### Prerequisites

- Python 3.8+
- virtualenv or conda
- HuggingFace API Key (for model downloads)
- Vercel account (for deployment)
- GPU (optional for Stable Diffusion)

### Installation

```bash
git clone https://github.com/your-username/emotional-storyboard.git
cd emotional-storyboard
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```
Run Locally
```bash
flask db upgrade
flask run
```
Open your browser and go to: http://localhost:5000

## 🛠 How It Works
Upload your script in .txt format.
The script is split scene-wise and passed through the emotion classifier.
Detected emotions are used as prompts for Stable Diffusion to generate matching visuals.
The storyboard is rendered in an interactive UI for further editing/export.

## 📸 Example
Input Script:
INT. HOSPITAL ROOM - NIGHT
She lies still. The monitor beeps faintly. Her father holds her hand, tears streaming.
Detected Emotion: Sadness
Generated Scene:

## 🔐 Security & Privacy
Uploaded scripts are stored securely and automatically deleted after processing (configurable).
No data is shared with third-party services.

## 📚 Citation
If you use this project for academic or development purposes, please cite it as:

```bibtex
@project{reddy2025emotionalstoryboard,
  title     = {Emotional Storyboard Generator for Filmmakers},
  author    = {Puchakayala, Thirupathi Reddy},
  year      = {2025},
  month     = {April},
  howpublished = {\url{https://github.com/ThirupathiReddyPuchakayala/EMOTIONAL-STORY-BOARD-GENERATOR}},
  note      = {An AI-powered web application to convert film scripts into emotion-driven storyboards using NLP and Stable Diffusion.}
}


