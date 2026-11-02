/**
 * ProfileScreen
 *
 * Perfil del conductor.
 *
 * Muestra la información almacenada
 * en Firebase Firestore.
 */

import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getDrivers } from '../services/firestoreService';

export default function ProfileScreen() {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDriver();
  }, []);

  const loadDriver = async () => {
    try {
      const drivers = await getDrivers();
      console.log(
        'DRIVERS:',
        drivers
      );

      if (drivers.length > 0) {
        const lastDriver =
          drivers[drivers.length - 1];

        setDriver(lastDriver);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!driver) {
    return (
      <View style={styles.center}>
        <Text>
          No existen conductores registrados.
        </Text>
      </View>
    );
  }
  console.log(
    driver.datosPersonales?.fotoUri
  );

  return (
    <View style={styles.container}>
      {driver.datosPersonales?.fotoUri ? (
        <Image
          source={{
            uri: driver.datosPersonales.fotoUri,
          }}
          style={styles.image}
        />
      ) : null}

      <Text style={styles.title}>
        {driver.datosPersonales?.nombreCompleto}
      </Text>

      <Text style={styles.item}>
        Documento:
        {' '}
        {driver.datosPersonales?.documento}
      </Text>

      <Text style={styles.item}>
        Celular:
        {' '}
        {driver.datosPersonales?.celular}
      </Text>

      <Text style={styles.item}>
        Correo:
        {' '}
        {driver.datosPersonales?.correo}
      </Text>

      <Text style={styles.item}>
        Género:
        {' '}
        {driver.datosPersonales?.genero}
      </Text>

      <Text style={styles.item}>
        Idioma:
        {' '}
        {driver.datosPersonales?.idioma}
      </Text>

      <Text style={styles.section}>
        Información del vehículo
      </Text>

      <Text style={styles.item}>
        Categoría:
        {' '}
        {driver.vehiculo?.categoria}
      </Text>

      <Text style={styles.item}>
        Placa:
        {' '}
        {driver.vehiculo?.placa}
      </Text>

      <Text style={styles.item}>
        Marca:
        {' '}
        {driver.vehiculo?.marca}
      </Text>

      <Text style={styles.item}>
        Modelo:
        {' '}
        {driver.vehiculo?.modelo}
      </Text>

      <Text style={styles.item}>
        Año:
        {' '}
        {driver.vehiculo?.anio}
      </Text>

      <Text style={styles.item}>
        Color:
        {' '}
        {driver.vehiculo?.color}
      </Text>

      <Text style={styles.item}>
        Capacidad:
        {' '}
        {driver.vehiculo?.capacidad}
        {' '}
        pasajeros
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  section: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
  },

  item: {
    fontSize: 16,
    marginBottom: 8,
  },
});