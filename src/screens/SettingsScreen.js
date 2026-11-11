import React, {
  useEffect,
  useContext,
  useState,
} from 'react';

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Device from 'expo-device';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';

import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import {
  AppContext,
} from '../context/AppContext';
import appConfig from '../../app.json';

export default function SettingsScreen() {
  const {
    idioma,
    setIdioma,
    disponible,
    setDisponible,
    driver,
  } = useContext(AppContext);

  const [notificationsPermission, setNotificationsPermission] =
    useState(null);
  const [locationPermission, setLocationPermission] =
    useState(null);

  useEffect(() => {
    let isActive = true;

    Promise.all([
      Notifications.getPermissionsAsync(),
      Location.getForegroundPermissionsAsync(),
    ])
      .then(([notificationPermissions, locationPermissions]) => {
        if (isActive) {
          setNotificationsPermission(notificationPermissions.granted);
          setLocationPermission(locationPermissions.granted);
        }
      })
      .catch(() => {
        if (isActive) {
          setNotificationsPermission(false);
          setLocationPermission(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const latitude = driver?.location?.latitude;
  const longitude = driver?.location?.longitude;
  const hasSavedLocation =
    typeof latitude === 'number' &&
    typeof longitude === 'number';
  const locationStatus = locationPermission === null
    ? 'Verificando permiso GPS…'
    : !locationPermission
      ? 'Permiso GPS no concedido'
      : disponible
        ? hasSavedLocation
          ? 'Disponible · última ubicación guardada'
          : 'Disponible · esperando ubicación GPS'
        : 'Desconectado · seguimiento detenido';

  const notificationStatus = !Device.isDevice
    ? 'Requiere un dispositivo físico para push'
    : notificationsPermission === null
      ? 'Consultando permisos…'
      : notificationsPermission
        ? driver?.pushToken
          ? 'Permiso activo · token registrado'
          : 'Permiso activo · token aún no sincronizado'
        : 'Permiso de notificaciones no concedido';

  const mostrarUbicacion = () => {
    const permisoGps = locationPermission === null
      ? 'consultando'
      : locationPermission
        ? 'concedido'
        : 'no concedido';
    const estado = `Estado: ${disponible ? 'disponible' : 'desconectado'}.\nPermiso GPS: ${permisoGps}.`;
    const coordenadas = hasSavedLocation
      ? `\n\nÚltima ubicación sincronizada:\nLatitud: ${latitude.toFixed(6)}\nLongitud: ${longitude.toFixed(6)}`
      : '\n\nAún no hay una ubicación sincronizada.';

    Alert.alert('Ubicación', `${estado}${coordenadas}`);
  };

  const mostrarNotificaciones = () => {
    const tokenStatus = driver?.pushToken
      ? 'Hay un token Expo Push guardado para el conductor.'
      : 'No hay un token Expo Push guardado para el conductor.';

    Alert.alert(
      'Notificaciones',
      `Infraestructura Expo Notifications: disponible.\n${notificationStatus}.\n${tokenStatus}\nFCM: no implementado.`
    );
  };

  const mostrarInformacion = () => {
    Alert.alert(
      'Información de la aplicación',
      `Versión: ${appConfig.expo.version}\nTecnologías: Expo SDK 58, React Native 0.88 y Firebase / Firestore.`
    );
  };

  const confirmarCerrarSesion = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Deseas desconectarte y dejar de recibir solicitudes?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: () => setDisponible(false),
        },
      ]
    );
  };

  const options = [
    {
      icon: 'language-outline',
      title: 'Idioma',
      description: idioma || 'Español',
      onPress: () => {
        const siguienteIdioma =
          idioma === 'Español' ? 'Inglés' : 'Español';

        setIdioma(siguienteIdioma);
      },
    },
    {
      icon: 'location-outline',
      title: 'Ubicación',
      description: locationStatus,
      onPress: mostrarUbicacion,
    },
    {
      icon: 'notifications-outline',
      title: 'Notificaciones',
      description: notificationStatus,
      onPress: mostrarNotificaciones,
    },
    {
      icon: 'information-circle-outline',
      title: 'Información',
      description: `Versión ${appConfig.expo.version} · tecnologías`,
      onPress: mostrarInformacion,
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle
        title="Configuración ⚙️"
      />

      <Text style={styles.subtitle}>
        Gestiona las preferencias de la aplicación.
      </Text>

      {options.map((item) => {
        return (
          <TouchableOpacity
            key={item.title}
            style={styles.card}
            activeOpacity={0.8}
            onPress={item.onPress}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={Colors.primary}
            />

            <View style={styles.texts}>
              <Text style={styles.title}>
                {item.title}
              </Text>

              <Text style={styles.description}>
                {item.description}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.gray}
            />
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={styles.logoutCard}
        activeOpacity={0.8}
        onPress={confirmarCerrarSesion}
      >
        <Ionicons
          name="log-out-outline"
          size={24}
          color={Colors.error}
        />

        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 20,
  },

  subtitle: {
    color: Colors.gray,
    marginTop: -5,
    marginBottom: 20,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,

    flexDirection: 'row',
    alignItems: 'center',

    elevation: 3,
  },

  texts: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontWeight: '700',
    color: Colors.secondary,
  },

  description: {
    marginTop: 4,
    color: Colors.gray,
    fontSize: 12,
  },

  logoutCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginTop: 20,

    flexDirection: 'row',
    alignItems: 'center',

    elevation: 3,
  },

  logoutText: {
    marginLeft: 15,
    color: Colors.error,
    fontWeight: '700',
  },
});