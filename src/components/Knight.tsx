// 🗡️ KNIGHT COMPONENT - This creates our brave hero!
// Hey Aaryan! This file makes the 3D knight that you control in the game.
// Think of it like building a LEGO figure with different pieces!

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { GameState } from '../types/game';
import { useControls } from '../hooks/useControls';

// This tells TypeScript what information the Knight needs
interface KnightProps {
  position: [number, number, number]; // Where the knight stands (x, y, z coordinates)
  gameState: GameState;               // Information about the whole game
  setGameState: React.Dispatch<React.SetStateAction<GameState>>; // Function to update the game
}

function Knight({ gameState, setGameState }: KnightProps) {
  // This creates a "reference" to our knight so we can make it move and spin
  // Think of it like putting a name tag on your knight so you can find it later!
  const knightRef = useRef<Mesh>(null);
  
  // This gets the current state of all the keys you're pressing
  // It's like asking "Is Aaryan pressing W right now? What about A?"
  const controls = useControls();
  
  // This keeps track of where the knight is in the 3D world
  const knightPosition = useRef(new Vector3(...gameState.player.position));

  // This function runs every frame (about 60 times per second!)
  // It's like the heartbeat of our knight - it makes the knight alive!
  useFrame((state, delta) => {
    if (knightRef.current) {
      // MOVEMENT SYSTEM - This makes the knight move when you press keys!
      // delta is the time since the last frame (makes movement smooth)
      const moveSpeed = 5; // How fast the knight moves (you can change this!)
      const moveDistance = moveSpeed * delta; // Smooth movement based on time
      
      // Check each direction and move the knight accordingly
      if (controls.forward) {
        // W key pressed - move forward (negative Z in 3D space)
        knightPosition.current.z -= moveDistance;
      }
      if (controls.backward) {
        // S key pressed - move backward (positive Z in 3D space)
        knightPosition.current.z += moveDistance;
      }
      if (controls.left) {
        // A key pressed - move left (negative X in 3D space)
        knightPosition.current.x -= moveDistance;
      }
      if (controls.right) {
        // D key pressed - move right (positive X in 3D space)
        knightPosition.current.x += moveDistance;
      }
      
      // Keep the knight on the ground (don't let it fall through!)
      // We'll make this smarter later when we add terrain
      knightPosition.current.y = 0;
      
      // Actually move the 3D knight to the new position
      knightRef.current.position.copy(knightPosition.current);
      
      // Update the game state with the new position
      // This tells the rest of the game where the knight is now
      setGameState(prev => ({
        ...prev,
        player: {
          ...prev.player,
          position: [
            knightPosition.current.x,
            knightPosition.current.y,
            knightPosition.current.z
          ]
        }
      }));
      
      // Make the knight ACTUALLY turn to face where he's going!
      if (controls.forward) {
        knightRef.current.rotation.y = 0; // Face forward (toward the temple)
      } else if (controls.backward) {
        knightRef.current.rotation.y = Math.PI; // Turn around completely (face away from temple)
      } else if (controls.left) {
        knightRef.current.rotation.y = Math.PI / 2; // Turn 90 degrees left
      } else if (controls.right) {
        knightRef.current.rotation.y = -Math.PI / 2; // Turn 90 degrees right
      }
    }
  });

  return (
    // This "group" holds all the knight's body parts together
    // The movement controls are applied to this entire group!
    <group ref={knightRef}>
      {/* MAKE THE KNIGHT BIGGER - Scale everything up by 1.5x! */}
      <group scale={[1.5, 1.5, 1.5]}>
        
        {/* === KNIGHT'S BODY PARTS - Building an EPIC Greek Hero! === */}
        
        {/* TORSO - The main body with chest armor */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.25, 1.2]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* CHEST PLATE - Extra armor protection */}
        <mesh position={[0, 0.1, 0.25]}>
          <sphereGeometry args={[0.35, 12, 8]} />
          <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* HEAD - Heroic face */}
        <mesh position={[0, 1, 0]}>
          <sphereGeometry args={[0.25]} />
          <meshStandardMaterial color="#F4C2A1" />
        </mesh>

        {/* GREEK HELMET - Epic warrior helmet with crest! */}
        <mesh position={[0, 1.1, 0]}>
          <sphereGeometry args={[0.28, 8, 6]} />
          <meshStandardMaterial color="#B8860B" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* HELMET CREST - The cool plume on top */}
        <mesh position={[0, 1.45, 0]} rotation={[Math.PI / 6, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.15, 0.6]} />
          <meshStandardMaterial color="#DC143C" />
        </mesh>

        {/* ARMS - Left and right arms */}
        <mesh position={[-0.5, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1]} />
          <meshStandardMaterial color="#F4C2A1" />
        </mesh>
        <mesh position={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 1]} />
          <meshStandardMaterial color="#F4C2A1" />
        </mesh>

        {/* LEGS - Strong warrior legs (bigger and more visible!) */}
        <mesh position={[-0.25, -0.5, 0]}>
          <cylinderGeometry args={[0.18, 0.2, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.25, -1.4, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0.25, -0.5, 0]}>
          <cylinderGeometry args={[0.18, 0.2, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[0.25, -1.4, 0]}>
          <cylinderGeometry args={[0.15, 0.18, 0.8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>

        {/* BOOTS - Armored knight boots */}
        <mesh position={[-0.25, -1.9, 0.1]}>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
        <mesh position={[0.25, -1.9, 0.1]}>
          <boxGeometry args={[0.3, 0.2, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>

        {/* SWORD - Main weapon in right hand */}
        <mesh position={[0.7, 0.2, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <boxGeometry args={[0.05, 1.5, 0.02]} />
          <meshStandardMaterial color="#E6E6FA" metalness={1} roughness={0} />
        </mesh>

        {/* SHIELD - Protection in left hand */}
        <mesh position={[-0.6, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.05]} />
          <meshStandardMaterial color="#B8860B" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* CAPE - Flowing DOWN BEHIND the knight */}
        <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 12, 0, 0]}>
          <sphereGeometry args={[0.4, 8, 12]} />
          <meshStandardMaterial color="#8B0000" side={2} />
        </mesh>

        {/* MAGIC AURA - Special glow around the whole knight */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.2, 16, 12]} />
          <meshBasicMaterial 
            color="#FFD700" 
            transparent 
            opacity={0.1}
            emissive="#FFD700"
            emissiveIntensity={0.2}
          />
        </mesh>

      </group>
    </group>
  );
}

export default Knight;