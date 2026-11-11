import React, { useMemo } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import { ROUTES } from '../constants/routes';
import CustomButton from '../components/CustomButton';
import { useTripContext } from '../context/TripContext';

export default function EarningsScreen({ navigation }) {
  const { tripHistory } = useTripContext();

  const metrics = useMemo(() => {
    const viajesHoy = tripHistory.filter(
      (trip) => trip.filter === 'Hoy'
    );
    const viajesSemana = tripHistory.filter(
      (trip) => trip.filter === 'Semana'
    );
    const viajesMes = tripHistory.filter(
      (trip) => trip.filter === 'Mes'
    );

    const facturadoHoy = viajesHoy.reduce(
      (sum, trip) => sum + (Number(trip.fare) || 0),
      0
    );
    const facturadoSemana = viajesSemana.reduce(
      (sum, trip) => sum + (Number(trip.fare) || 0),
      0
    );
    const facturadoMes = viajesMes.reduce(
      (sum, trip) => sum + (Number(trip.fare) || 0),
      0
    );

    const totalFacturado = tripHistory.reduce(
      (sum, trip) => sum + (Number(trip.fare) || 0),
      0
    );
    const totalComisiones = tripHistory.reduce(
      (sum, trip) =>
        sum +
        (Number(trip.commission) ||
          (Number(trip.fare) || 0) -
            (Number(trip.earnings) || 0)),
      0
    );
    const totalGananciasNetas = tripHistory.reduce(
      (sum, trip) => sum + (Number(trip.earnings) || 0),
      0
    );

    return {
      viajesHoy: viajesHoy.length,
      viajesSemana: viajesSemana.length,
      viajesMes: viajesMes.length,
      facturadoHoy,
      facturadoSemana,
      facturadoMes,
      totalFacturado,
      totalComisiones,
      totalGananciasNetas,
    };
  }, [tripHistory]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Ganancias 💰" />

      <Text style={styles.subtitulo}>
        Consulta tu resumen financiero.
      </Text>

      <View style={styles.balanceCard}>
        <Ionicons
          name="wallet"
          size={40}
          color={Colors.white}
        />

        <Text style={styles.balanceLabel}>Saldo disponible</Text>

        <Text style={styles.balance}>
          ${metrics.totalGananciasNetas.toLocaleString(
            'es-CO'
          )}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Hoy</Text>

        <Text style={styles.value}>
          {metrics.viajesHoy} viajes
        </Text>

        <Text style={styles.money}>
          ${metrics.facturadoHoy.toLocaleString('es-CO')}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Esta semana</Text>

        <Text style={styles.value}>
          {metrics.viajesSemana} viajes
        </Text>

        <Text style={styles.money}>
          ${metrics.facturadoSemana.toLocaleString('es-CO')}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Este mes</Text>

        <Text style={styles.value}>
          {metrics.viajesMes} viajes
        </Text>

        <Text style={styles.money}>
          ${metrics.facturadoMes.toLocaleString('es-CO')}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumen financiero</Text>

        <View style={styles.row}>
          <Ionicons
            name="cash-outline"
            size={20}
            color={Colors.primary}
          />

          <Text style={styles.rowText}>
            Facturación total: ${metrics.totalFacturado.toLocaleString(
              'es-CO'
            )}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="remove-circle-outline"
            size={20}
            color={Colors.error}
          />

          <Text style={styles.rowText}>
            Comisiones: ${metrics.totalComisiones.toLocaleString(
              'es-CO'
            )}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="wallet-outline"
            size={20}
            color={Colors.primary}
          />

          <Text style={styles.rowText}>
            Ganancia neta: ${metrics.totalGananciasNetas.toLocaleString(
              'es-CO'
            )}
          </Text>
        </View>

        <CustomButton
          title="Ver historial de carreras"
          onPress={() => navigation.navigate(ROUTES.HISTORY)}
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
    paddingBottom: 40,
  },

  subtitulo: {
    color: Colors.gray,
    marginTop: -5,
    marginBottom: 20,
  },

  balanceCard: {
    backgroundColor: Colors.primary,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  balanceLabel: {
    color: Colors.white,
    marginTop: 10,
  },

  balance: {
    color: Colors.white,
    fontSize: 30,
    fontWeight: '700',
    marginTop: 8,
  },

  card: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 10,
  },

  value: {
    color: Colors.gray,
    marginBottom: 8,
  },

  money: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  rowText: {
    marginLeft: 10,
    color: Colors.gray,
    flexShrink: 1,
  },
});