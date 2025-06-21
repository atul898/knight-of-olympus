import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { GameState } from '../types/game';

interface KnightProps {
  position: [number, number, number];
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function Knight({ position, gameState, setGameState }: KnightProps) {
  const knightRef = useRef<Mesh>(null);

  useFrame(() => {
    // Basic animation - gentle floating
    if (knightRef.current) {
      knightRef.current.rotation.y += 0.005;
      knightRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Temporary knight representation */}
      <mesh ref={knightRef}>
        {/* Body */}
        <cylinderGeometry args={[0.3, 0.3, 1.5]} />
        <meshStandardMaterial color="#4A90E2" />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color="#F4C2A1" />
      </mesh>

      {/* Weapon (magic staff placeholder) */}
      <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Magic orb on staff */}
      <mesh position={[0.8, 1.3, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default Knight;