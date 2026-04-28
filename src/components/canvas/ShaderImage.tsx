"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uHoverState;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Wave distortion
  float noiseFreq = 2.5;
  float noiseAmp = 0.15;
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
  
  pos.z += sin(noisePos.x) * noiseAmp * uHoverState;
  pos.z += cos(noisePos.y * noiseFreq + uTime) * noiseAmp * uHoverState;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uHoverState;
uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // RGB shift effect on hover
  float shift = 0.03 * uHoverState * sin(uTime * 5.0);
  float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;
  
  // Idle state is slightly darker
  float darken = mix(0.6, 1.0, uHoverState);
  
  vec3 color = vec3(r, g, b) * darken;
  
  gl_FragColor = vec4(color, 1.0);
}
`;

function ShaderPlane({ url, isHovered }: { url: string; isHovered: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(url);
  
  const uniforms = useRef({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHoverState: { value: 0 }
  });

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uHoverState.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverState.value,
        isHovered ? 1 : 0,
        0.1
      );
    }
  });

  return (
    <mesh>
      {/* 4:3 aspect ratio plane to match portfolio cards */}
      <planeGeometry args={[4, 3, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
}

export function ShaderImage({ url }: { url: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute inset-0 w-full h-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ShaderPlane url={url} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}
