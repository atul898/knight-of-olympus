// 🎮 CONTROLS HOOK - This detects when Aaryan presses keys!
// Hey Aaryan! This file listens for when you press W, A, S, D keys
// Think of it like the game's "ears" - it hears what keys you press!

import { useState, useEffect } from 'react';
import { Controls } from '../types/game';

export function useControls() {
  // This keeps track of which keys are being pressed right now
  // It's like having a checklist: "Is W pressed? Is A pressed?" etc.
  const [controls, setControls] = useState<Controls>({
    forward: false,   // W key - moves knight forward
    backward: false,  // S key - moves knight backward  
    left: false,      // A key - moves knight left
    right: false,     // D key - moves knight right
    shoot: false,     // Space key - shoots magic arrows (we'll add this later!)
    spell: false      // Q key - casts magic spells (we'll add this later!)
  });

  useEffect(() => {
    // This function runs when you PRESS DOWN a key
    const handleKeyDown = (event: KeyboardEvent) => {
      // Convert the key to lowercase so 'W' and 'w' both work
      const key = event.key.toLowerCase();
      
      // Check which key was pressed and update our controls
      switch (key) {
        case 'w':
          setControls(prev => ({ ...prev, forward: true }));
          break;
        case 's':
          setControls(prev => ({ ...prev, backward: true }));
          break;
        case 'a':
          setControls(prev => ({ ...prev, left: true }));
          break;
        case 'd':
          setControls(prev => ({ ...prev, right: true }));
          break;
        case ' ': // Space bar
          setControls(prev => ({ ...prev, shoot: true }));
          break;
        case 'q':
          setControls(prev => ({ ...prev, spell: true }));
          break;
      }
    };

    // This function runs when you RELEASE a key
    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      
      // When you stop pressing a key, set it back to false
      switch (key) {
        case 'w':
          setControls(prev => ({ ...prev, forward: false }));
          break;
        case 's':
          setControls(prev => ({ ...prev, backward: false }));
          break;
        case 'a':
          setControls(prev => ({ ...prev, left: false }));
          break;
        case 'd':
          setControls(prev => ({ ...prev, right: false }));
          break;
        case ' ': // Space bar
          setControls(prev => ({ ...prev, shoot: false }));
          break;
        case 'q':
          setControls(prev => ({ ...prev, spell: false }));
          break;
      }
    };

    // Tell the browser to listen for key presses
    // It's like saying "Hey browser, when someone presses a key, tell me!"
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // This cleanup function runs when the component is removed
    // It's like saying "Okay, stop listening for keys now"
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []); // The empty array means this only runs once when the component starts

  // Return the current state of all controls
  // Other parts of our game can use this to know what keys are pressed
  return controls;
}