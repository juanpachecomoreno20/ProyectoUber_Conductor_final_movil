import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default function useDriverLocation(disponible) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!disponible) {
      return;
    }

    let subscription;

    const startTracking = async () => {
      try {
        const { status } =
          await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.log(
            'Permiso de ubicación denegado'
          );
          return;
        }

        subscription =
          await Location.watchPositionAsync(
            {
              accuracy:
                Location.Accuracy.High,
              timeInterval: 5000,
              distanceInterval: 10,
            },
            (currentLocation) => {
              setLocation(currentLocation);
            }
          );
      } catch (error) {
        console.log(
          'Error obteniendo ubicación:',
          error
        );
      }
    };

    startTracking();

    return () => {
      if (subscription) {
        subscription.remove();
        console.log(
          'Seguimiento detenido'
        );
      }
    };
  }, [disponible]);

  return location;
}