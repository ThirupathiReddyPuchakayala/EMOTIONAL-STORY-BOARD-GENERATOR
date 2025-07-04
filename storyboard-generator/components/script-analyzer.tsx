import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ScriptAnalyzerProps {
  script: string
}

export default function ScriptAnalyzer({ script }: ScriptAnalyzerProps) {
  // This is a simplified version - in a real app, this would be done on the backend
  const scenes = script
    .split(/\n{2,}/)
    .filter((scene) => scene.trim().length > 0)
    .slice(0, 5) // Limit to 5 scenes for demo purposes

  // Mock emotion analysis
  const emotions = ["tense", "joyful", "melancholic", "suspenseful", "romantic"]

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground mb-4">
        The script has been divided into scenes. Each scene will be analyzed for emotional tone and visual elements.
      </p>

      {scenes.map((scene, index) => {
        // In a real app, this would be determined by AI analysis
        const emotion = emotions[index % emotions.length]

        return (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">Scene {index + 1}</h3>
              <Badge
                variant={
                  emotion === "joyful"
                    ? "default"
                    : emotion === "tense"
                      ? "destructive"
                      : emotion === "melancholic"
                        ? "secondary"
                        : emotion === "suspenseful"
                          ? "outline"
                          : "default"
                }
              >
                {emotion}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {scene.length > 150 ? `${scene.substring(0, 150)}...` : scene}
            </p>
          </Card>
        )
      })}

      {scenes.length === 0 && (
        <p className="text-center text-muted-foreground">
          No scenes detected. Please enter a script with clear scene breaks.
        </p>
      )}
    </div>
  )
}

