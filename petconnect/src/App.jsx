// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db, auth } from './credenciales';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Login from './login';
import Home from './home';
import Perfil from './perfil';
import Dispensador from './Dispensador';
import ReminderAgent from './components/ReminderAgent'; // Importa ReminderAgent

function App() {
    const [usuario, setUsuario] = useState(null);
    const [nombreUsuario, setNombreUsuario] = useState(null);
    const [error, setError] = useState(null);

    const obtenerNombreUsuario = async (uid, correo) => {
        try {
            const nombreGuardado = localStorage.getItem(`nombreUsuario-${correo}`);
            if (nombreGuardado) {
                setNombreUsuario(nombreGuardado);
            } else {
                const docSnap = await getDoc(doc(db, "usuarios", uid));
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setNombreUsuario(data.nombre);
                    localStorage.setItem(`nombreUsuario-${correo}`, data.nombre);
                } else {
                    console.log("No se encontró el documento de usuario.");
                    setError("Error: Documento de usuario no encontrado.");
                }
            }
        } catch (error) {
            console.error("Error al obtener el documento:", error);
            setError("Error al obtener el nombre de usuario.");
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
            if (usuarioFirebase) {
                setUsuario(usuarioFirebase);
                const correo = usuarioFirebase.email;
                const uid = usuarioFirebase.uid;
                obtenerNombreUsuario(uid, correo);
            } else {
                setUsuario(null);
                setNombreUsuario(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <Routes>
                {error && <p className="error-message">{error}</p>}
                <Route path="/" element={usuario ? <Home nombreUsuario={nombreUsuario} /> : <Login />} />
                <Route path="/dispensador" element={<Dispensador />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/reminder-agent" element={<ReminderAgent nombreUsuario={nombreUsuario} />} /> {/* Pass nombreUsuario */}
            </Routes>
        </Router>
    );
}

export default App;


