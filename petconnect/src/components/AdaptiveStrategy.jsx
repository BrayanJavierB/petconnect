import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';  // Importa PropTypes

const AdaptiveStrategy = ({ reminders }) => {
  const [feedingAnalysis, setFeedingAnalysis] = useState('');
  const [overfeedingAlert, setOverfeedingAlert] = useState('');

  useEffect(() => {
    const maxMeals = 4; // Límite de comidas al día

    // Si hay más de un recordatorio, calcular intervalos y evaluar sobrealimentación
    if (reminders.length > 1) {
      const feedingTimes = reminders.map(reminder => new Date(`1970-01-01T${reminder.time}:00`).getTime());
      const intervals = feedingTimes
        .slice(1)
        .map((time, index) => (time - feedingTimes[index]) / (1000 * 60 * 60)); // Intervalo en horas

      const avgInterval = intervals.reduce((total, interval) => total + interval, 0) / intervals.length;

      // Comprobar si los intervalos son mayores a lo ideal
      if (avgInterval <= 4) {
        setFeedingAnalysis("Estás alimentando a tu mascota regularmente, ¡buen trabajo!");
        setOverfeedingAlert('');
      } else {
        setFeedingAnalysis("Los intervalos de alimentación son largos, considera alimentar a tu mascota con mayor frecuencia.");
        setOverfeedingAlert('');
      }
    } else {
      setFeedingAnalysis("Registra al menos dos horarios de alimentación para obtener una estrategia adaptativa.");
      setOverfeedingAlert('');
    }

    // Verificar si se está sobrealimentando
    if (reminders.length > maxMeals) {
      setOverfeedingAlert("¡Estás exagerando la cantidad de alimentos que le proporcionas a tu mascota! Intenta espaciar más las comidas.");
      setFeedingAnalysis('');
    }

  }, [reminders]);

  return (
    <div className="adaptive-strategy">
      <h3>Estrategias Adaptativas</h3>
      <p>{feedingAnalysis}</p>
      <p>{overfeedingAlert}</p>
    </div>
  );
};

AdaptiveStrategy.propTypes = {
  reminders: PropTypes.array.isRequired,  // Valida que reminders sea un array
};

export default AdaptiveStrategy;
