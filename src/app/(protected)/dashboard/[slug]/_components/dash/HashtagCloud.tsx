'use client'

import React, { useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 400
    const height = 300

    const words: WordData[] = [
      'travel', 'food', 'fashion', 'fitness', 'photography',
      'art', 'music', 'nature', 'technology', 'business',
      'motivation', 'lifestyle', 'beauty', 'health', 'love'
    ].map(word => ({
      text: `#${word}`,
      size: 10 + Math.random() * 60
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
      d3.select(svgRef.current)
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr("transform", `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`)
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text(d => d.text)
        .style("fill", () => d3.schemeCategory10[Math.floor(Math.random() * 10)])
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Hashtags</CardTitle>
      </CardHeader>
      <CardContent>
        <svg ref={svgRef}></svg>
      </CardContent>
    </Card>
  )
}

export default HashtagCloud

