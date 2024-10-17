// Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from './assets/image.png';
import { db, auth } from "./credenciales"; // Importar las credenciales
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import './app.css';

const Login = () => {
    const [registrarme, setRegistrando] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const functAutenticacion = async (e) => {
        e.preventDefault();
        const correo = e.target.elements.email.value;
        const contraseña = e.target.elements.password.value;
        const nombre = registrarme ? e.target.elements.nombre.value : "";

        if (registrarme) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
                const user = userCredential.user;

                // Guardar el nombre del usuario en Firestore
                await setDoc(doc(db, "usuarios", user.uid), {
                    nombre: nombre,
                    email: correo
                });

                // Redirigir a la página de bienvenida tras el registro exitoso
                navigate("/");
            } catch (error) {
                alert("Asegúrate de que la contraseña tenga más de 8 caracteres");
                console.error("Error de registro:", error);
            }
        } else {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
                const user = userCredential.user;

                // Leer el nombre del usuario desde Firestore
                const docRef = doc(db, "usuarios", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const nombreUsuario = docSnap.data().nombre;
                    console.log("Bienvenido, " + nombreUsuario);
                    navigate("/"); // Redirigir a la página de bienvenida
                } else {
                    console.log("El documento no existe");
                }
            } catch (error) {
                alert("El correo o la contraseña son incorrectos");
                console.error("Error de inicio de sesión:", error);
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <div className="container">
                <div className="login-card">
                    <div className="card-body">
                        <img src={logo} alt="Perfil" className='profile-image' />
                        <form onSubmit={functAutenticacion}>
                            {registrarme && (
                                <input
                                    type="text"
                                    name="nombre"
                                    placeholder='Ingresar Nombre'
                                    className='input-field'
                                    required
                                />
                            )}
                            <input
                                type="email"
                                name="email"
                                placeholder='Ingresar Email'
                                className='input-field'
                                required
                            />
                            <div className="password-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder='Ingresar Contraseña'
                                    className='input-field'
                                    required
                                />
                                <button
                                    type="button"
                                    className="show-password-btn"
                                    onClick={toggleShowPassword}
                                >
                                    {showPassword ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                            <button type="submit" className='submit-btn'>
                                {registrarme ? "Registrarse" : "Iniciar Sesión"}
                            </button>
                        </form>
                        <h4 className='toggle-text'>
                            {registrarme ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
                            <button className='switch-btn' onClick={() => setRegistrando(!registrarme)}>
                                {registrarme ? "Inicia Sesión" : "Regístrate"}
                            </button>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
