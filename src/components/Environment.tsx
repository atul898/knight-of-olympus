import React from 'react';

function Environment() {
  return (
    <group>
      {/* Sky background is handled by Canvas */}
      
      {/* Simple Greek temple pillars */}
      {[-5, 5].map((x, i) => (
        <group key={i} position={[x, 0, -8]}>
          {/* Pillar base */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 1]} />
            <meshStandardMaterial color="#F5F5DC" />
          </mesh>
          
          {/* Pillar column */}
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 4]} />
            <meshStandardMaterial color="#F5F5DC" />
          </mesh>
          
          {/* Pillar top */}
          <mesh position={[0, 4, 0]}>
            <cylinderGeometry args={[0.8, 0.6, 0.5]} />
            <meshStandardMaterial color="#F5F5DC" />
          </mesh>
        </group>
      ))}

      {/* Temple floor */}
      <mesh position={[0, -1, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 10]} />
        <meshStandardMaterial color="#F5F5DC" />
      </mesh>
    </group>
  );
}

export default Environment;