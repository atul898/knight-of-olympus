import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { GameState } from '../types/game';
import RealisticKnight from './RealisticKnight';
import Environment from './Environment';
import LightningBolt from './LightningBolt';
import { spawnLightningBolts, checkCollisions } from '../utils/gameLogic';

interface GameProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

function Game({ gameState, setGameState }: GameProps) {
  const gameRef = useRef<Mesh>(null);

  // Spawn lightning bolts when the game starts
  useEffect(() => {
    if (gameState.phase === 'playing' && gameState.collectibles.length === 0) {
      // Only spawn lightning bolts if we don't have any collectibles yet
      const lightningBolts = spawnLightningBolts(8); // Spawn 8 lightning bolts
      setGameState(prev => ({
        ...prev,
        collectibles: lightningBolts
      }));
    }
  }, [gameState.phase, setGameState]);

  // Game loop
  useFrame((state, delta) => {
    if (gameState.phase === 'playing') {
      // Update game time
      setGameState(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + delta
      }));

      // Check for collisions with lightning bolts
      const updatedGameState = checkCollisions(gameState);
      if (updatedGameState !== gameState) {
        setGameState(updatedGameState);
      }
    }
  });

  // Function to handle collecting a lightning bolt manually (for testing)
  const handleCollectLightningBolt = (lightningBoltId: string) => {
    setGameState(prev => ({
      ...prev,
      collectibles: prev.collectibles.map(collectible =>
        collectible.id === lightningBoltId
          ? { ...collectible, collected: true }
          : collectible
      ),
      player: {
        ...prev.player,
        lightningBolts: prev.player.lightningBolts + 1,
        score: prev.player.score + 10
      }
    }));
  };

  return (
    <group ref={gameRef}>
      {/* Environment (Greek temple, pillars, etc.) */}
      <Environment />
      
      {/* Player Knight - Using professional Sketchfab model! */}
      {gameState.phase === 'playing' && (
        <RealisticKnight 
          position={gameState.player.position}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}

      {/* Ground and Game Objects */}
      {gameState.phase === 'playing' && (
        <>
          {/* Ground plane */}
          <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#8B7D6B" />
          </mesh>

          {/* Lightning Bolts - Collectible power-ups scattered around! */}
          {gameState.collectibles.map(collectible => (
            <LightningBolt
              key={collectible.id}
              collectible={collectible}
              onCollect={handleCollectLightningBolt}
            />
          ))}
        </>
      )}
    </group>
  );
}

export default Game;