import { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function Planet({
  center = [0, 0, 0],
  a = 6,
  b = 4,
  speed = 0.01,
  selfSpinSpeed = 0.05,
  color = 'lightcyan',
  textureUrl = import.meta.env.BASE_URL + `images/planet/uranus.jpg`,
  onPlanetClick,
name,
  orbitColor = 'gray',
}) {
  const planetRef = useRef();
  const [angle, setAngle] = useState(() => Math.random() * Math.PI * 2);
  const texture = useLoader(THREE.TextureLoader, textureUrl)

  // Update position and rotation every frame
  useFrame(() => {
    const newAngle = angle + speed;
    setAngle(newAngle);

    const x = center[0] + a * Math.cos(newAngle);
    const z = center[2] + b * Math.sin(newAngle);

    planetRef.current.position.set(x, center[1], z);
    planetRef.current.rotation.y += selfSpinSpeed;
  });

  // Create orbit path (ellipse as a line)
  const orbitPoints = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, 0,     // center
      a, b,     // xRadius, yRadius
      0, 2 * Math.PI,
      false,
      0
    );
    const points = curve.getPoints(100).map(p => new THREE.Vector3(p.x + center[0], center[1], p.y + center[2]));
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [a, b, center]);

  return (
    <>
      {/* Orbit path */}
      <line geometry={orbitPoints}>
        <lineBasicMaterial color={orbitColor} />
      </line>

      {/* Planet mesh */}
      <mesh ref={planetRef} onClick={() => onPlanetClick?.(planetRef.current.position,name)}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </>
  );
}
