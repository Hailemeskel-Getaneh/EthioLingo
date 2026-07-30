import React, { createContext, useState, useContext } from 'react';

const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
  const [currentLesson, setCurrentLesson] = useState(null);
  const [activeScore, setActiveScore] = useState(0);

  return (
    <LessonContext.Provider value={{ currentLesson, setCurrentLesson, activeScore, setActiveScore }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLesson = () => useContext(LessonContext);
