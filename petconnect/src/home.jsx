import PropTypes from "prop-types";
import "./index.css";
import mascotaIcono from "./assets/seguro.png";
import home from "./assets/hogar.png";
import codigo from "./assets/codigo.png";
import iot from "./assets/iot.png";
import alimentos from "./assets/alimentos.png";
import mascotas from "./assets/mascotas.png";
import { getAuth, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useState } from "react";
import appFirebase from "./credenciales";

const auth = getAuth(appFirebase);

const Home = ({ nombreUsuario }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("Sesión cerrada exitosamente.");
        }).catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="app">
            <header className="header">
                <nav className="navbar">
                    <h1 className="logo">PETCONNECT</h1>
                    <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                        <li><a href="#objetivos"><strong>Objetivos</strong></a></li>
                        <li><a href="#caracteristicas"><strong>Características</strong></a></li>
                        <li><a href="#iot"><strong>Conexion IOT</strong></a></li>
                        <li><a href="#iot-code-explanation"><strong>Codigo fuente</strong></a></li>
                        <li><a href="#contacto"><strong>Contacto</strong></a></li>
                        <li><Link to="/dispensador"><strong>Activar Dispensador</strong></Link></li>
                        <li><Link to="/perfil"><strong>Perfil</strong></Link></li>
                    </ul>
                    <button className="logout-button" onClick={handleLogout}>
                        Cerrar Sesión
                    </button>
                    <div className="menu-icon" onClick={toggleMenu}>
                        &#9776; {/* Icono de hamburguesa */}
                    </div>
                </nav>
            </header>

            <main>
                {/* Bienvenida personalizada */}
                <section className="welcome">
                    <h2>Bienvenido</h2>
                    <p></p>
                    <h2>{nombreUsuario ? nombreUsuario : "Usuario"}</h2>
                </section>

                {/* Sección Sobre el Dispensador */}
                <section className="about" id="sobre">
                    <div className="about-content">
                        <h2>Dispensador de alimentos para mascotas</h2>
                        <img src={mascotas} alt="Mascota" className="about-imagen" />
                        <p>
                            El dispensador automático de alimentos para mascotas está diseñado para facilitar la alimentación de tus animales de compañía desde cualquier lugar mediante una conexión IoT con la plataforma <a href="https://blynk.io/" target="_blank" rel="noopener noreferrer">Blynk</a>. Utilizando la tecnología de la placa ESP8266, este dispositivo permite programar las comidas de tu mascota de manera precisa y automática, ofreciéndote mayor control y tranquilidad.
                        </p>
                        <img src={alimentos} alt="Mascota" className="about-image" />
                    </div>
                </section>

                {/* Sección de Objetivos */}
                <section className="objectives" id="objetivos">
                    <h2>Objetivos del Proyecto</h2>
                    <div className="objective-cards">
                        <div className="card">
                            <img src={home} alt="Hogar" className="icon" />
                            <div className="card-content">
                                <h3>Asegurar alimentación adecuada</h3>
                                <p>Asegurar que las mascotas reciban la cantidad adecuada de alimentos a tiempo, incluso cuando sus dueños no están en casa.</p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={home} alt="Solución Automatizada" className="icon" />
                            <div className="card-content">
                                <h3>Automatización en la gestión</h3>
                                <p>Ofrecer una solución automatizada para la gestión de las comidas de las mascotas.</p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={home} alt="Monitoreo Fácil" className="icon" />
                            <div className="card-content">
                                <h3>Monitoreo simple</h3>
                                <p>Facilitar el monitoreo de la alimentación de las mascotas mediante una app fácil de usar.</p>
                            </div>
                        </div>
                        <div className="card">
                            <img src={home} alt="Tecnología IoT" className="icon" />
                            <div className="card-content">
                                <h3>Integración IoT</h3>
                                <p>Integrar la tecnología IoT para mejorar la experiencia de los usuarios con dispositivos inteligentes.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Características y Funcionalidades */}
                <section className="features" id="caracteristicas">
                    <h2>Características y Funcionalidades</h2>
                    <div className="feature-cards">
                        <div className="card">
                            <img src={mascotaIcono} alt="Icono mascota" className="icon" />
                            <h3>Programación Automática de Comidas</h3>
                            <p>Controla la cantidad de alimento y el tiempo de alimentación desde tu smartphone, donde sea que te encuentres.</p>
                        </div>
                        <div className="card">
                            <img src={mascotaIcono} alt="Icono mascota" className="icon" />
                            <h3>Automatización Total</h3>
                            <p>Una vez configurado, el dispensador distribuirá automáticamente las raciones de comida programadas para tu mascota.</p>
                        </div>
                        <div className="card">
                            <img src={mascotaIcono} alt="Icono mascota" className="icon" />
                            <h3>Compatibilidad con Wi-Fi</h3>
                            <p>El dispensador se conecta a tu red Wi-Fi para facilitar la programación a través de la aplicación Blynk.</p>
                        </div>
                        <div className="card">
                            <img src={mascotaIcono} alt="Icono mascota" className="icon" />
                            <h3>Fácil Monitoreo</h3>
                            <p>Monitorea el historial de alimentación y realiza ajustes en tiempo real desde tu dispositivo móvil.</p>
                        </div>
                    </div>
                </section>

                {/* Aplicación y Conexión IoT */}
                <section className="iot-connection" id="iot">
                <h2>Conexión IoT con Blynk</h2>
                <div className="iot-grid">
                    <div className="iot-text">
                        <p>
                            Nuestro dispensador se conecta mediante la plataforma Blynk, que permite a los usuarios controlar el dispositivo desde cualquier parte del mundo. Para configurar tu dispensador:
                        </p>
                        <ol>
                            <li>Descarga la aplicación móvil de Blynk desde su sitio web o tienda de aplicaciones.</li>
                            <li>Crea una cuenta y configura un nuevo proyecto para el dispensador de alimentos.</li>
                            <li>Usa la placa ESP8266 para conectar el dispensador a la red Wi-Fi.</li>
                            <li>En la app Blynk, configura los pines virtuales para vincular un botón y poder abrir la compuerta del dispensador.</li>
                            <li>¡Listo! Ahora puedes controlar la alimentación de tu mascota desde tu dispositivo móvil.</li>
                        </ol>
                        <p>
                            Para más detalles sobre cómo configurar la conexión IoT de tu dispensador, visita el sitio web de <a href="https://blynk.io/" target="_blank" rel="noopener noreferrer">Blynk</a>.
                        </p>
                    </div>
                    <div className="iot-image">
                        <a href="https://blynk.io/" target="_blank" rel="noopener noreferrer">
                            <img src={iot} alt="Conexión IoT" className="iot-icon" />
                        </a>
                    </div>
                </div>
            </section>

            <section className="iot-code-explanation" id="iot-code-explanation">
    <h2>Explicación del Código Fuente</h2>
    <div className="iot-code-image">
        <img src={codigo} alt="Código del Dispensador" className="codigo-image" />
    </div>
    <pre>
        {`#define BLYNK_TEMPLATE_ID           "TMPL2rbKhoI0U"
#define BLYNK_TEMPLATE_NAME         "Dispensador"
#define BLYNK_AUTH_TOKEN            "9jRm466Mo8fx-hX43451WseRlMiX8dS3"
#define BLYNK_PRINT Serial

#include <Servo.h>
Servo motor;

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "Nombre del internet";
char pass[] = "contraseña del internet";

BlynkTimer timer;

// This function is called every time the Virtual Pin 0 state changes
BLYNK_WRITE(V0)
{
  // Set incoming value from pin V0 to a variable
  int value = param.asInt();
  if (value == 1) {
    motor.attach(2);
    motor.write(0);
    delay(1000);
    motor.write(120);
    delay(1000);
    motor.detach();
  }
}

// This function is called every time the device is connected to the Blynk.Cloud
BLYNK_CONNECTED()
{
  // Change Web Link Button message to "Congratulations!"
  Blynk.setProperty(V3, "offImageUrl", "https://static-image.nyc3.cdn.digitaloceanspaces.com/general/fte/congratulations.png");
  Blynk.setProperty(V3, "onImageUrl",  "https://static-image.nyc3.cdn.digitaloceanspaces.com/general/fte/congratulations_pressed.png");
  Blynk.setProperty(V3, "url", "https://docs.blynk.io/en/getting-started/what-do-i-need-to-blynk/how-quickstart-device-was-made");
}


void setup()
{
  Serial.begin(115200);
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

void loop()
{
  Blynk.run();
  timer.run();
}`}
    </pre>

    <div className="iot-code-explanation-grid">
        <div className="iot-explanation-text">
            <p>
                El siguiente código permite controlar un servomotor a través de la plataforma IoT <strong>Blynk</strong> utilizando un <strong>ESP8266</strong>. El servomotor es el encargado de abrir y cerrar la compuerta del dispensador de alimentos. A continuación, explicamos paso a paso cada parte del código:
            </p>

            <h3>1. Definiciones Iniciales</h3>
            <p>
                Primero se definen algunos parámetros importantes, como el <strong>Template ID</strong>, el nombre del proyecto en Blynk, y el <strong>Auth Token</strong>, que es único para cada dispositivo registrado en la plataforma Blynk.
            </p>
            <pre>
                {`#define BLYNK_TEMPLATE_ID "TMPL2rbKhoI0U"
#define BLYNK_TEMPLATE_NAME "Dispensador"
#define BLYNK_AUTH_TOKEN "9jRm466Mo8fx-hX43451WseRlMiX8dS3"`}
            </pre>
            <p>
                Estos valores son proporcionados por Blynk cuando creas un nuevo proyecto. Es necesario usar el <strong>Auth Token</strong> para conectar el ESP8266 a la plataforma de Blynk.
            </p>

            <h3>2. Importación de Librerías</h3>
            <p>
                Se importan las librerías necesarias para el funcionamiento del ESP8266, el servomotor y la conexión a Blynk.
            </p>
            <pre>
                {`#define BLYNK_PRINT Serial
#include <Servo.h>
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>`}
            </pre>
            <p>
                - La librería <strong>Servo.h</strong> se usa para controlar el servomotor.
                - <strong>ESP8266WiFi.h</strong> gestiona la conexión Wi-Fi del ESP8266.
                - <strong>BlynkSimpleEsp8266.h</strong> facilita la comunicación entre el ESP8266 y la plataforma de Blynk.
            </p>

            <h3>3. Credenciales de Wi-Fi</h3>
            <p>
                Aquí se configuran las credenciales de tu red Wi-Fi (SSID y contraseña) que permiten conectar el ESP8266 a internet.
            </p>
            <pre>
                {`char ssid[] = "";
char pass[] = "";`}
            </pre>

            <h3>4. Configuración del Timer de Blynk</h3>
            <p>
                La función <strong>BlynkTimer</strong> se utiliza para manejar tareas que se ejecutan periódicamente dentro del loop principal.
            </p>
            <pre>{`BlynkTimer timer;`}</pre>

            <h3>5. Control del Servomotor a través del Virtual Pin V0</h3>
            <p>
                Este bloque de código es el que gestiona la apertura y cierre de la compuerta del dispensador de alimentos. Se utiliza el pin virtual <strong>V0</strong> para recibir el valor desde la app de Blynk. Cuando el valor es 1, el servomotor gira para abrir la compuerta y luego se cierra.
            </p>
            <pre>
                {`BLYNK_WRITE(V0)
{
    int value = param.asInt();
    if (value == 1) {
        motor.attach(2);
        motor.write(0);
        delay(1000);
        motor.write(120);
        delay(1000);
        motor.detach();
    }
}`}
            </pre>

            <h3>6. Conexión a Blynk</h3>
            <p>
                Finalmente, en la función <strong>setup()</strong>, se inicia la conexión a Blynk utilizando las credenciales de Wi-Fi y el Auth Token.
            </p>
            <pre>
                {`void setup()
{
    Serial.begin(115200);
    Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}`}
            </pre>
            <p>En el <strong>loop()</strong>, el programa se asegura de que Blynk y el temporizador funcionen correctamente.</p>
            <pre>
                {`void loop()
{
    Blynk.run();
    timer.run();
}`}
            </pre>
        </div>
    </div>
</section>



                {/* Sección de Contacto */}
                <section className="contact" id="contacto">
                    <h2>Contáctanos</h2>
                    <p>¿Tienes dudas? Envíanos un mensaje.</p>
                    <form className="contact-form">
                        <input type="text" placeholder="Nombre" required />
                        <input type="email" placeholder="Correo electrónico" required />
                        <textarea placeholder="Mensaje" required></textarea>
                        <button type="submit">Enviar</button>
                    </form>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 PETCONNECT. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

Home.propTypes = {
    nombreUsuario: PropTypes.string,
};

export default Home;
