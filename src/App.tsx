import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import Game from './components/Game';
import UI from './components/UI';
import { GameState } from './types/game';

// Initial game state
const initialGameState: GameState = {
  phase: 'menu',
  player: {
    position: [0, 0, 0],
    health: 100,
    maxHealth: 100,
    score: 0,
    athenCoins: 0,
    level: 1,
    weapons: [],
    powers: []
  },
  enemies: [],
  collectibles: [],
  wave: 1,
  difficulty: 1,
  failedAttempts: 0,
  timeElapsed: 0,
  playerName: '',
  leaderboard: []
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const startGame = (playerName: string) => {
    setGameState(prev => ({
      ...prev,
      phase: 'playing',
      playerName,
      timeElapsed: 0
    }));
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* 3D Game World */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'linear-gradient(to bottom, #87CEEB, #98D8E8)' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Game Components */}
        <Game gameState={gameState} setGameState={setGameState} />
        
        {/* Development Controls (remove in production) */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        <Stats />
      </Canvas>

      {/* 2D UI Overlay */}
      <UI gameState={gameState} setGameState={setGameState} startGame={startGame} />
    </div>
  );
}

export default App;