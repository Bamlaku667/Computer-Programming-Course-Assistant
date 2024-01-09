import React from 'react';

const MiniCard = ({ title, value, color }) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2" style={{color: color}}>{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default MiniCard;
