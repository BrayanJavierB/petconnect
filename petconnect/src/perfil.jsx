import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './credenciales'; // Importamos db y auth de credenciales.js
import './Perfil.css'; // Importamos estilos para un diseño bonito

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    nombre: '',
    apellido: '',
    edad: '',
    genero: [],
    telefono: '',
    tiposMascotas: [],
    otroTipoMascota: '',
    descripcionMascota: '',
    nombreMascota: '',
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchProfileData(user.uid);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProfileData = async (uid) => {
    try {
      const docRef = doc(db, 'perfiles', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    } catch (error) {
      console.error("Error al obtener los datos del perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e, name) => {
    const { checked, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: checked
        ? [...prevData[name], value]
        : prevData[name].filter((item) => item !== value),
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, 'perfiles', user.uid);
      await setDoc(docRef, profileData, { merge: true });
      // Eliminado el mensaje de éxito
      setIsEditing(false);
    } catch (error) {
      console.error("Error al guardar los datos del perfil:", error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>Debes iniciar sesión para ver tu perfil.</p>;
  }

  return (
    <div className="perfil-body">
      <div className="profile-container">
        <h2>Perfil</h2>

        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={profileData.nombre}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={profileData.apellido}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="edad">Edad:</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={profileData.edad}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Género:</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    value="Masculino"
                    checked={profileData.genero.includes('Masculino')}
                    onChange={(e) => handleCheckboxChange(e, 'genero')}
                  />
                  Masculino
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Femenino"
                    checked={profileData.genero.includes('Femenino')}
                    onChange={(e) => handleCheckboxChange(e, 'genero')}
                  />
                  Femenino
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={profileData.telefono}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Tipo de Mascota:</label>
              <div className="checkbox-group">
                {['Gato', 'Perro', 'Loro', 'Hamster', 'Otro'].map((tipo) => (
                  <label key={tipo}>
                    <input
                      type="checkbox"
                      value={tipo}
                      checked={profileData.tiposMascotas.includes(tipo)}
                      onChange={(e) => handleCheckboxChange(e, 'tiposMascotas')}
                    />
                    {tipo}
                  </label>
                ))}
              </div>
            </div>

            {profileData.tiposMascotas.includes('Otro') && (
              <div className="form-group">
                <label htmlFor="otroTipoMascota">Otro tipo de mascota:</label>
                <input
                  type="text"
                  id="otroTipoMascota"
                  name="otroTipoMascota"
                  value={profileData.otroTipoMascota}
                  onChange={handleInputChange}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="descripcionMascota">Descripción de Mascota:</label>
              <textarea
                id="descripcionMascota"
                name="descripcionMascota"
                value={profileData.descripcionMascota}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="nombreMascota">Nombre de Mascota:</label>
              <input
                type="text"
                id="nombreMascota"
                name="nombreMascota"
                value={profileData.nombreMascota}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="button-container">
              <button type="submit" className="save-btn">
                Guardar
              </button>
              <button
                type="button"
                className="return-btn"
                onClick={() => setIsEditing(false)}
              >
                Volver
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <p><strong>Nombre:</strong> {profileData.nombre}</p>
            <p><strong>Apellido:</strong> {profileData.apellido}</p>
            <p><strong>Edad:</strong> {profileData.edad} años</p>
            <p><strong>Género:</strong> {profileData.genero.join(', ')}</p>
            <p><strong>Teléfono:</strong> {profileData.telefono}</p>
            <p><strong>Tipo de Mascota:</strong> {profileData.tiposMascotas.join(', ')}</p>
            <p><strong>Descripción de Mascota:</strong> {profileData.descripcionMascota}</p>
            <p><strong>Nombre de Mascota:</strong> {profileData.nombreMascota}</p>

            <div className="button-container">
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                Editar Perfil
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
