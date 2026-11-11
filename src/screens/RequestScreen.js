import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import CustomButton from '../components/CustomButton';
import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import { ROUTES } from '../constants/routes';
import { PRICING } from '../config/pricing';
import { useTripContext } from '../context/TripContext';
import { calculateFare } from '../utils/calculateFare';

export default function RequestScreen({
  navigation,
}) {
  const [tiempo, setTiempo] = useState(15);
  const { setActiveTrip } = useTripContext();

  const tripQuote = useMemo(
    () =>
      calculateFare({
        distanceKm: 5.3,
        durationMin: 14,
        category: 'ECONOMY',
        tip: 0,
      }),
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTiempo((valor) => {
        if (valor <= 1) {
          clearInterval(interval);

          console.log(
            'Solicitud rechazada automáticamente'
          );

          return 0;
        }

        return valor - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const aceptarViaje = () => {
    const now = new Date();

    const nuevoViaje = {
      id: `trip-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`,
      status: 'accepted',
      paymentStatus: 'PENDIENTE',
      origin: 'Parque de El Poblado',
      destination: 'Centro Comercial Santa Fe',
      distance: '5.3 km',
      duration: '14 min',
      category: 'Económico',
      categoryKey: 'ECONOMY',
      paymentMethod: 'Efectivo',
      fare: tripQuote.fare,
      commission: tripQuote.commission,
      driverEarnings: tripQuote.driverEarnings,
      earnings: tripQuote.driverEarnings,
      tip: tripQuote.tip,
      commissionRate: PRICING.COMMISSION_RATE,
      amount: tripQuote.fare,
      date: now.toLocaleDateString('es-CO'),
      time: now.toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      createdAt: now.toISOString(),
      filter: 'Hoy',
    };

    setActiveTrip(nuevoViaje);
    navigation.navigate(ROUTES.TRIP);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Solicitud entrante 🚕" />

      <Text style={styles.subtitulo}>
        Un pasajero cercano solicita un viaje.
      </Text>

      <View style={styles.timerCard}>
        <Text style={styles.timer}>{tiempo}s</Text>

        <Text style={styles.timerLabel}>
          Tiempo restante para responder
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
              Parque de El Poblado
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
              Centro Comercial Santa Fe
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
            <Text style={styles.label}>Distancia</Text>

            <Text style={styles.value}>5.3 km</Text>
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
              Duración estimada
            </Text>

            <Text style={styles.value}>14 min</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="car"
            size={20}
            color={Colors.secondary}
          />

          <View style={styles.itemContent}>
            <Text style={styles.label}>Categoría</Text>

            <Text style={styles.value}>Económico</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="cash"
            size={20}
            color={Colors.secondary}
          />

          <View style={styles.itemContent}>
            <Text style={styles.label}>
              Método de pago
            </Text>

            <Text style={styles.value}>Efectivo</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.summaryLabel}>
          Tarifa estimada
        </Text>

        <Text style={styles.fare}>
          ${tripQuote.fare.toLocaleString('es-CO')}
        </Text>

        <Text style={styles.summaryLabel}>
          Ganancia neta estimada
        </Text>

        <Text style={styles.earnings}>
          ${tripQuote.driverEarnings.toLocaleString(
            'es-CO'
          )}
        </Text>
      </View>

      <View style={styles.card}>
        <CustomButton
          title="Aceptar viaje"
          onPress={aceptarViaje}
        />

        <View style={{ height: 12 }} />

        <CustomButton
          title="Rechazar solicitud"
          onPress={() =>
            console.log('Viaje rechazado')
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
    padding: 20,
  },

  subtitulo: {
    color: Colors.gray,
    marginTop: -5,
    marginBottom: 20,
  },

  timerCard: {
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },

  timer: {
    fontSize: 42,
    fontWeight: '700',
    color: Colors.error,
  },

  timerLabel: {
    marginTop: 6,
    color: Colors.gray,
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

  summaryLabel: {
    fontSize: 14,
    color: Colors.gray,
  },

  fare: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 16,
  },

  earnings: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.primary,
  },
});