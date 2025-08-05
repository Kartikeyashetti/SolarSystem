uniform float uTime;
varying vec2 vUv;

// Simple hash-based noise
float random(vec2 st) {
  return fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a)* u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vUv * 20.0; // Zoom in the pattern
  float n = noise(uv + vec2(uTime * 0.2, uTime * 0.2));

  vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 0.0), n); // Orange to yellow

  // Add pulsating glow
  float glow = sin(uTime * 2.0 + uv.x * 2.0) * 0.5 + 0.5;
  color += glow * 0.2;

  gl_FragColor = vec4(color, 1.0);
}
