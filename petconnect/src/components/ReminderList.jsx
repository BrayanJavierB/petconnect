import PropTypes from 'prop-types';  // Importa PropTypes

const ReminderList = ({ reminders, onDelete, onEdit }) => {
  return (
    <div>
      <h3>Recordatorios</h3>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            <span>{reminder.text} - {new Date(`1970-01-01T${reminder.time}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
            <a> </a>
            <button onClick={() => onEdit(reminder)}>Editar</button>
            <a> </a> 
            <button onClick={() => onDelete(reminder.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReminderList.propTypes = {
  reminders: PropTypes.array.isRequired,  // Valida que reminders sea un array
  onDelete: PropTypes.func.isRequired,  // Valida que onDelete sea una función
  onEdit: PropTypes.func.isRequired,  // Valida que onEdit sea una función
};

export default ReminderList;
