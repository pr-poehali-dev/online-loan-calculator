import React from 'react';

export default function SliderStyles() {
  return (
    <style jsx>{`
      .slider-3d::-webkit-slider-thumb {
        appearance: none;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6);
        cursor: pointer;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
        border: 3px solid rgba(255, 255, 255, 0.8);
        transition: all 0.3s ease;
        touch-action: manipulation;
      }
      .slider-3d::-webkit-slider-thumb:hover,
      .slider-3d::-webkit-slider-thumb:active {
        transform: scale(1.1);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(59, 130, 246, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.5);
      }
      .slider-3d::-moz-range-thumb {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #3b82f6, #10b981, #8b5cf6);
        cursor: pointer;
        border: 3px solid rgba(255, 255, 255, 0.8);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(59, 130, 246, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.3);
        transition: all 0.3s ease;
      }
      .slider-3d::-moz-range-thumb:hover,
      .slider-3d::-moz-range-thumb:active {
        transform: scale(1.1);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4), 0 8px 16px rgba(59, 130, 246, 0.6);
      }
      .slider-3d::-webkit-slider-track {
        height: 32px;
        border-radius: 16px;
        background: linear-gradient(90deg, #dbeafe, #d1fae5);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .slider-3d::-moz-range-track {
        height: 32px;
        border-radius: 16px;
        background: linear-gradient(90deg, #dbeafe, #d1fae5);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
        border: none;
      }
      
      /* Mobile optimizations */
      @media (max-width: 768px) {
        .slider-3d::-webkit-slider-thumb {
          height: 44px;
          width: 44px;
        }
        .slider-3d::-moz-range-thumb {
          height: 44px;
          width: 44px;
        }
        .slider-3d::-webkit-slider-track {
          height: 36px;
          border-radius: 18px;
        }
        .slider-3d::-moz-range-track {
          height: 36px;
          border-radius: 18px;
        }
      }
      
      /* Touch target improvements */
      .slider-3d {
        touch-action: pan-x;
        -webkit-tap-highlight-color: transparent;
      }
    `}</style>
  );
}