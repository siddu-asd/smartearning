"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

export function InteractiveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport, mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Get scroll progress (0 to 1)
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Smoothly move towards mouse position
    const targetX = (mouse.x * viewport.width) / 3;
    const targetY = (mouse.y * viewport.height) / 3;
    
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    
    // Rotate slowly over time + add scroll rotation
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 + scrollProgress * Math.PI * 2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 + scrollProgress * Math.PI;

    // Scale down and distort heavily as you scroll down
    const scale = 1 + scrollProgress * 0.5;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#1e3a8a"
          emissive="#3b82f6"
          emissiveIntensity={0.8}
          attach="material"
          distort={0.4} // Will update distort dynamically next
          speed={2}
          roughness={0.1}
          metalness={0.9}
          wireframe={true}
        />
      </Sphere>
    </Float>
  );
}
