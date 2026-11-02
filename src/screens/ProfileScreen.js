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

import { Ionicons } from '@expo/vector-icons';

import SectionTitle from '../components/SectionTitle';

import Colors from '../constants/colors';
import Typography from '../constants/typography';
import Dimensions from '../constants/dimensions';
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

      <View style={styles.statusContainer}>
        <Ionicons
          name="time-outline"
          size={18}
          color="#D97706"
        />

        <Text style={styles.statusText}>
          Pendiente de aprobación
        </Text>
      </View>

      <SectionTitle
        title="Información personal"
      />

      <View style={styles.row}>
        <Ionicons
          name="card-outline"
          size={20}
          color={Colors.primary}
        />
        <Text style={styles.item}>
          Documento: {driver.datosPersonales?.documento}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="call-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Celular:
          {' '}
          {driver.datosPersonales?.celular}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="call-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Celular:
          {' '}
          {driver.datosPersonales?.celular}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="person-outline"
          size={20}
          color={Colors.primary}
        />
        <Text style={styles.item}>
          Género:
          {' '}
          {driver.datosPersonales?.genero}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="language-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Idioma:
          {' '}
          {driver.datosPersonales?.idioma}
        </Text>
      </View>

      <SectionTitle
        title="Información del vehículo"
      />

      <View style={styles.row}>
        <Ionicons
          name="layers-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Categoría:
          {' '}
          {driver.vehiculo?.categoria}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="card-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Placa:
          {' '}
          {driver.vehiculo?.placa}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="car-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Marca:
          {' '}
          {driver.vehiculo?.marca}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="car-sport-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Modelo:
          {' '}
          {driver.vehiculo?.modelo}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Año:
          {' '}
          {driver.vehiculo?.anio}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Año:
          {' '}
          {driver.vehiculo?.anio}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="people-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Capacidad:
          {' '}
          {driver.vehiculo?.capacidad}
          {' '}
          pasajeros
        </Text>
      </View>
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
    fontSize: Typography.body,
    marginLeft: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  statusText: {
    marginLeft: 8,
    color: '#D97706',
    fontWeight: '700',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

});

