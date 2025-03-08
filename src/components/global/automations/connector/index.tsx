import { cn } from "@/lib/utils"

type Props = {
  direction: "horizontal" | "vertical"
  style: "solid" | "dashed" | "dotted" | "gradient"
  length?: number
  width?: number
  color?: string
}

export const FancyConnector = ({
  direction = "vertical",
  style = "dashed",
  length = 10,
  width = 2,
  color = "#768BDD",
}: Props) => {
  const isVertical = direction === "vertical"

  // Set dimensions based on direction
  const dimensions = isVertical
    ? { height: `${length}px`, width: `${width}px` }
    : { width: `${length}px`, height: `${width}px` }

  // Set border styles
  let borderStyle = ""
  if (style === "solid") borderStyle = "bg-current"
  if (style === "dashed") borderStyle = "border-dashed border-2 border-current bg-transparent"
  if (style === "dotted") borderStyle = "border-dotted border-2 border-current bg-transparent"

  // For gradient style
  const gradientStyle = isVertical
    ? { background: `linear-gradient(to bottom, ${color}, rgba(118, 139, 221, 0.3))` }
    : { background: `linear-gradient(to right, ${color}, rgba(118, 139, 221, 0.3))` }

  return (
    <div className={cn("relative flex items-center justify-center", isVertical ? "flex-col" : "flex-row")}>
      <div
        className={cn("relative", style !== "gradient" && borderStyle)}
        style={{
          ...dimensions,
          ...(style === "gradient" ? gradientStyle : { color }),
        }}
      >
        {/* Add animated dots for gradient style */}
        {style === "gradient" && (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={cn(
                "absolute bg-white/30 rounded-full",
                isVertical ? "w-full h-2 animate-flow-down" : "h-full w-2 animate-flow-right",
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}

