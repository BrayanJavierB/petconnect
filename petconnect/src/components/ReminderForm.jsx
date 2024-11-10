import { useState } from 'react';
import PropTypes from 'prop-types';

const ReminderForm = ({ onAdd, editingReminder, setEditingReminder, onEdit }) => {
  const [text, setText] = useState(editingReminder ? editingReminder.text : '');
  const [time, setTime] = useState(editingReminder ? editingReminder.time : '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingReminder) {
      // Solo actualiza la hora, no el texto
      onEdit(editingReminder.id, time);  // Solo pasamos la nueva hora
    } else {
      onAdd(text, time);
    }

    setText('');
    setTime('');
    setEditingReminder(null); // Limpiar la edición
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Qué hacer?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required={!editingReminder} // Solo es requerido si no estamos editando
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
      />
      <button type="submit">{editingReminder ? 'Actualizar' : 'Agregar'} Recordatorio</button>
    </form>
  );
};

ReminderForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  editingReminder: PropTypes.object,
  setEditingReminder: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ReminderForm;
