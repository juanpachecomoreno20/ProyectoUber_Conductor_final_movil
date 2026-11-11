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

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getDrivers,
} from '../services/firestoreService';

const STORAGE_KEYS = {
  idioma: '@driver_preferences:idioma',
  disponible:
    '@driver_preferences:disponible',
};

export const AppContext =
  createContext();

export default function AppProvider({
  children,
}) {
  const [driver, setDriver] =
    useState(null);

  const [loadingDriver, setLoadingDriver] =
    useState(true);

  const [idioma, setIdioma] =
    useState('Español');

  const [disponible, setDisponible] =
    useState(false);

  const [settingsLoaded, setSettingsLoaded] =
    useState(false);

  useEffect(() => {
    cargarConductor();
    cargarPreferencias();
  }, []);

  useEffect(() => {
    if (!settingsLoaded) {
      return;
    }

    const guardarPreferencias = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEYS.idioma,
          idioma
        );

        await AsyncStorage.setItem(
          STORAGE_KEYS.disponible,
          String(disponible)
        );
      } catch (error) {
        console.log(
          'Error guardando preferencias',
          error
        );
      }
    };

    guardarPreferencias();
  }, [idioma, disponible, settingsLoaded]);

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

  const cargarPreferencias =
    async () => {
      try {
        const idiomaGuardado =
          await AsyncStorage.getItem(
            STORAGE_KEYS.idioma
          );

        const disponibleGuardado =
          await AsyncStorage.getItem(
            STORAGE_KEYS.disponible
          );

        if (idiomaGuardado) {
          setIdioma(idiomaGuardado);
        }

        if (disponibleGuardado !== null) {
          setDisponible(
            disponibleGuardado === 'true'
          );
        }
      } catch (error) {
        console.log(
          'Error cargando preferencias',
          error
        );
      } finally {
        setSettingsLoaded(true);
      }
    };

  return (
    <AppContext.Provider
      value={{
        driver,
        setDriver,
        loadingDriver,
        cargarConductor,
        idioma,
        setIdioma,
        disponible,
        setDisponible,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}