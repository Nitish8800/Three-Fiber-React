import React, { useRef, useState } from "react";
import "./App.css";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Model from "./components/Model";

function BackDrop() {
  return (
    <mesh receiveShadow position={[0, -1, -5]}>
      <planeBufferGeometry attach="geometry" args={[500, 500]} />
      <meshStandardMaterial attach="material" color="grey" />
    </mesh>
  );
}

// Lights
function KeyLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      color={color}
      intensity={brightness}
      position={[-2, 0, 5]}
      lookAt={[0, 0, 0]}
      penumbra={1}
      castShadow
    />
  );
}
function FillLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={3}
      height={3}
      intensity={brightness}
      color={color}
      position={[4, 0, 4]}
      lookAt={[0, 0, 0]}
      penumbra={2}
      castShadow
    />
  );
}

function RimLight({ brightness, color }) {
  return (
    <rectAreaLight
      width={1.5}
      height={1.5}
      intensity={brightness}
      color={color}
      position={[1, 4, -2]}
      rotation={[0, 0, 0]}
      castShadow
    />
  );
}

export default function App() {
  const [stop, setStop] = useState(false);
  const [light, setLight] = useState(true);
  const ref = useRef();
  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
        <BackDrop />
        {light && <KeyLight brightness={100} color={"#ffc9f4"} />}
        <FillLight brightness={100} color={"#000079"} />
        <RimLight brightness={100} color={"#3169E2"} />
        <Stage
          controls={ref}
          preset="rembrandt"
          intensity={1}
          environment="city"
        >
          <Model />
        </Stage>

        <OrbitControls ref={ref} autoRotate={stop} />
      </Canvas>
      <div class="button">
        <button
          id="start"
          onClick={() => {
            setStop(true);
          }}
        >
          {" "}
          Start the Animation
        </button>
        <button
          id="stop"
          onClick={() => {
            setStop(false);
          }}
        >
          Stop the Animation
        </button>
        <button
          id="button2"
          onClick={() => {
            setLight(!light);
          }}
        >
          Turn off Main light
        </button>
      </div>
    </>
  );
}
