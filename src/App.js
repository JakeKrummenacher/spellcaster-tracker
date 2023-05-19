import React, { useState } from 'react';
import './App.css';
import Spellcaster from './Spellcaster';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [spellcasters, setSpellcasters] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [modalValues, setModalValues] = useState({
    name: '',
    type: '',
    level: '',
    focusedSpells: '',
    focusedSlots: null
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setModalValues({
      ...modalValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editMode) {
      setSpellcasters(spellcasters.map((spellcaster, i) => 
        i === editIndex ? modalValues : spellcaster
      ));
      setEditMode(false);
      setEditIndex(null);
    } else {
      setSpellcasters([...spellcasters, modalValues]);
    }

    setModalValues({ name: '', type: '', level: '', focusedSlots: null });
    closeModal();
  };

  const handleDelete = (index) => {
    setSpellcasters(spellcasters.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setModalOpen(true);
    setModalValues(spellcasters[index]);
    setEditIndex(index);
  };

  return (
    <div className="app">
      <button className="activate-button" onClick={openModal}>
        Add Spellcaster
      </button>
      {modalOpen && (
        <div
        className="modal"
        onClick={closeModal}
        >
          <div
          className="modal-content"
          onClick={e => e.stopPropagation()}
          >
            <h2 className="modal-title">{editMode ? 'Edit Spellcaster' : 'Add a new Spellcaster'}</h2>
            <form onSubmit={handleSubmit} className='modal-content'>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={modalValues.name}
                  onChange={handleInputChange}
                  required
                  placeholder='Spellcaster Name'
                />
              </label>
              <label>
                Type
                <select
                  name="type"
                  value={modalValues.type}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a type</option>
                  <option value="Spontaneous">Spontaneous</option>
                  <option value="Focused">Focused</option>
                </select>
              </label>
              <label style={{display: "flex", flexDirection: "column", alignItems: "center", height: "4rem", justifyContent: "space-between"}}>
                Focus Spells?
                <select
                  name="focusedSpells"
                  value={modalValues.focusedSpells}
                  onChange={handleInputChange}
                  required
                  style={{width: 'max-content'}}
                >
                  <option value="False">No</option>
                  <option value="True">Yes</option>
                </select>
              </label>
              {modalValues.focusedSpells === 'True' && (
                <label>
                Focused Slots
                <div className="focused-slots-options">
                  {["1", "2", "3"].map(option => (
                    <div key={option}>
                      <label>
                        <input
                          type="radio"
                          name="focusedSlots"
                          value={option}
                          checked={modalValues.focusedSlots === option}
                          onChange={handleInputChange}
                        />
                        <span>{option}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </label>
              )}
              <label>
                Level
                <select
                  name="level"
                  value={modalValues.level}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a level</option>
                  {[...Array(20)].map((_, index) => (
                    <option value={index + 1} key={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </label>
              <button className="submit-button" type='submit'>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="spellcaster-container">
        {spellcasters.map((spellcaster, index) => (
          <Spellcaster
            key={index}
            name={spellcaster.name}
            type={spellcaster.type}
            level={spellcaster.level}
            focusedSlots={spellcaster.focusedSlots}
            onDelete={() => handleDelete(index)}
            onEdit={() => handleEdit(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
