"use client"
import type { SectionName } from '@/lib/types';
import React, {useState, createContext,useContext} from 'react';



type ActiveSectionContextProviderProps = {
  children: React.ReactNode;
};

type ActiveSectionContextType = {
  activeSection: SectionName;
  setActiveSection: React.Dispatch<React.SetStateAction<SectionName>>;
  timeOfLastClick: number;
  setTimeLastClick: React.Dispatch<React.SetStateAction<number>>
}

const ActiveSectionContext = createContext<ActiveSectionContextType | null>(null);

export default function ActiveSectionContextProvider({children}: ActiveSectionContextProviderProps) {
    const [activeSection,setActiveSection] = useState<SectionName>('Home')
    const [timeOfLastClick,setTimeLastClick] = useState(0);
  return<ActiveSectionContext.Provider value={{activeSection,setActiveSection,timeOfLastClick,setTimeLastClick}}>{children}</ActiveSectionContext.Provider>;
}

export function useActiveSectionContext () {
  const context = useContext(ActiveSectionContext)
  if (context == null) {
    throw new Error('useActiveSection must be used within a ActiveSectionContextProvider')
  }
  return context
}