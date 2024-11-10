import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Recommendation = ({ reminders }) => {
  const [feedingRecommendation, setFeedingRecommendation] = useState('');
  const [rewardRecommendation, setRewardRecommendation] = useState('');
  const [additionalRecommendation, setAdditionalRecommendation] = useState(''); // Nueva recomendación
  const [baseTime] = useState('08:00 a.m'); // Hora base inicial para sugerir la alimentación

  useEffect(() => {
    if (reminders.length === 0) {
      // Sin recordatorios, sugerir la hora base para la primera alimentación
      setFeedingRecommendation(`No se ha registrado ninguna hora de alimentación. Se recomienda alimentar a tu mascota alrededor de las ${baseTime}.`);
    } else {
      const feedingTimes = reminders.map(reminder => new Date(`1970-01-01T${reminder.time}:00`));
      const avgTime = new Date(feedingTimes.reduce((total, time) => total + time.getTime(), 0) / feedingTimes.length);
      const nextFeedingTime = new Date(avgTime);
      nextFeedingTime.setHours(nextFeedingTime.getHours() + 4); // Sugerir alimentación cada 4 horas

      setFeedingRecommendation(`Próxima alimentación sugerida a las ${nextFeedingTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`);

      // Mostrar recomendación para premios solo después de la primera alimentación
      if (reminders.length > 0) {
        const rewardTime = new Date(avgTime);
        rewardTime.setHours(rewardTime.getHours() + 2); // Sugerir premios cada 2 horas
        setRewardRecommendation(`Dale un premio aproximadamente a las ${rewardTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`);
      }
    }

    // Lógica para recomendar dejar de agregar recordatorios si ya hay suficientes
    if (reminders.length >= 3) {
      setAdditionalRecommendation('Ya tienes suficientes recordatorios de alimentación. No es necesario agregar más por ahora.');
    } else if (reminders.length > 0 && reminders.length < 3) {
      setAdditionalRecommendation('Puedes seguir agregando recordatorios si lo deseas.');
    } else {
      setAdditionalRecommendation('Agrega tu primer recordatorio para alimentar a tu mascota');
    }

  }, [reminders, baseTime]); // Agregar baseTime a las dependencias si es necesario

  return (
    <div className="recommendations">
      <h3>Recomendaciones</h3>
      <p>{feedingRecommendation}</p>
      {reminders.length > 0 && <p>{rewardRecommendation}</p>} {/* Solo mostrar la recomendación de premio después de la primera alimentación */}
      <p>{additionalRecommendation}</p> {/* Mostrar recomendación sobre el número de recordatorios */}
    </div>
  );
};

Recommendation.propTypes = {
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Recommendation;
