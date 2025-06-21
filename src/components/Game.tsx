import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { GameState } from '../types/game';
import Knight from './Knight';
import Environment from './Environment';

interface GameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function Game({ gameState, setGameState }: GameProps) {
  const gameRef = useRef<Mesh>(null);

  // Game loop
  useFrame((state, delta) => {
    if (gameState.phase === 'playing') {
      // Update game time
      setGameState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + delta
      }));

      // TODO: Update enemies, handle collisions, spawn collectibles
    }
  });

  return (
    <group ref={gameRef}>
      {/* Environment (Greek temple, pillars, etc.) */}
      <Environment />
      
      {/* Player Knight */}
      {gameState.phase === 'playing' && (
        <Knight 
          position={gameState.player.position} 
          gameState={gameState}
          setGameState={setGameState}
        />
      )}

      {/* Test Objects for now */}
      {gameState.phase === 'playing' && (
        <>
          {/* Ground plane */}
          <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#8B7D6B" />
          </mesh>

          {/* Test cube */}
          <mesh position={[3, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#FFD700" />
          </mesh>
        </>
      )}
    </group>
  );
}

export default Game;