'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import * as d3 from 'd3'
import cloud from 'd3-cloud'

interface WordData {
  text: string;
  size: number;
  x?: number;
  y?: number;
  rotate?: number;
}

const HashtagCloud: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) return

    const { width, height } = dimensions

    const words: WordData[] = [
      'travel', 'food', 'fashion', 'fitness', 'photography',
      'art', 'music', 'nature', 'technology', 'business',
      'motivation', 'lifestyle', 'beauty', 'health', 'love',
      'adventure', 'coffee', 'design', 'yoga', 'mindfulness'
    ].map(word => ({
      text: `#${word}`,
      size: 10 + Math.random() * 40
    }))

    const layout = cloud<WordData>()
      .size([width, height])
      .words(words)
      .padding(5)
      .rotate(() => (~~(Math.random() * 6) - 3) * 30)
      .font("Impact")
      .fontSize(d => d.size)
      .on("end", draw)

    layout.start()

    function draw(words: WordData[]) {
      d3.select(svgRef.current).selectAll("*").remove()

      const svg = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)

      svg.selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text)
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
    }
  }, [dimensions])

  return (
    <Card className="h-[400px] overflow-hidden">
      <CardHeader>
        <CardTitle>Trending Hashtags</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)] overflow-auto">
        <svg ref={svgRef} width="100%" height="100%"></svg>
      </CardContent>
    </Card>
  )
}

export default HashtagCloud

