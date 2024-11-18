import React, { createContext, useContext } from 'react';
import { Theme } from '../types';
import { presets } from '../helpers/presets';

const ThemeContext = createContext(presets.default);


export const useTheme = () => useContext(ThemeContext);

type ThemeProviderProps = {
  children: React.ReactNode;
  theme?: Theme;
  preset?: keyof typeof presets;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, theme, preset }) => {
    const themeToUse = theme ?? presets[preset ?? 'default'];
  return (
    <ThemeContext.Provider value={themeToUse}>
      {children}
    </ThemeContext.Provider>
  );
};
