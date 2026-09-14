import { createContext, useState, useEffect } from 'react';

export const StudentProfileContext = createContext();

const EMPTY_PROFILE = {
  fullName: '',
  phone: '',
  enrollmentNo: '',
  branch: '',
  batch: '',
  cgpa: '',
  skills: [],
  portfolio: '',
  // File objects can't be saved to localStorage (they're not JSON-serializable),
  // so we remember the file's name only, just enough for the UI to show
  // "a resume is on file". The actual file would live on a real backend.
  resumeFileName: ''
};

export function StudentProfileProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('studentProfile');
    return saved ? JSON.parse(saved) : EMPTY_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('studentProfile', JSON.stringify(profile));
  }, [profile]);

  // Merges partial updates so callers don't have to pass every field back.
  const updateProfile = (updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <StudentProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </StudentProfileContext.Provider>
  );
}
