// 🎮 GAME LOGIC - All the smart game functions!
// Hey Aaryan! This file contains the "brain" of our game
// It handles collecting items, checking collisions, and spawning new things!

import { GameState, Collectible } from '../types/game';

// This function creates lightning bolts scattered around the game world
export function spawnLightningBolts(count: number = 8): Collectible[] {
  const lightningBolts: Collectible[] = [];
  
  for (let i = 0; i < count; i++) {
    // Create random positions around the temple area
    // We spread them out so they're not all in one place
    const x = (Math.random() - 0.5) * 15; // Random X between -7.5 and 7.5
    const z = (Math.random() - 0.5) * 10; // Random Z between -5 and 5
    
    // Make sure they don't spawn too close to the starting position
    if (Math.abs(x) < 1 && Math.abs(z) < 1) {
      continue; // Skip this one and try again
    }
    
    lightningBolts.push({
      id: `lightning-${i}`,
      type: 'powerUp',
      position: [x, 0, z], // Y is 0 (on the ground)
      value: 1, // Each lightning bolt gives 1 lightning power
      collected: false
    });
  }
  
  return lightningBolts;
}

// This function checks if the knight is close enough to collect a lightning bolt
export function checkCollisions(gameState: GameState): GameState {
  const knightPos = gameState.player.position;
  let newGameState = { ...gameState };
  let collected = false;
  
  // Check each lightning bolt to see if the knight is touching it
  newGameState.collectibles = gameState.collectibles.map(collectible => {
    // Skip if already collected
    if (collectible.collected) {
      return collectible;
    }
    
    // Calculate distance between knight and lightning bolt
    const dx = knightPos[0] - collectible.position[0]; // X distance
    const dz = knightPos[2] - collectible.position[2]; // Z distance (we ignore Y since both are on ground)
    const distance = Math.sqrt(dx * dx + dz * dz); // Pythagorean theorem!
    
    // If the knight is close enough (within 0.8 units), collect it!
    if (distance < 0.8) {
      collected = true;
      
      // Update the player's lightning bolt count
      if (collectible.type === 'powerUp') {
        newGameState.player = {
          ...newGameState.player,
          lightningBolts: newGameState.player.lightningBolts + 1, // Add 1 lightning bolt
          score: newGameState.player.score + 10 // Give 10 points for each lightning bolt
        };
      }
      
      return { ...collectible, collected: true };
    }
    
    return collectible;
  });
  
  // If we collected something, maybe spawn a new one to keep the game interesting!
  if (collected) {
    console.log('⚡ Lightning bolt collected! +10 points!');
  }
  
  return newGameState;
}

// This function calculates how many lightning bolts the player has collected
export function getLightningBoltCount(gameState: GameState): number {
  return gameState.collectibles.filter(
    c => c.type === 'powerUp' && c.collected
  ).length;
}