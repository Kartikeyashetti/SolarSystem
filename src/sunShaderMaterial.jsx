import { shaderMaterial } from '@react-three/drei'
import vertexShader from './shaders/sun.vert.glsl'
import fragmentShader from './shaders/sun.frag.glsl'

const SunShaderMaterial = shaderMaterial(
  { uTime: 0 },
  vertexShader,
  fragmentShader
)

export default SunShaderMaterial
