import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { subscribeToTrips } from '../services/firestoreService';

export const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [activeTrip, setActiveTrip] = useState(null);
  const [tripHistory, setTripHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToTrips((trips) => {
      setTripHistory(trips);
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

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
