import React from 'react';

const LevelSelect = ({ onLevelSelect }) => (
  <div>
    <p>What level would you like your spellcaster to be?</p>
    <select onChange={event => onLevelSelect(parseInt(event.target.value, 10))}>
      {[...Array(20)].map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
    </select>
  </div>
);

export default LevelSelect;
