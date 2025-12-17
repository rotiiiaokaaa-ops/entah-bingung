import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<number[]>([]);

  useEffect(() => {
    // Generate static array of hearts to render
    const heartCount = 15;
    const newHearts = Array.from({ length: heartCount }, (_, i) => i);
    setHearts(newHearts);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map((i) => (
        <div 
          key={i} 
          className="heart" 
          style={{
            left: `${Math.random() * 100}vw`,
            animationDuration: `${4 + Math.random() * 6}s`,
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: Math.random() > 0.5 ? '#ffb7b2' : '#ffdac1'
          }}
        />
      ))}
    </div>
  );
};

export default FloatingHearts;