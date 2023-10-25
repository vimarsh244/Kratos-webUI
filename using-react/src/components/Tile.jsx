import React from 'react';

const Tile = ({ title, onMove, onRemove }) => {
  return (
    <div className="tile">
      <div className="tile-header">
        <h3>{title}</h3>
        <button onClick={onRemove} className="remove-button">
          Remove
        </button>
      </div>
      <div className="move-button" onMouseDown={onMove}>
        Move
      </div>
      <div className="tile-content">
        {/* Add your graph and values here */}
      </div>
    </div>
  );
};

export default Tile;
