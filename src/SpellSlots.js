import React, { useState, useEffect } from 'react';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

const SpellSlots = ({ type, level, onDelete }) => {
    const [slots, setSlots] = useState([]);
    const [focusedSpellNames, setFocusedSpellNames] = useState([]);
    const [isNamingModalOpen, setIsNamingModalOpen] = useState(false);
    const [isAddSpellModalOpen, setIsAddSpellModalOpen] = useState(false);
    const [newSpellDetails, setNewSpellDetails] = useState({ levelIndex: null, name: '' });


  useEffect(() => {
    let newSlots;

    const spontaneousPattern = [
        [3], [4], [4, 3], [4, 4], [4, 4, 3], [4, 4, 4], [4, 4, 4, 3], 
        [4, 4, 4, 4], [4, 4, 4, 4, 3], [4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 3], 
        [4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 3], [4, 4, 4, 4, 4, 4, 4], 
        [4, 4, 4, 4, 4, 4, 4, 3], [4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 3], 
        [4, 4, 4, 4, 4, 4, 4, 4, 4], [4, 4, 4, 4, 4, 4, 4, 4, 4, 1], 
        [4, 4, 4, 4, 4, 4, 4, 4, 4, 1]
      ];
    
      const focusedPattern = [
        [2], [3], [3, 2], [3, 3], [3, 3, 2], [3, 3, 3], [3, 3, 3, 2], 
        [3, 3, 3, 3], [3, 3, 3, 3, 2], [3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 2], 
        [3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 2], [3, 3, 3, 3, 3, 3, 3], 
        [3, 3, 3, 3, 3, 3, 3, 2], [3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 2], 
        [3, 3, 3, 3, 3, 3, 3, 3, 3], [3, 3, 3, 3, 3, 3, 3, 3, 3, 1], 
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 1]
      ];
      if (type === "Spontaneous") {
        newSlots =  spontaneousPattern[level-1].map(slotLevel => new Array(slotLevel).fill(false));
      } else if (type === "Focused") {
        newSlots = focusedPattern[level - 1].map(slotLevel => Array.from({ length: slotLevel }, () => ({ name: '', used: false })));
        setFocusedSpellNames(newSlots);
        setIsNamingModalOpen(true);
      }
      setSlots(newSlots);
    }, [type, level]);

  const toggleBubble = (slotIndex, bubbleIndex) => {
    setSlots(prevSlots => {
      const newSlots = [...prevSlots];
      newSlots[slotIndex] = [...prevSlots[slotIndex]];
      newSlots[slotIndex][bubbleIndex] = !newSlots[slotIndex][bubbleIndex];
      return newSlots;
    });
  };

  const handleNameChange = (levelIndex, slotIndex, event) => {
    setFocusedSpellNames(prevNames => {
      const newNames = [...prevNames];
      newNames[levelIndex] = [...prevNames[levelIndex]];
      newNames[levelIndex][slotIndex].name = event.target.value;
      return newNames;
    });
  };

  const handleNameSubmit = () => {
    setIsNamingModalOpen(false);
  };

  const handleSpellClick = (levelIndex, slotIndex) => {
    setFocusedSpellNames(prevNames => {
      const newNames = [...prevNames];
      newNames[levelIndex] = [...prevNames[levelIndex]];
      newNames[levelIndex][slotIndex].used = true;
      return newNames;
    });
  };

    const addSpellSlot = (levelIndex) => {
        setNewSpellDetails({ levelIndex, name: '' });
        setIsAddSpellModalOpen(true);
    };

    const handleNewSpellNameChange = (event) => {
        setNewSpellDetails(prevDetails => ({ ...prevDetails, name: event.target.value }));
    };

    const handleNewSpellSubmit = (event) => {
        event.preventDefault();

        setFocusedSpellNames(prevNames => {
            const newNames = [...prevNames];
            newNames[newSpellDetails.levelIndex] = [...prevNames[newSpellDetails.levelIndex], { name: newSpellDetails.name, used: false }];
            return newNames;
        });

        setIsAddSpellModalOpen(false);
    };

  return (
    <div className="spell-slots">
      {isNamingModalOpen && (
        <div className="modal">
            <button className="modal-close" onClick={onDelete}>X</button>
            <form className="mdc-dialog__container" onSubmit={handleNameSubmit}>
            {focusedSpellNames.map((levelNames, levelIndex) => (
                <div key={levelIndex} className="mdc-dialog__surface">
                    <h4 className="mdc-dialog__title">Level {levelIndex + 1}</h4>
                    {levelNames.map((name, slotIndex) => (
                    <div className="mdc-text-field">
                        <input
                        className="mdc-text-field__input"
                        type="text"
                        id={`level${levelIndex}-slot${slotIndex}`}
                        value={name.name}
                        onChange={(event) => handleNameChange(levelIndex, slotIndex, event)}
                        placeholder="Spell Name"
                        required
                        />
                    <div className="mdc-line-ripple"></div>
                    </div>
                ))}
                </div>
            ))}
            <button type="submit" className="mdc-button mdc-button--raised">Done</button>
            </form>
        </div>      
      )}
        {isAddSpellModalOpen && (
            <div className="modal">
                <button className="modal-close" onClick={() => setIsAddSpellModalOpen(false)}>X</button>
                <form className="mdc-dialog__container" onSubmit={handleNewSpellSubmit}>
                    <div className="mdc-dialog__surface">
                        <h4 className="mdc-dialog__title">Add New Spell</h4>
                        <div className="mdc-text-field">
                            <input
                                className="mdc-text-field__input"
                                type="text"
                                value={newSpellDetails.name}
                                onChange={handleNewSpellNameChange}
                                placeholder="Spell Name"
                            />
                            <div className="mdc-line-ripple"></div>
                        </div>
                        <button type="submit" className="mdc-button mdc-button--raised">Add</button>
                    </div>
                </form>
            </div>
        )}
      {type === "Spontaneous" && slots.map((slot, slotIndex) => (
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
         {type === "Focused" && focusedSpellNames.map((levelNames, levelIndex) => (
            <div key={levelIndex} className="level mdc-card">
                <h4 className="mdc-typography--headline5">Level {levelIndex + 1}</h4>
                <div style={{display: "flex", alignItems: "center"}}>
                    {levelNames.map((spell, slotIndex) => (
                        <button 
                            key={slotIndex} 
                            onClick={() => handleSpellClick(levelIndex, slotIndex)}
                            className={`mdc-button mdc-button--raised ${spell.used ? 'spell-used' : ''}`}
                        >
                            {spell.name}
                        </button>
                    ))}
                    <button className='add-spell-button' onClick={() => addSpellSlot(levelIndex)}><AddCircleOutlineRoundedIcon /></button>
                </div>
            </div>      
        ))}
    </div>
  );
}

export default SpellSlots;
