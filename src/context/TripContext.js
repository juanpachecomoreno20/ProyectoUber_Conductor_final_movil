import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

export const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripHistory, setTripHistory] = useState([]);

  const value = useMemo(
    () => ({
      activeTrip,
      setActiveTrip,
      tripHistory,
      setTripHistory,
    }),
    [activeTrip, tripHistory]
  );

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  );
}

export function useTripContext() {
  const context = useContext(TripContext);

  if (!context) {
    throw new Error(
      'useTripContext debe usarse dentro de TripProvider'
    );
  }

  return context;
}
