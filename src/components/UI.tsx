import React, { useState } from 'react';
import { GameState } from '../types/game';

interface UIProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  startGame: (playerName: string) => void;
}

function UI({ gameState, setGameState, startGame }: UIProps) {
  const [playerName, setPlayerName] = useState('');

  const handleStartGame = () => {
    if (playerName.trim()) {
      startGame(playerName.trim());
    }
  };

  // Menu Screen
  if (gameState.phase === 'menu') {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        zIndex: 1000
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          marginBottom: '2rem', 
          textAlign: 'center',
          background: 'linear-gradient(45deg, #FFD700, #FFA500)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ⚡ Knight of Olympus 🗡️
        </h1>
        
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textAlign: 'center' }}>
          Epic 3D Greek Mythology Adventure
        </p>

        <input
          type="text"
          placeholder="Enter your name, brave knight..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          style={{
            padding: '15px',
            fontSize: '1.1rem',
            marginBottom: '1rem',
            borderRadius: '8px',
            border: '2px solid #FFD700',
            width: '300px',
            textAlign: 'center'
          }}
          onKeyPress={(e) => e.key === 'Enter' && handleStartGame()}
        />

        <button
          onClick={handleStartGame}
          disabled={!playerName.trim()}
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            backgroundColor: '#FFD700',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            cursor: playerName.trim() ? 'pointer' : 'not-allowed',
            opacity: playerName.trim() ? 1 : 0.5
          }}
        >
          🚀 Start Your Quest
        </button>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem' }}>
          <p>🎮 <strong>Controls:</strong></p>
          <p>W = Move Forward • A = Move Left • S = Move Back • D = Move Right</p>
          <p>Space = Shoot Magic Arrows • Q = Cast Spells (coming soon!)</p>
          <p>📱 Mobile friendly with touch controls</p>
        </div>
      </div>
    );
  }

  // Game HUD
  if (gameState.phase === 'playing') {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100
      }}>
        {/* Top HUD */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize: '1.1rem',
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '15px',
          borderRadius: '10px'
        }}>
          <div>⚔️ {gameState.playerName}</div>
          <div>❤️ Health: {gameState.player.health}/{gameState.player.maxHealth}</div>
          <div>🏆 Score: {gameState.player.score}</div>
          <div>⚡ Lightning Bolts: {gameState.player.lightningBolts}</div>
          <div>🪙 Athena Coins: {gameState.player.athenCoins}</div>
          <div>🌊 Wave: {gameState.wave}</div>
        </div>

        {/* Test message */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '1rem',
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '10px',
          borderRadius: '5px'
        }}>
          🎯 Game is running! Knight of Olympus is ready for battle! ⚡
        </div>
      </div>
    );
  }

  return null;
}

export default UI;