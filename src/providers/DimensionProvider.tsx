import React, { createContext, useContext } from 'react';
import { Dimensions } from '../helpers/dimensions';

const dimensions = new Dimensions();

const DimensionContext = createContext(dimensions);

export const useDimensions = () => useContext(DimensionContext);

type DimensionProviderProps = {
    children: React.ReactNode;
}

export const DimensionProvider: React.FC<DimensionProviderProps> = ({ children }) => {
  return (
    <DimensionContext.Provider value={dimensions}>
      {children}
    </DimensionContext.Provider>
  );
};