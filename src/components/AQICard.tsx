import React from 'react';
import CircularProgressBar from './CircularProgressBar';

interface AQICardProps {
  value: number | string;
  text: string;
  subText: string;
  color: string;
}

const AQICard: React.FC<AQICardProps> = ({ value, text, subText, color }) => {
  const numericValue = typeof value === 'number' ? value : 0;

  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-md dark:bg-boxdark p-4 h-full">
      <div className="z-10 relative flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold mb-4" style={{ color }}>{text}</h2>
        <div className="flex items-center justify-center">
          <CircularProgressBar
            value={numericValue}
            maxValue={500}
            size={200}
            strokeWidth={15}
            text="AQI"
            subText={subText}
            color={color}
            textSize="large"
          />
        </div>
      </div>
    </div>
  );
};

export default AQICard;