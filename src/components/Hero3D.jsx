import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function RotatingIcosahedron() {
  const meshRef = useRef()
  const wireRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15
      meshRef.current.rotation.y = t * 0.2
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.15
      wireRef.current.rotation.y = t * 0.2
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial
          color="#00629B"
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshStandardMaterial
          color="#F7B731"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}

function ParticleField() {
  const count = 800
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    return pos
  }, [])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.01
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#3B82F6"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}

const Hero3D = () => {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#3B82F6" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#F7B731" />
        <pointLight position={[0, 5, 0]} intensity={0.3} color="#ffffff" />
        <RotatingIcosahedron />
        <ParticleField />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  )
}

export default Hero3D
