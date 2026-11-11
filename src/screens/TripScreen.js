import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import { ROUTES } from '../constants/routes';
import { useTripContext } from '../context/TripContext';

export default function TripScreen({ navigation }) {
  const { activeTrip, setActiveTrip } = useTripContext();

  if (!activeTrip) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No hay un viaje activo.
        </Text>
      </View>
    );
  }

  const statusConfig = {
    accepted: '🟡 VIAJE ACEPTADO',
    driver_arriving: '🟡 CONDUCTOR EN CAMINO',
    in_progress: '🟢 VIAJE EN PROGRESO',
    completed: '🟢 VIAJE COMPLETADO',
  };

  const handleStatusAdvance = () => {
    if (activeTrip.status === 'accepted') {
      setActiveTrip({
        ...activeTrip,
        status: 'driver_arriving',
      });
      return;
    }

    if (activeTrip.status === 'driver_arriving') {
      setActiveTrip({
        ...activeTrip,
        status: 'in_progress',
      });
      return;
    }

    if (activeTrip.status === 'in_progress') {
      const completedTrip = {
        ...activeTrip,
        status: 'completed',
        paymentStatus: 'PENDIENTE',
      };

      setActiveTrip(completedTrip);
      navigation.navigate(ROUTES.SUMMARY);
    }
  };

  const buttonTitle =
    activeTrip.status === 'accepted'
      ? 'Confirmar llegada'
      : activeTrip.status === 'driver_arriving'
        ? 'Pasajero a bordo'
        : 'Finalizar viaje';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <SectionTitle title="Viaje en curso 🚕" />

      <Text style={styles.subtitulo}>
        Gestiona el estado actual del viaje.
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>Estado actual</Text>

        <Text style={styles.status}>
          {statusConfig[activeTrip.status] ||
            '🟡 VIAJE ACEPTADO'}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.item}>
          <Ionicons
            name="location"
            size={20}
            color={Colors.primary}
          />

          <View style={styles.itemContent}>
            <Text style={styles.label}>Origen</Text>

            <Text style={styles.value}>
              {activeTrip.origin}
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="flag"
            size={20}
            color={Colors.error}
          />

          <View style={styles.itemContent}>
            <Text style={styles.label}>Destino</Text>

            <Text style={styles.value}>
              {activeTrip.destination}
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="navigate"
            size={20}
            color={Colors.secondary}
          />

          <View style={styles.itemContent}>
            <Text style={styles.label}>
              Distancia restante
            </Text>

            <Text style={styles.value}>
              {activeTrip.distance}
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="time"
            size={20}
            color={Colors.secondary}
          />

          <View style={styles.itemContent}>
            <Text style={styles.label}>
              Tiempo estimado
            </Text>

            <Text style={styles.value}>
              {activeTrip.duration}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <CustomButton
          title={buttonTitle}
          onPress={handleStatusAdvance}
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
    padding: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: 20,
  },

  emptyText: {
    color: Colors.gray,
    fontSize: 16,
    textAlign: 'center',
  },

  subtitulo: {
    color: Colors.gray,
    marginTop: -5,
    marginBottom: 20,
  },

  statusCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },

  statusTitle: {
    color: Colors.gray,
    marginBottom: 8,
  },

  status: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },

  item: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  itemContent: {
    marginLeft: 12,
    flex: 1,
  },

  label: {
    fontWeight: '700',
    color: Colors.secondary,
  },

  value: {
    marginTop: 4,
    color: Colors.gray,
  },
});