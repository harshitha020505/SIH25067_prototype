import React from 'react';
import './button.css';

export default function Button({ text, style, func, disabled }) {
  return (
    <div className="relative w-fit">
      <button
        onClick={func}
        disabled={disabled}
        className={`three-d-button rounded-xs2 uppercase tracking-wider transition-all duration-150
          ${style || ''} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {text}
      </button>
    </div>
  );
}