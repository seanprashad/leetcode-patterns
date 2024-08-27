import React, { useState, useEffect } from 'react';
import Toggle from 'react-toggle';

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <Toggle
      id="darkMode-toggle"
      checked={darkMode}
      onChange={toggleDarkMode}
      icons={{ checked: '🌙', unchecked: '☀️' }}
    />
  );
};

export default DarkMode;
