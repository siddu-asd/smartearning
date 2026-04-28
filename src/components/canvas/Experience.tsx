"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { OverlayLayout } from "../ui/OverlayLayout";

function ParticleTunnel() {
  const count = 3000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a tunnel effect along the Z axis (0 to -150)
      const z = Math.random() * -150;
      // Radius of the tunnel
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#3b82f6" transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

function WireframeGeometries() {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame((state) => {
    if (group.current) {
      // Rotate aggressively based on time and scroll
      group.current.rotation.z = state.clock.elapsedTime * 0.2 + scroll.offset * Math.PI * 4;
      group.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={group}>
      {/* Massive objects placed along the Z-axis */}
      {[0, -30, -60, -90, -120].map((z, i) => (
        <mesh key={z} position={[(i % 2 === 0 ? 4 : -4), (i % 2 === 0 ? -2 : 2), z]}>
          <torusKnotGeometry args={[2, 0.2, 100, 16]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#ff0055" : "#00ffcc"} wireframe />
        </mesh>
      ))}
    </group>
  );
}

function CameraFlythrough() {
  const scroll = useScroll();
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Scroll progress maps to Z depth 0 to -150
    const targetZ = scroll.offset * -150;
    
    // Add aggressive shake based on scroll speed
    const shake = Math.sin(state.clock.elapsedTime * 10) * (scroll.delta * 20);
    
    target.current.set(shake, shake, targetZ + 5);
    camera.position.lerp(target.current, delta * 5);
  });

  return null;
}

function PostProcessing() {
  const scroll = useScroll();
  const chromRef = useRef<any>(null);

  useFrame(() => {
    if (chromRef.current) {
      // Increase chromatic aberration aggressively while scrolling fast
      chromRef.current.offset.x = scroll.delta * 0.5;
      chromRef.current.offset.y = scroll.delta * 0.5;
    }
  });

  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={2} />
      <ChromaticAberration ref={chromRef} offset={new THREE.Vector2(0.002, 0.002)} blendFunction={BlendFunction.NORMAL} />
      <Noise opacity={0.15} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}

export function Experience() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#020202]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: false }}>
        <fog attach="fog" args={["#020202", 5, 40]} />

        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.1}>
            <CameraFlythrough />
            <ParticleTunnel />
            <WireframeGeometries />
            
            <Scroll html style={{ width: "100%" }}>
              <OverlayLayout />
            </Scroll>
            
            <PostProcessing />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
