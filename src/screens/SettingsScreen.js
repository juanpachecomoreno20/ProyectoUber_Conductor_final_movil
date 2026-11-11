import React, {
  useContext,
} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import {
  AppContext,
} from '../context/AppContext';

export default function SettingsScreen() {
  const {
    idioma,
    setIdioma,
  } = useContext(AppContext);

  const options = [
    {
      icon: 'language-outline',
      title: 'Idioma',
      description: idioma || 'Español',
    },
    {
      icon: 'location-outline',
      title: 'Ubicación',
      description:
        'Permisos de ubicación',
    },
    {
      icon: 'notifications-outline',
      title: 'Notificaciones',
      description:
        'Configuración de alertas',
    },
    {
      icon: 'information-circle-outline',
      title: 'Información',
      description:
        'Versión de la aplicación',
    },
  ];

  const alternarIdioma = () => {
    const siguienteIdioma =
      idioma === 'Español'
        ? 'Inglés'
        : 'Español';

    setIdioma(siguienteIdioma);
  };

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

      {options.map((item, index) => {
        const contenido = (
          <>
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
          </>
        );

        if (item.title === 'Idioma') {
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.8}
              onPress={alternarIdioma}
            >
              {contenido}
            </TouchableOpacity>
          );
        }

        return (
          <View
            key={index}
            style={styles.card}
          >
            {contenido}
          </View>
        );
      })}

      <View style={styles.logoutCard}>
        <Ionicons
          name="log-out-outline"
          size={24}
          color={Colors.error}
        />

        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>
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