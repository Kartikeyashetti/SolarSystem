import React, { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import SunShaderMaterial from './sunShaderMaterial'

// Register the custom material for JSX usage
extend({ SunShaderMaterial })

export default function Sun({onPlanetClick,name}
) {
  const shaderRef = useRef()
  const sunRef= useRef()

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uTime = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={sunRef}
      onClick={() => onPlanetClick?.(sunRef.current.position,name)}>
      <sphereGeometry args={[3, 64, 64]} />
      <sunShaderMaterial ref={shaderRef} />
    </mesh>
  )
}
