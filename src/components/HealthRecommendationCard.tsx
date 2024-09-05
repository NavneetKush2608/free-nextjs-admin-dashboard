import React from 'react';

interface HealthRecommendation {
  general: string;
  sensitive: string;
  children: string;
  elderly: string;
}

const getRecommendation = (aqi: number): HealthRecommendation => {
  if (aqi <= 50) {
    return {
      general: "Air quality is satisfactory, and air pollution poses little or no risk.",
      sensitive: "Unusually sensitive people should consider reducing prolonged or heavy exertion.",
      children: "It's a great day for outdoor activities!",
      elderly: "Enjoy your normal outdoor activities."
    };
  } else if (aqi <= 100) {
    return {
      general: "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.",
      sensitive: "People with respiratory or heart conditions should limit prolonged outdoor exertion.",
      children: "It's okay to be active outside, but take more breaks and do less intense activities.",
      elderly: "Reduce prolonged or heavy exertion. Take more breaks during outdoor activities."
    };
  } else if (aqi <= 150) {
    return {
      general: "Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
      sensitive: "Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling.",
      children: "Take more breaks and do less intense activities. Watch for symptoms such as coughing or shortness of breath.",
      elderly: "Avoid prolonged or heavy exertion. Move activities indoors or reschedule to a time when the air quality is better."
    };
  } else {
    return {
      general: "Health alert: The risk of health effects is increased for everyone.",
      sensitive: "Avoid all physical activity outdoors.",
      children: "Avoid prolonged or heavy exertion. Consider moving activities indoors or rescheduling to a time when air quality is better.",
      elderly: "Avoid all physical activity outdoors. Move activities indoors or reschedule to a time when air quality is better."
    };
  }
};

interface HealthRecommendationCardProps {
  aqi: number;
}

const HealthRecommendationCard: React.FC<HealthRecommendationCardProps> = ({ aqi }) => {
  const recommendation = getRecommendation(aqi);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
        Health Recommendations (AQI: {aqi})
      </h4>
      <div className="space-y-4">
        <div>
          <h5 className="font-semibold text-black dark:text-white">General Population:</h5>
          <p>{recommendation.general}</p>
        </div>
        <div>
          <h5 className="font-semibold text-black dark:text-white">Sensitive Groups:</h5>
          <p>{recommendation.sensitive}</p>
        </div>
        <div>
          <h5 className="font-semibold text-black dark:text-white">Children:</h5>
          <p>{recommendation.children}</p>
        </div>
        <div>
          <h5 className="font-semibold text-black dark:text-white">Elderly:</h5>
          <p>{recommendation.elderly}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthRecommendationCard;
