import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface StoryboardItem {
  scene: string
  emotion: string
  imageUrl: string
}

interface StoryboardDisplayProps {
  storyboard: StoryboardItem[]
}

export default function StoryboardDisplay({ storyboard }: StoryboardDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {storyboard.map((item, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src={item.imageUrl || `/placeholder.svg?height=300&width=400`}
              alt={`Scene ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Scene {index + 1}</h3>
              <Badge
                variant={
                  item.emotion === "joyful"
                    ? "default"
                    : item.emotion === "tense"
                      ? "destructive"
                      : item.emotion === "melancholic"
                        ? "secondary"
                        : item.emotion === "suspenseful"
                          ? "outline"
                          : "default"
                }
              >
                {item.emotion}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {item.scene.length > 100 ? `${item.scene.substring(0, 100)}...` : item.scene}
            </p>
          </div>
        </Card>
      ))}

      {storyboard.length === 0 && (
        <p className="col-span-full text-center text-muted-foreground py-12">No storyboard frames generated yet.</p>
      )}
    </div>
  )
}

