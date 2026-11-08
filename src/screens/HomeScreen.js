/**
 * HomeScreen
 * Pantalla inicial del conductor (pestaña Home).
 */

import React, {
  useEffect,
  useState,
} from 'react';

import {
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import useDriverLocation from '../hooks/useDriverLocation';

export default function HomeScreen() {
  const [disponible, setDisponible] =
    useState(false);

  const location =
    useDriverLocation(disponible);

  useEffect(() => {
    if (disponible) {
      console.log('Seguimiento iniciado');
    } else {
      console.log('Seguimiento detenido');
    }

    return () => {
      console.log(
        'Cleanup seguimiento'
      );
    };
  }, [disponible]);

  return (
    <View style={styles.container}>
      <SectionTitle title="Inicio" />

      <View style={styles.card}>
        <Text style={styles.label}>
          Estado del conductor
        </Text>

        <View style={styles.estadoContainer}>
          <Text
            style={[
              styles.estado,
              {
                color: disponible
                  ? Colors.primary
                  : Colors.error,
              },
            ]}
          >
            {disponible
              ? 'Disponible'
              : 'No disponible'}
          </Text>

          <Switch
            value={disponible}
            onValueChange={setDisponible}
            trackColor={{
              false: '#D1D5DB',
              true: '#A7F3D0',
            }}
            thumbColor={
              disponible
                ? Colors.primary
                : '#F4F4F5'
            }
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Ubicación actual
        </Text>

        <Text style={styles.info}>
          Latitud:{' '}
          {location?.coords?.latitude?.toFixed(6) ??
            '--'}
        </Text>

        <Text style={styles.info}>
          Longitud:{' '}
          {location?.coords?.longitude?.toFixed(6) ??
            '--'}
        </Text>

        {location?.coords ? (
          <MapView
            style={styles.map}
            region={{
              latitude:
                location.coords.latitude,
              longitude:
                location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
          >
            <Marker
              coordinate={{
                latitude:
                  location.coords.latitude,
                longitude:
                  location.coords.longitude,
              }}
              title="Mi ubicación"
              description="Ubicación actual del conductor"
            />
          </MapView>
        ) : (
          <Text style={styles.pending}>
            Esperando ubicación...
          </Text>
        )}

        <Text style={styles.pending}>
          {disponible
            ? 'Ubicación actualizándose en tiempo real.'
            : 'Activa el estado Disponible para iniciar el seguimiento.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.secondary,
    marginBottom: 12,
  },

  estadoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  estado: {
    fontSize: 16,
    fontWeight: '700',
  },

  info: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 6,
  },

  pending: {
    marginTop: 10,
    color: Colors.primary,
    fontWeight: '600',
  },

  map: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 15,
    marginBottom: 10,
  },
});