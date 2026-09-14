import { createContext, useState, useEffect } from 'react';

export const CompanyContext = createContext();

const EMPTY_COMPANY = {
  companyName: '',
  industry: '',
  companySize: '',
  website: '',
  location: '',
  about: ''
};

export function CompanyProvider({ children }) {
  const [company, setCompany] = useState(() => {
    const saved = localStorage.getItem('company');
    return saved ? JSON.parse(saved) : EMPTY_COMPANY;
  });

  useEffect(() => {
    localStorage.setItem('company', JSON.stringify(company));
  }, [company]);

  // Merges partial updates so callers don't have to pass every field back.
  const updateCompany = (updates) => {
    setCompany(prev => ({ ...prev, ...updates }));
  };

  return (
    <CompanyContext.Provider value={{ company, updateCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}