'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'


export default function GlobalReach() {
  const mountRef = useRef<HTMLDivElement>(null)
  

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.SphereGeometry(5, 32, 32)
    const texture = new THREE.TextureLoader().load('/world-map.png')
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.8 })
    const globe = new THREE.Mesh(geometry, material)
    scene.add(globe)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.enableZoom = false

    camera.position.z = 10

    const animate = () => {
      requestAnimationFrame(animate)
      globe.rotation.y += 0.005
      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!mountRef.current) return
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="relative">
      <div ref={mountRef} className="w-full h-[400px]" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h3 className="text-3xl font-bold text-white mb-2">Global Reach</h3>
        <p className="text-white text-xl">Empowering businesses worldwide</p>
      </div>
    </div>
  )
}

