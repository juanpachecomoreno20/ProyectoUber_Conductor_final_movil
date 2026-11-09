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
  ScrollView,
} from 'react-native';

import MapView, {
  Marker,
} from 'react-native-maps';

import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import useDriverLocation from '../hooks/useDriverLocation';
import CustomButton from '../components/CustomButton';
import HomeMenu from '../components/HomeMenu';

export default function HomeScreen({
  navigation,
}) {
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <SectionTitle
            title="Bienvenido Conductor 👋"
          />

          <Text style={styles.subtitulo}>
            Todo está listo para comenzar a
            recibir solicitudes.
          </Text>
        </View>

        <HomeMenu
          navigation={navigation}
        />
      </View>

      {/* ESTADO DEL CONDUCTOR */}

      <View style={styles.card}>
        <Text style={styles.label}>
          Estado del conductor
        </Text>

        <Text
          style={[
            styles.estadoGrande,
            {
              color: disponible
                ? Colors.primary
                : Colors.error,
            },
          ]}
        >
          {disponible
            ? '🟢 EN LÍNEA'
            : '🔴 DESCONECTADO'}
        </Text>

        <Text style={styles.descripcionEstado}>
          {disponible
            ? 'Estás listo para recibir nuevas solicitudes de viaje.'
            : 'Activa tu disponibilidad para comenzar a trabajar.'}
        </Text>

        <View style={styles.estadoContainer}>
          <View>
            <Text style={styles.switchLabel}>
              Recibir solicitudes
            </Text>

            <Text style={styles.switchDescription}>
              Activa este modo para aparecer
              disponible para los pasajeros.
            </Text>
          </View>

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

      {/* UBICACIÓN */}

      <View style={styles.card}>
        <Text style={styles.label}>
          Ubicación actual
        </Text>

        <Text style={styles.ciudad}>
          Medellín, Antioquia
        </Text>

        <Text style={styles.coordenadas}>
          Latitud:
          {' '}
          {location?.coords?.latitude?.toFixed(6) ??
            '--'}
        </Text>

        <Text style={styles.coordenadas}>
          Longitud:
          {' '}
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
            : 'Activa Disponible para iniciar el seguimiento.'}
        </Text>
      </View>

      {/* ESTADÍSTICAS */}

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            0
          </Text>

          <Text style={styles.statLabel}>
            Viajes hoy
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            $0
          </Text>

          <Text style={styles.statLabel}>
            Ganancias
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text
            style={[
              styles.statNumber,
              {
                color: disponible
                  ? Colors.primary
                  : Colors.error,
              },
            ]}
          >
            {disponible
              ? 'ON'
              : 'OFF'}
          </Text>

          <Text style={styles.statLabel}>
            Estado
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Desarrollo
        </Text>

        <CustomButton
          title="Probar solicitud 🚕"
          onPress={() =>
            navigation.navigate('Request')
          }
        />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 90,
    paddingBottom: 65,
  },

  subtitulo: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: -6,
    marginBottom: 20,
    lineHeight: 20,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 4,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 10,
  },

  estadoGrande: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },

  descripcionEstado: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 18,
    lineHeight: 20,
  },

  estadoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.secondary,
  },

  switchDescription: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 4,
    width: 190,
  },

  ciudad: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 10,
  },

  coordenadas: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 4,
  },

  map: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    marginTop: 15,
    marginBottom: 12,
  },

  pending: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },

  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingVertical: 24,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 4,
  },

  statItem: {
    flex: 1,
    alignItems: 'center',
  },

  statNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
  },

  statLabel: {
    fontSize: 12,
    color: Colors.gray,
    marginTop: 6,
  },

  divider: {
    width: 1,
    height: 35,
    backgroundColor: Colors.border,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  
  headerContent: {
    flex: 1,
    marginRight: 15,
  },

});