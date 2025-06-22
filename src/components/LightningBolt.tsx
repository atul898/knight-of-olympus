// ⚡ LIGHTNING BOLT COMPONENT - Collectible power-ups!
// Hey Aaryan! This creates the glowing lightning bolts you can collect
// Think of them like magical energy scattered around the battlefield!

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Collectible } from '../types/game';

interface LightningBoltProps {
  collectible: Collectible;
  onCollect: (id: string) => void; // Function to call when the lightning bolt is collected
}

function LightningBolt({ collectible, onCollect }: LightningBoltProps) {
  const boltRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  // This makes the lightning bolt spin and glow with animation!
  useFrame((state) => {
    if (boltRef.current && glowRef.current) {
      // Spin the lightning bolt around like it's floating magically
      boltRef.current.rotation.y += 0.02;
      boltRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      
      // Make the glow pulse bigger and smaller (breathing effect)
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
      glowRef.current.scale.setScalar(pulse);
      
      // Make it float up and down gently
      boltRef.current.position.y = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  // Don't render if the lightning bolt has been collected
  if (collectible.collected) {
    return null;
  }

  return (
    <group position={collectible.position}>
      {/* GLOWING AURA - This makes the lightning bolt look magical! */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshBasicMaterial 
          color="#00BFFF" 
          transparent 
          opacity={0.3}
          emissive="#00BFFF"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* MAIN LIGHTNING BOLT - The collectible itself */}
      <mesh 
        ref={boltRef}
        onClick={() => onCollect(collectible.id)} // Click to collect (for testing)
      >
        {/* Lightning bolt shape - made from stretched diamonds */}
        
        {/* Top part of lightning bolt */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.3, 0.05]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Middle part of lightning bolt */}
        <mesh position={[0.05, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <boxGeometry args={[0.15, 0.08, 0.05]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Bottom part of lightning bolt */}
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.1, 0.3, 0.05]} />
          <meshStandardMaterial 
            color="#FFD700" 
            emissive="#FFD700" 
            emissiveIntensity={0.8}
          />
        </mesh>
        
        {/* Sparks around the lightning bolt */}
        {[...Array(6)].map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const x = Math.cos(angle) * 0.3;
          const z = Math.sin(angle) * 0.3;
          
          return (
            <mesh key={i} position={[x, 0, z]}>
              <sphereGeometry args={[0.02]} />
              <meshBasicMaterial 
                color="#FFFFFF" 
                emissive="#FFFFFF"
                emissiveIntensity={1}
              />
            </mesh>
          );
        })}
      </mesh>

      {/* COLLECTION TEXT - Shows when you get close */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.01]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

export default LightningBolt;