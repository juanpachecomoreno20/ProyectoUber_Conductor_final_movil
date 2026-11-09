/**
 * Contexto global de la aplicación.
 *
 * Envuelve a los hijos sin estado. Más adelante podrá guardar
 * 
 */
import React, {
  createContext,
  useEffect,
  useState,
} from 'react';

import {
  getDrivers,
} from '../services/firestoreService';

export const AppContext =
  createContext();

export default function AppProvider({
  children,
}) {
  const [driver, setDriver] =
    useState(null);

  const [loadingDriver, setLoadingDriver] =
    useState(true);

  useEffect(() => {
    cargarConductor();
  }, []);

  const cargarConductor =
    async () => {
      try {
        const drivers =
          await getDrivers();

        if (drivers.length > 0) {
          const lastDriver =
            drivers[drivers.length - 1];

          setDriver(lastDriver);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingDriver(false);
      }
    };

  return (
    <AppContext.Provider
      value={{
        driver,
        setDriver,
        loadingDriver,
        cargarConductor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}