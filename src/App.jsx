import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Mercury from './Planets/Mercury'; // import your component
import Venus from './Planets/Venus'
import Earth from './Planets/Earth'
import Mars from './Planets/Mars'
import Jupiter from './Planets/Jupiter'
import Saturn from './Planets/Saturn'
import Uranus from './Planets/Uranus'
import Neptune from './Planets/Neptune'
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Sun from './Sun'
import { CameraControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import planetInfo from './data/planetData.json';


import { Stars } from '@react-three/drei';


export default function App() {
  const cameraControlsRef = useRef()
  function handlePlanetClick(position, name) {
    setSelectedPlanet(name)
    cameraControlsRef.current?.setLookAt(
      position.x + 10, position.y + 2, position.z + 10,
      position.x, position.y, position.z, // target planet
      true // smooth transition
    )
  }
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  return (


    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0 }}>
      {/* Top-right info box */}
      {selectedPlanet && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '30vw',
          height: '25vh', // updated from 20vh to 30vh
          backgroundColor: '#00002dff',
          color: 'white',
          padding: '12px',
          borderRadius: '10px',
          fontSize: '0.8rem', // consistent readable font
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'start',
          overflowY: 'auto', // ensures scroll if text overflows
          gap: '1px',
          zIndex: 10
        }}>
          <strong style={{ fontSize: '1.3rem' }}>{selectedPlanet}</strong>
          <p style={{ margin: '2px 0' }}>{planetInfo[selectedPlanet]?.description}</p>
          <p style={{ margin: '2px 0' }}><strong>Mass:</strong> {planetInfo[selectedPlanet]?.mass}</p>
          <p style={{ margin: '2px 0' }}><strong>Radius:</strong> {planetInfo[selectedPlanet]?.radius}</p>
          <p style={{ margin: '2px 0' }}><strong>Orbital Period:</strong> {planetInfo[selectedPlanet]?.orbitalPeriod}</p>
        </div>
      )}

      <Canvas
        onPointerMissed={() => setSelectedPlanet(null)}

        camera={{ position: [0, 5, 20], fov: 50 }}
        style={{ background: '#000011' }} // dark space blue
      >
        {/* <ambientLight intensi ty={0.5} /> */}
        <pointLight position={[0, 0, 0]} intensity={2000} />

        <Sun onPlanetClick={handlePlanetClick} name="Sun" />


        <Mercury a={10} b={9} name="Mercury" speed={0.01} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />
        <Venus a={15} b={14.5} name="Venus" speed={0.0038} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />
        <Earth a={20} b={19.8} name="Earth" speed={0.0024} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />
        <Mars a={25} b={24} name="Mars" speed={0.00126} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />
        <Jupiter a={35} b={33} name="Jupiter" speed={0.0002} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />
        <Saturn a={45} b={43} name="Saturn" speed={0.000081} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />
        <Uranus a={55} b={52} name="Uranus" speed={0.000029} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />
        <Neptune a={65} b={62} name="Neptune" speed={0.000014} selfSpinSpeed={0.05} onPlanetClick={handlePlanetClick} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.003}
            luminanceSmoothing={0.01}
            intensity={1.5}
          />
        </EffectComposer>


        <Stars radius={100} depth={50} count={900} factor={8} saturation={20} fade />

        <CameraControls
          ref={cameraControlsRef}
          minDistance={2} // Prevent zooming in too close
          maxDistance={100} // Prevent zooming out too far
        />

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}
