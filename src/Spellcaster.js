import React, { useEffect, useState } from 'react';
import SpellSlots from './SpellSlots';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'

const Spellcaster = ({ name, type, level, focusedSlots, onDelete, onEdit }) => {
    const [slot, setSlot] = useState([]);
    
    useEffect(() => {
        let newSlot = [];
        for (let i = 0; i < focusedSlots; i++) {
            newSlot.push(false);
        }
        setSlot(newSlot);
    }, [focusedSlots])


    const toggleBubble = (bubbleIndex) => {
        console.log("Bubble clicked: ", bubbleIndex);
        setSlot(prevSlot => {
          const newSlot = [...prevSlot];
          newSlot[bubbleIndex] = !newSlot[bubbleIndex];
          console.log("New slot state: ", newSlot);
          return newSlot;
        });
    };
    

    return (
      <div className="spellcaster">
        <h2>{name}</h2>
        <p>Type: {type}</p>
        <SpellSlots type={type} level={level} onDelete={onDelete} />
        {focusedSlots !== null &&(
            <div className="slot">
                <h4>Focused Spells</h4>
                {slot.map((bubble, bubbleIndex) => (
                    <div
                    key={bubbleIndex}
                    onClick={() => toggleBubble(bubbleIndex)}
                    className={`bubble ${bubble ? 'bubble-filled' : ''}`}
                    ></div>
                ))}
            </div>
        )}
        <div class="button-container">
            <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </div>
      </div>
    );
  };
  
  export default Spellcaster;