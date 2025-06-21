// Game Types for Knight of Olympus

export interface Player {
  position: [number, number, number];
  health: number;
  maxHealth: number;
  score: number;
  athenCoins: number;
  level: number;
  weapons: Weapon[];
  powers: Power[];
}

export interface Enemy {
  id: string;
  type: EnemyType;
  position: [number, number, number];
  health: number;
  maxHealth: number;
  speed: number;
  damage: number;
  isAlive: boolean;
  lastAttack: number;
}

export type EnemyType = 
  | 'medusa' 
  | 'minotaur' 
  | 'cyclops' 
  | 'harpy' 
  | 'skeleton' 
  | 'fireMonster'
  | 'giantSnake'
  | 'kronos';

export interface Weapon {
  id: string;
  name: string;
  type: 'magicArrow' | 'lightningBolt' | 'spell';
  damage: number;
  cooldown: number;
  cost: number; // Athena coins
  unlocked: boolean;
}

export interface Power {
  id: string;
  name: string;
  type: 'speed' | 'shield' | 'health' | 'damage';
  duration: number;
  active: boolean;
  cooldown: number;
}

export interface Collectible {
  id: string;
  type: 'athenCoin' | 'healthPotion' | 'artifact' | 'powerUp';
  position: [number, number, number];
  value: number;
  collected: boolean;
}

export interface GameState {
  phase: 'menu' | 'playing' | 'paused' | 'gameOver' | 'victory' | 'shop';
  player: Player;
  enemies: Enemy[];
  collectibles: Collectible[];
  wave: number;
  difficulty: number;
  failedAttempts: number; // For adaptive difficulty
  timeElapsed: number;
  playerName: string;
  leaderboard: LeaderboardEntry[];
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  level: number;
  date: string;
}

export interface Controls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  shoot: boolean;
  spell: boolean;
}