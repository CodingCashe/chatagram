"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type ConnectorStyle = "default" | "dotted" | "dashed" | "gradient" | "pulse" | "glow"

type FancyConnectorProps = {
  direction?: "vertical" | "horizontal"
  style?: ConnectorStyle
  color?: string
  length?: number | string
  thickness?: number
  withArrow?: boolean
  animated?: boolean
  label?: string
}

export const FancyConnector = ({
  direction = "vertical",
  style = "default",
  color = "#3352CC", // connector color
  length = direction === "vertical" ? 60 : 100,
  thickness = 2,
  withArrow = false,
  animated = true,
  label,
}: FancyConnectorProps) => {
  const [dashOffset, setDashOffset] = useState(0)

  // Animation for dashed/dotted lines
  useEffect(() => {
    if (!animated || (style !== "dotted" && style !== "dashed")) return

    const interval = setInterval(() => {
      setDashOffset((prev) => (prev + 1) % 60)
    }, 100)

    return () => clearInterval(interval)
  }, [animated, style])

  // Determine line style
  const getLineStyle = () => {
    switch (style) {
      case "dotted":
        return {
          strokeDasharray: "2 6",
          strokeDashoffset: dashOffset,
        }
      case "dashed":
        return {
          strokeDasharray: "8 6",
          strokeDashoffset: dashOffset,
        }
      case "gradient":
      case "glow":
      case "pulse":
      case "default":
      default:
        return {}
    }
  }

  // SVG definitions for gradient and glow
  const svgDefs = () => {
    if (style === "gradient") {
      return (
        <defs>
          <linearGradient id="connector-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3352CC" />
            <stop offset="50%" stopColor="#A76DF7" />
            <stop offset="100%" stopColor="#3352CC" />
          </linearGradient>
        </defs>
      )
    }

    if (style === "glow") {
      return (
        <defs>
          <filter id="connector-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
      )
    }

    return null
  }

  // Animation for the connector
  const lineAnimation = animated
    ? {
        pathLength: style === "pulse" ? [0.8, 1, 0.8] : 1,
        opacity: style === "pulse" ? [0.6, 1, 0.6] : 1,
        transition: {
          pathLength: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
          opacity: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
        },
      }
    : {}

  // Determine stroke properties
  const getStrokeProps = () => {
    if (style === "gradient") {
      return { stroke: "url(#connector-gradient)" }
    }
    if (style === "glow") {
      return {
        stroke: color,
        filter: "url(#connector-glow)",
        opacity: 0.8,
      }
    }
    return { stroke: color }
  }

  // Arrow marker for the end of the line
  const arrowMarker = withArrow ? (
    <marker id="connector-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill={style === "gradient" ? "#3352CC" : color} />
    </marker>
  ) : null

  const isVertical = direction === "vertical"
  const svgWidth = isVertical ? 20 : typeof length === "number" ? length : 100
  const svgHeight = isVertical ? (typeof length === "number" ? length : 60) : 20

  return (
    <div className="relative flex items-center justify-center">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="overflow-visible">
        {svgDefs()}
        {arrowMarker}

        {isVertical ? (
          <motion.line
            x1={svgWidth / 2}
            y1="0"
            x2={svgWidth / 2}
            y2={svgHeight}
            strokeWidth={thickness}
            {...getStrokeProps()}
            {...getLineStyle()}
            markerEnd={withArrow ? "url(#connector-arrow)" : ""}
            animate={lineAnimation}
          />
        ) : (
          <motion.line
            x1="0"
            y1={svgHeight / 2}
            x2={svgWidth}
            y2={svgHeight / 2}
            strokeWidth={thickness}
            {...getStrokeProps()}
            {...getLineStyle()}
            markerEnd={withArrow ? "url(#connector-arrow)" : ""}
            animate={lineAnimation}
          />
        )}

        {/* Circles at each end of the connector */}
        <circle cx={isVertical ? svgWidth / 2 : 0} cy={isVertical ? 0 : svgHeight / 2} r={thickness + 1} fill={color} />
        <circle
          cx={isVertical ? svgWidth / 2 : svgWidth}
          cy={isVertical ? svgHeight : svgHeight / 2}
          r={thickness + 1}
          fill={color}
        />
      </svg>

      {/* Optional label in the middle of the connector */}
      {label && (
        <div
          className={`absolute bg-background-90 px-2 rounded text-xs ${isVertical ? "left-full ml-1" : "top-1/2 -translate-y-1/2"}`}
          style={{
            top: "50%",
            left: isVertical ? "50%" : undefined,
            transform: isVertical ? "translateY(-50%)" : undefined,
            color,
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}

