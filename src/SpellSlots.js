import React, { useState, useEffect } from 'react';

const SpellSlots = ({ type, level }) => {


  const [slots, setSlots] = useState([]);

  useEffect(() => {

    const spontaneousPattern = [
        [3], [4], [4, 3], [4, 4], [4, 4, 3], [4, 4, 4], [4, 4, 4, 3], 
        [4, 4, 4, 4], [4, 4, 4, 4, 3], [4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 3], 
        [4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 3], [4, 4, 4, 4, 4, 4, 4], 
        [4, 4, 4, 4, 4, 4, 4, 3], [4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 3], 
        [4, 4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 4, 1], 
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 1]
      ];
    
      const focusedPattern = [
        [3], [4], [4, 3], [4, 4], [4, 4, 3], [4, 4, 4], [4, 4, 4, 3], 
        [4, 4, 4, 4], [4, 4, 4, 4, 3], [4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 3], 
        [4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 3], [4, 4, 4, 4, 4, 4, 4], 
        [4, 4, 4, 4, 4, 4, 4, 3], [4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 3], 
        [4, 4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 4, 1], 
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 1]
      ];

    var newSlots;
    if (type === "Spontaneous") {
        newSlots =  spontaneousPattern[level-1].map(slotLevel => new Array(slotLevel).fill(false));
    } else if (type === "Focused"){
        newSlots = focusedPattern[level-1].map(slotLevel => new Array(slotLevel).fill(false));
    }
    setSlots(newSlots);
  }, [type, level,]);

  const toggleBubble = (slotIndex, bubbleIndex) => {
    setSlots(prevSlots => {
      const newSlots = [...prevSlots];
      newSlots[slotIndex] = [...prevSlots[slotIndex]];
      newSlots[slotIndex][bubbleIndex] = !newSlots[slotIndex][bubbleIndex];
      return newSlots;
    });
  };

  return (
    <div className="spell-slots">
      {slots.map((slot, slotIndex) => (
        <div key={slotIndex} className="slot">
          <h4>Level {slotIndex + 1}</h4>
          {slot.map((bubble, bubbleIndex) => (
            <div
              key={bubbleIndex}
              onClick={() => toggleBubble(slotIndex, bubbleIndex)}
              className={`bubble ${bubble ? 'bubble-filled' : ''}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default SpellSlots;

