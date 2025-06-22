// 🗡️ FALLBACK KNIGHT - Temporary improved knight while we load the real model
// Hey Aaryan! This is a better-looking knight until we get the professional model

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Group } from 'three';
import { GameState } from '../types/game';
import { useControls } from '../hooks/useControls';

interface FallbackKnightProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function FallbackKnight({ gameState, setGameState }: FallbackKnightProps) {
  const knightRef = useRef<Group>(null);
  const controls = useControls();
  const knightPosition = useRef(new Vector3(...gameState.player.position));

  useFrame((state, delta) => {
    if (knightRef.current) {
      const moveSpeed = 5;
      const moveDistance = moveSpeed * delta;
      
      if (controls.forward) knightPosition.current.z -= moveDistance;
      if (controls.backward) knightPosition.current.z += moveDistance;
      if (controls.left) knightPosition.current.x -= moveDistance;
      if (controls.right) knightPosition.current.x += moveDistance;
      
      knightPosition.current.y = 0;
      knightRef.current.position.copy(knightPosition.current);
      
      setGameState(prev => ({
        ...prev,
        player: {
          ...prev.player,
          position: [knightPosition.current.x, knightPosition.current.y, knightPosition.current.z]
        }
      }));
      
      if (controls.forward) knightRef.current.rotation.y = 0;
      else if (controls.backward) knightRef.current.rotation.y = Math.PI;
      else if (controls.left) knightRef.current.rotation.y = Math.PI / 2;
      else if (controls.right) knightRef.current.rotation.y = -Math.PI / 2;
    }
  });

  return (
    <group ref={knightRef} scale={[2, 2, 2]}>
      {/* IMPROVED TEMPORARY KNIGHT - Better proportions */}
      
      {/* Body - More realistic shape */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 1.2]} />
        <meshStandardMaterial color="#2C3E50" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#F4C2A1" />
      </mesh>
      
      {/* Helmet */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.22]} />
        <meshStandardMaterial color="#34495E" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.35, 0.2, 0]}>
        <capsuleGeometry args={[0.08, 0.6]} />
        <meshStandardMaterial color="#F4C2A1" />
      </mesh>
      <mesh position={[0.35, 0.2, 0]}>
        <capsuleGeometry args={[0.08, 0.6]} />
        <meshStandardMaterial color="#F4C2A1" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.15, -0.8, 0]}>
        <capsuleGeometry args={[0.1, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0.15, -0.8, 0]}>
        <capsuleGeometry args={[0.1, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Sword */}
      <mesh position={[0.5, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.03, 1, 0.01]} />
        <meshStandardMaterial color="#E8E8E8" metalness={1} roughness={0} />
      </mesh>
      
      {/* Shield */}
      <mesh position={[-0.45, 0.1, 0]} rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.05]} />
        <meshStandardMaterial color="#8B0000" metalness={0.5} roughness={0.3} />
      </mesh>
      
      {/* Text indicator that this is temporary */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.01]} />
        <meshBasicMaterial color="transparent" />
      </mesh>
    </group>
  );
}

export default FallbackKnight;