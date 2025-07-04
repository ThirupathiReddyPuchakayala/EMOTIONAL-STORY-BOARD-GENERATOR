"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface StyleSelectorProps {
  selectedStyle: string
  onStyleChange: (style: string) => void
}

export default function StyleSelector({ selectedStyle, onStyleChange }: StyleSelectorProps) {
  const styles = [
    { id: "cinematic", name: "Cinematic", description: "Hollywood-style realistic visuals" },
    { id: "anime", name: "Anime", description: "Japanese animation style" },
    { id: "noir", name: "Film Noir", description: "High contrast black and white" },
    { id: "watercolor", name: "Watercolor", description: "Artistic watercolor painting style" },
  ]

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Visual Style</h3>
      <RadioGroup value={selectedStyle} onValueChange={onStyleChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styles.map((style) => (
          <div key={style.id} className="flex items-center space-x-2">
            <RadioGroupItem value={style.id} id={style.id} />
            <Label htmlFor={style.id} className="cursor-pointer flex flex-col">
              <span className="font-medium">{style.name}</span>
              <span className="text-xs text-muted-foreground">{style.description}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

