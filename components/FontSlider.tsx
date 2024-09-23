"use client"
import React, { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';

const FontSlider = () => {
  const [fontSize, setFontSize] = useState(16);
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize, 10));
    }
  }, []);

  // Handle font size change
  const handleFontSizeChange = (newSize:any) => {
    setFontSize(newSize);
    localStorage.setItem('fontSize', newSize); 
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      <div className="flex items-center justify-between w-full mb-4">
        <label className="text-lg text-gray-700 dark:text-gray-300">
          Font Size: {fontSize}px
        </label>
      </div>

      {/* Slider for font size control */}
      <Slider
        value={[fontSize]}  // Pass the font size value
        min={12}
        max={30}
        step={1}
        onValueChange={(value) => handleFontSizeChange(value[0])} // Update the state when slider changes
      />

      {/* Example text to show font size change */}
      <p
        className="mt-6 text-center h-28 "
        style={{ fontSize: `${fontSize}px` }}  // Apply the font size dynamically
      >
        This is an example text. Use the slider to change the font size.
      </p>
    </div>
  );
};

export default FontSlider;
