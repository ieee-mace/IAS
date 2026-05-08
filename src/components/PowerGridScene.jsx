import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function fibonacciSphere(count, radius) {
  const points = []
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    points.push(new THREE.Vector3(
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius
    ))
  }
  return points
}

const GLOBE_RADIUS = 1.8

export default function PowerGridScene({ onCountsReady }) {
  const globeRef = useRef()
  const nodesRef = useRef()
  const pulsesRef = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })
  const [hoveredNode, setHoveredNode] = useState(null)

  const isMobile = window.innerWidth < 768
  const NODE_COUNT = isMobile ? 18 : 30
  const MAX_EDGES = isMobile ? 30 : 55
  const PULSE_COUNT = isMobile ? 4 : 8

  // Generate Geometry
  const { nodes, edges } = useMemo(() => {
    const pts = fibonacciSphere(NODE_COUNT, GLOBE_RADIUS)
    
    const edgePairs = []
    const edgeSet = new Set()
    
    pts.forEach((pt, i) => {
      const distances = pts.map((other, j) => ({
        index: j,
        dist: pt.distanceTo(other)
      })).filter(d => d.index !== i).sort((a, b) => a.dist - b.dist)
      
      const connections = 2 + Math.floor(Math.random() * 2)
      for(let k = 0; k < connections; k++) {
        const targetIdx = distances[k].index
        const minIdx = Math.min(i, targetIdx)
        const maxIdx = Math.max(i, targetIdx)
        const key = `${minIdx}-${maxIdx}`
        if (!edgeSet.has(key)) {
          edgeSet.add(key)
          edgePairs.push({ start: pt, end: pts[targetIdx] })
        }
      }
    })
    
    const finalEdges = edgePairs.slice(0, MAX_EDGES)
    
    if (onCountsReady) {
      onCountsReady({ nodes: NODE_COUNT, edges: finalEdges.length, pulses: PULSE_COUNT })
    }
    
    return { nodes: pts, edges: finalEdges }
  }, [onCountsReady, NODE_COUNT, MAX_EDGES, PULSE_COUNT])

  const lineGeometry = useMemo(() => {
    const points = []
    edges.forEach(edge => {
      points.push(edge.start, edge.end)
    })
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [edges])

  // Pulses State
  const pulsesData = useRef(Array.from({ length: PULSE_COUNT }, () => ({
    edgeIndex: Math.floor(Math.random() * edges.length),
    progress: Math.random(),
    speed: 0.003 + Math.random() * 0.005,
    active: true
  })))

  const dummy = useMemo(() => new THREE.Object3D(), [])
  
  // Mouse Interaction
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Map to container size instead of window if possible, but window is fine for subtle effect
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      targetRotation.current.x = y * 0.1 // subtle tilt
      targetRotation.current.y = x * 0.1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!globeRef.current || !nodesRef.current || !pulsesRef.current) return

    // Auto-rotation + Mouse damping
    globeRef.current.rotation.y += (targetRotation.current.y + state.clock.getElapsedTime() * 0.05 - globeRef.current.rotation.y) * 0.05
    globeRef.current.rotation.x += (targetRotation.current.x + Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1 - globeRef.current.rotation.x) * 0.05

    // Nodes
    nodes.forEach((pos, i) => {
      dummy.position.copy(pos)
      if (hoveredNode === i) {
        dummy.scale.set(2, 2, 2)
      } else {
        dummy.scale.set(1, 1, 1)
      }
      dummy.updateMatrix()
      nodesRef.current.setMatrixAt(i, dummy.matrix)
      
      const color = new THREE.Color(hoveredNode === i ? '#FFFFFF' : '#22C55E')
      nodesRef.current.setColorAt(i, color)
    })
    nodesRef.current.instanceMatrix.needsUpdate = true
    if (nodesRef.current.instanceColor) nodesRef.current.instanceColor.needsUpdate = true

    // Pulses
    pulsesData.current.forEach((pulse, i) => {
      pulse.progress += pulse.speed
      if (pulse.progress >= 1.0) {
        pulse.progress = 0
        pulse.edgeIndex = Math.floor(Math.random() * edges.length)
        pulse.speed = 0.003 + Math.random() * 0.005
      }

      const edge = edges[pulse.edgeIndex]
      dummy.position.lerpVectors(edge.start, edge.end, pulse.progress)
      dummy.scale.set(1, 1, 1)
      dummy.updateMatrix()
      pulsesRef.current.setMatrixAt(i, dummy.matrix)
    })
    pulsesRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <group ref={globeRef}>
      {/* Globe Wireframe */}
      <mesh>
        <icosahedronGeometry args={[GLOBE_RADIUS - 0.02, 2]} />
        <meshBasicMaterial color="#22C55E" wireframe transparent opacity={0.06} />
      </mesh>
      
      {/* Atmosphere Glow */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.1, 32, 32]} />
        <meshBasicMaterial color="#22C55E" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      {/* Edges */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#1A7A4A" transparent opacity={0.6} />
      </lineSegments>

      {/* Nodes InstancedMesh */}
      <instancedMesh 
        ref={nodesRef} 
        args={[null, null, NODE_COUNT]}
        onPointerMove={(e) => { e.stopPropagation(); setHoveredNode(e.instanceId) }}
        onPointerOut={(e) => { e.stopPropagation(); setHoveredNode(null) }}
      >
        <icosahedronGeometry args={[0.04, 0]} />
        <meshBasicMaterial />
      </instancedMesh>

      {/* Pulses InstancedMesh */}
      <instancedMesh ref={pulsesRef} args={[null, null, PULSE_COUNT]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#F7B731" />
      </instancedMesh>
    </group>
  )
}
