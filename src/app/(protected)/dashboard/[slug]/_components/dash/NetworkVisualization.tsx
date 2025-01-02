'use client'

import React, { useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d'

interface GraphData {
  nodes: Array<{
    id: number;
    name: string;
    val: number;
  }>;
  links: Array<{
    source: number;
    target: number;
  }>;
}

const NetworkVisualization = () => {
  const fgRef = useRef<ForceGraphMethods>();

  const generateRandomGraph = (): GraphData => {
    const nodes = [];
    const links = [];
    const numNodes = 100;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        id: i,
        name: `User ${i}`,
        val: Math.floor(Math.random() * 20) + 1
      });
    }

    for (let i = 0; i < numNodes; i++) {
      const numLinks = Math.floor(Math.random() * 3) + 1;
      for (let j = 0; j < numLinks; j++) {
        const target = Math.floor(Math.random() * numNodes);
        if (target !== i) {
          links.push({
            source: i,
            target
          });
        }
      }
    }

    return { nodes, links };
  };

  const graphData = generateRandomGraph();

  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;

    fg.d3Force('charge')?.strength(-120);

    fg.d3Force('link')?.distance(() => 30 + Math.random() * 20);

    let angle = 0;
    const interval = setInterval(() => {
      angle += Math.PI / 300;
      fg.cameraPosition(
        { x: 400 * Math.cos(angle), z: 400 * Math.sin(angle) },
        { x: 0, y: 0, z: 0 },
        3000
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-[400px]">
      <CardHeader>
        <CardTitle>Your Instagram Network</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ForceGraph3D
          ref={fgRef}
          graphData={graphData}
          nodeLabel="name"
          nodeRelSize={6}
          nodeColor={() => `hsl(${Math.random() * 360}, 70%, 50%)`}
          linkColor={() => 'rgba(255,255,255,0.2)'}
          backgroundColor="rgba(0,0,0,0)"
        />
      </CardContent>
    </Card>
  );
};

export default NetworkVisualization;

