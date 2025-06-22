// 🗡️ REALISTIC KNIGHT COMPONENT - Professional 3D Knight Model!
// Hey Aaryan! This loads a real professional knight model instead of basic shapes
// This will make your game look like a AAA professional game!

import React, { useRef, Suspense, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Mesh, Vector3, Group } from 'three';
import { GameState } from '../types/game';
import { useControls } from '../hooks/useControls';

// This tells TypeScript what information the Realistic Knight needs
interface RealisticKnightProps {
  position: [number, number, number]; // Where the knight stands (x, y, z coordinates)
  gameState: GameState;               // Information about the whole game
  setGameState: React.Dispatch<React.SetStateAction<GameState>>; // Function to update the game
}

// Loading component while the knight model downloads
function LoadingKnight() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 2, 0.5]} />
      <meshStandardMaterial color="#4A90E2" />
      <meshBasicMaterial attach="material">
        <h3>Loading Epic Knight...</h3>
      </meshBasicMaterial>
    </mesh>
  );
}

// The actual knight model component
function KnightModel({ gameState, setGameState }: RealisticKnightProps) {
  // This creates a "reference" to our knight so we can make it move and spin
  const knightRef = useRef<Group>(null);
  
  // This gets the current state of all the keys you're pressing
  const controls = useControls();
  
  // This keeps track of where the knight is in the 3D world
  const knightPosition = useRef(new Vector3(...gameState.player.position));

  // Load the 3D knight model with animations
  const { scene, animations } = useGLTF('/models/knight.glb');
  
  // Set up animation controls
  const { actions, mixer } = useAnimations(animations, knightRef);

  // Set up animations when component loads
  useEffect(() => {
    // Play idle animation by default
    if (actions && actions['Idle']) {
      actions['Idle'].play();
    }
  }, [actions]);

  // This function runs every frame (about 60 times per second!)
  useFrame((state, delta) => {
    if (knightRef.current) {
      // Update animation mixer
      if (mixer) mixer.update(delta);
      
      // MOVEMENT SYSTEM - Same as before but now with a realistic knight!
      const moveSpeed = 5; // How fast the knight moves
      const moveDistance = moveSpeed * delta;
      const isMoving = controls.forward || controls.backward || controls.left || controls.right;
      
      // Handle animations based on movement
      if (actions) {
        if (isMoving) {
          // Play walking animation when moving
          if (actions['Walking'] || actions['Walk'] || actions['walk']) {
            const walkAction = actions['Walking'] || actions['Walk'] || actions['walk'];
            if (!walkAction.isRunning()) {
              actions['Idle']?.stop();
              walkAction.play();
            }
          }
        } else {
          // Play idle animation when not moving
          if (actions['Idle'] || actions['idle']) {
            const idleAction = actions['Idle'] || actions['idle'];
            if (!idleAction.isRunning()) {
              actions['Walking']?.stop();
              actions['Walk']?.stop();
              actions['walk']?.stop();
              idleAction.play();
            }
          }
        }
      }
      
      // Check each direction and move the knight accordingly
      if (controls.forward) {
        knightPosition.current.z -= moveDistance;
      }
      if (controls.backward) {
        knightPosition.current.z += moveDistance;
      }
      if (controls.left) {
        knightPosition.current.x -= moveDistance;
      }
      if (controls.right) {
        knightPosition.current.x += moveDistance;
      }
      
      // Add subtle floating animation to simulate walking
      knightPosition.current.y = isMoving 
        ? Math.sin(state.clock.elapsedTime * 8) * 0.05 // Gentle bounce when moving
        : Math.sin(state.clock.elapsedTime * 2) * 0.02; // Gentle idle float
      
      // Actually move the 3D knight to the new position
      knightRef.current.position.copy(knightPosition.current);
      
      // Update the game state with the new position
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
      
      // Make the knight turn to face where he's going!
      if (controls.forward) {
        knightRef.current.rotation.y = 0; // Face forward
      } else if (controls.backward) {
        knightRef.current.rotation.y = Math.PI; // Turn around
      } else if (controls.left) {
        knightRef.current.rotation.y = Math.PI / 2; // Turn left
      } else if (controls.right) {
        knightRef.current.rotation.y = -Math.PI / 2; // Turn right
      }
    }
  });

  return (
    <group ref={knightRef}>
      {/* Load the realistic 3D knight model */}
      <primitive 
        object={scene} 
        scale={[1.5, 1.5, 1.5]} // Slightly smaller for better proportions
        position={[0, -0.5, 0]} // Better ground positioning
        rotation={[0, 0, 0]} // Ensure proper rotation
      />
      
      {/* Add extra lighting specifically for the knight */}
      <pointLight
        position={[2, 3, 2]}
        intensity={0.8}
        color="#FFD700"
        distance={8}
      />
      <pointLight
        position={[-2, 3, -2]}
        intensity={0.6}
        color="#FFFFFF"
        distance={8}
      />
      
      {/* Keep the magic aura for now */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 16, 12]} />
        <meshBasicMaterial 
          color="#FFD700" 
          transparent 
          opacity={0.1}
          emissive="#FFD700"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// Main component that handles loading
function RealisticKnight(props: RealisticKnightProps) {
  return (
    <Suspense fallback={<LoadingKnight />}>
      <KnightModel {...props} />
    </Suspense>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/knight.glb');

export default RealisticKnight;