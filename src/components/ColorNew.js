import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import './ColorNew.css';

// ==================================================

/**
 * Displays a form to choose a color and name it.
 */
function ColorNew() {
  /**
   * @type {Function} saveColor - Adds color name and value to list of
   *   stored colors.  Parameters: { name: value }.
   */
  const { saveColor } = useOutletContext();
  const initialFormData = { colorName: '', colorValue: '#000000' };
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    saveColor({ [formData.colorName]: formData.colorValue });
    navigate('/colors');
  }

  return (
    <section className="ColorNew">
      <form className="ColorNew__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="ColorNew__input-color-name">Color Name</label>
          <input
            id="ColorNew__input-color-name"
            type="text"
            name="colorName"
            value={formData.colorName}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="ColorNew__input-color-value">Color Value</label>
          <input
            id="ColorNew__input-color-value"
            type="color"
            name="colorValue"
            value={formData.colorValue}
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add this color</button>
      </form>
    </section>
  );
}

// ==================================================

export default ColorNew;
