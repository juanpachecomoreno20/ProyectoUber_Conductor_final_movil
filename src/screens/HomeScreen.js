/**
 * HomeScreen
 * Pantalla inicial del conductor (pestaña Home).
 */
import React, {
  useContext,
  useEffect,
  useMemo,
} from 'react';

import {
  sendPushNotification,
} from '../services/pushTest';


import {
  scheduleLocalNotification,
} from '../services/notificationService';

import {
  StyleSheet,
  Switch,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';

import {
  AppContext,
} from '../context/AppContext';
import { useTripContext } from '../context/TripContext';

import MapView, {
  Marker,
} from 'react-native-maps';

import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import useDriverLocation from '../hooks/useDriverLocation';
import CustomButton from '../components/CustomButton';
import HomeMenu from '../components/HomeMenu';
import { updateDriverLocation } from '../services/firestoreService';

console.log(
  'PUSH TEST:',
  sendPushNotification
);


export default function HomeScreen({
  navigation,
}) {
  const {
    disponible,
    setDisponible,
    driver,
  } = useContext(AppContext);

  const documentosCompletos =
  !!driver?.documentos?.licenciaUri &&
  !!driver?.documentos?.soatUri &&
  !!driver?.documentos?.tecnicoUri;

  const { tripHistory } = useTripContext();
  const dailyStats = useMemo(() => {
    const now = new Date();
    const todaysTrips = tripHistory.filter((trip) => {
      const tripDateValue =
        trip.completedAt || trip.createdAt || trip.date;
      let tripDate;

      if (tripDateValue?.toDate) {
        tripDate = tripDateValue.toDate();
      } else if (tripDateValue instanceof Date) {
        tripDate = tripDateValue;
      } else if (typeof tripDateValue === 'string') {
        const localizedDate = tripDateValue.match(
          /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
        );
        tripDate = localizedDate
          ? new Date(
            Number(localizedDate[3]),
            Number(localizedDate[2]) - 1,
            Number(localizedDate[1])
          )
          : new Date(tripDateValue);
      } else {
        tripDate = new Date(tripDateValue);
      }

      return (
        !Number.isNaN(tripDate.getTime()) &&
        tripDate.getFullYear() === now.getFullYear() &&
        tripDate.getMonth() === now.getMonth() &&
        tripDate.getDate() === now.getDate()
      );
    });

    const gananciasHoy = todaysTrips.reduce((total, trip) => {
      const earnings = Number(
        trip.driverEarnings ?? trip.earnings ?? 0
      );
      return total + (Number.isFinite(earnings) ? earnings : 0);
    }, 0);

    return {
      viajesHoy: todaysTrips.length,
      gananciasHoy,
    };
  }, [tripHistory]);

  const location =
    useDriverLocation(disponible);


  useEffect(() => {
    if (!disponible) {
      console.log('Seguimiento detenido');
      return;
    }

    if (
      !driver?.id ||
      typeof location?.coords?.latitude !== 'number' ||
      typeof location?.coords?.longitude !== 'number'
    ) {
      return;
    }

    const syncLocation = async () => {
      try {
        await updateDriverLocation(
          driver.id,
          location.coords.latitude,
          location.coords.longitude
        );
      } catch (error) {
        console.log(
          'Error actualizando ubicación del conductor en Firestore:',
          error
        );
      }
    };

    syncLocation();

    console.log('Seguimiento iniciado');
  }, [
    disponible,
    driver?.id,
    location?.coords?.latitude,
    location?.coords?.longitude,
  ]);





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
            onValueChange={(valor) => {

              if (valor && !documentosCompletos) {
                Alert.alert(
                  'Documentación pendiente',
                  'Debes cargar Licencia, SOAT y Técnico Mecánica antes de recibir solicitudes.'
                );
                return;
              }

              if (valor) {
                Alert.alert(
                  'Función demostrativa',
                  'La geolocalización y el mapa fueron implementados y probados en Expo Go. En este Development Build Android, Google Maps requiere una API Key configurada en Google Cloud. Si continúas, puede generarse el error conocido del mapa.',
                  [
                    {
                      text: 'Cancelar',
                      style: 'cancel',
                    },
                    {
                      text: 'Continuar',
                      onPress: () => setDisponible(true),
                    },
                  ]
                );

                return;
              }

              setDisponible(false);

            }}

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
            {dailyStats.viajesHoy}
          </Text>

          <Text style={styles.statLabel}>
            Viajes hoy
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            ${dailyStats.gananciasHoy.toLocaleString('es-CO')}
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
          Solicitudes de prueba
        </Text>

        <CustomButton
          title="Probar solicitud 🚕"
          onPress={async () => {
            try {

              // Notificación local inmediata
              await scheduleLocalNotification(
                'Nueva solicitud conductor 🚕',
                'Tienes una nueva solicitud de viaje.'
              );

              // Navega a la solicitud simulada
              navigation.navigate('Request');

            } catch (error) {
              console.log(error);
            }
          }}
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