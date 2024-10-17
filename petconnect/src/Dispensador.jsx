import './dispensador.css';
import foodImage from './assets/food.png'; // Importamos la imagen desde src/assets

const BLYNK_AUTH_TOKEN = '9jRm466Mo8fx-hX43451WseRlMiX8dS3'; // Tu token de autenticación
const BLYNK_API_URL = `/api/external/api/update?token=${BLYNK_AUTH_TOKEN}&v0=1`;

const App = () => {
    const activateMotor = async () => {
        try {
            const response = await fetch(BLYNK_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Dispensador Activado exitosamente');
            } else {
                const errorText = await response.text();
                console.error('Error de respuesta:', errorText);
                alert(`Error al activar el motor: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error en la conexión con el servidor Blynk');
        }
    };

    return (
        <div className="dispensador-container"> {/* Clase contenedora específica para el dispensador */}
            <h1>Dispensador de alimentos de la Mascota</h1>
            <img src={foodImage} alt="Imagen del dispensador" className="image" />
            <h2>Petconnect</h2> 
            <button onClick={activateMotor} className="button">
                Activar Dispensador
            </button>
        </div>
    );
};

export default App;
