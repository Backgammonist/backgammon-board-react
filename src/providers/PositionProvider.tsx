import React, { createContext, useContext } from 'react';
import { calculateBasePoints } from '../helpers/calculate-base-points';
import { useDimensions } from './DimensionProvider';


const PositionContext = createContext<Record<number, { x: number; y: number; }>>({});

export const usePosition = () => useContext(PositionContext);

type PositionProviderProps = {
    children: React.ReactNode;
}

export const PositionProvider: React.FC<PositionProviderProps> = ({ children }) => {
    const dimensions = useDimensions();
    const positions = calculateBasePoints(dimensions);
    return (
        <PositionContext.Provider value={positions}>
            {children}
        </PositionContext.Provider>
    );
};
