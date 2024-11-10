// src/components/ReminderAgent.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import { db, auth } from '../credenciales';  // Update import
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import ReminderList from './ReminderList';
import { Link } from 'react-router-dom';
import ReminderForm from './ReminderForm';
import Volver from "../assets/deshacer.png";
import Recommendation from './Recommendation';
import AdaptiveStrategy from './AdaptiveStrategy';
import '../styles/ReminderAgent.css';

const ReminderAgent = ({ nombreUsuario }) => {
  const [reminders, setReminders] = useState([]);
  const [editingReminder, setEditingReminder] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const remindersRef = collection(db, 'usuarios', currentUser.uid, 'recordatorios');
        const q = query(remindersRef, orderBy("createdAt"));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setReminders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        
        return unsubscribe;
      } else {
        setUser(null);
        setReminders([]);
      }
    });
  }, []);

  const addReminder = async (text, time) => {
    if (user) {
      const remindersRef = collection(db, 'usuarios', user.uid, 'recordatorios');
      await addDoc(remindersRef, { text, time, createdAt: new Date() });
    }
  };

  const editReminder = async (id, newText, newTime) => {
    if (user) {
      const reminderRef = doc(db, 'usuarios', user.uid, 'recordatorios', id);
      await updateDoc(reminderRef, { text: newText, time: newTime });
    }
  };

  const deleteReminder = async (id) => {
    if (user) {
      const reminderRef = doc(db, 'usuarios', user.uid, 'recordatorios', id);
      await deleteDoc(reminderRef);
    }
  };

  return (
    <div className="agent">
      <div className="volver-container">
          <Link to="/">
            <img src={Volver} alt="Volver" className="volver-icon" />
          </Link>
        </div>
      <h2>Agente Inteligente de Alimentación de Mascotas</h2>
      {user ? 
      (
        <>
          {/* Personalized greeting */}
          <h2>Hola, {nombreUsuario ? nombreUsuario : "Usuario"}👋! Bienvenido al agente inteligente.</h2>
          
          <ReminderForm 
            onAdd={addReminder} 
            editingReminder={editingReminder} 
            setEditingReminder={setEditingReminder}
            onEdit={editReminder}
          />
          <ReminderList 
            reminders={reminders} 
            onDelete={deleteReminder} 
            onEdit={setEditingReminder} 
          />
          <Recommendation reminders={reminders} />
          <AdaptiveStrategy reminders={reminders} />
        </>
      ) : (
        <p>Inicia sesión para ver y gestionar tus recordatorios y recomendaciones.</p>
      )}
    </div>
  );
};

ReminderAgent.propTypes = {
  reminders: PropTypes.array.isRequired,  // Validate reminders as an array
  nombreUsuario: PropTypes.string.isRequired,  // Validate nombreUsuario as a string
};

export default ReminderAgent;
