import React, { useState } from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SectionTitle from '../components/SectionTitle';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import { ROUTES } from '../constants/routes';
import { CommonActions } from '@react-navigation/native';

export default function SummaryScreen({
    navigation,
  }) {
  const [paymentStatus, setPaymentStatus] =
    useState('PENDIENTE');

  const paymentMethod = 'Efectivo';

  const fare = 18500;
  const commission = 3700;
  const driverEarnings = 14800;

  const confirmarCobro = () => {
    setPaymentStatus('APROBADO');
  
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: ROUTES.HOME,
          },
        ],
      });
    }, 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <SectionTitle title="Resumen del viaje 💵" />

      <Text style={styles.subtitulo}>
        Revisa la información final del viaje y confirma el cobro.
      </Text>

      {/* ESTADO DEL VIAJE */}

      <View style={styles.statusCard}>
        <Ionicons
          name="checkmark-circle"
          size={50}
          color={Colors.primary}
        />

        <Text style={styles.statusTitle}>
          Viaje completado
        </Text>

        <Text style={styles.statusDescription}>
          El recorrido fue finalizado correctamente.
        </Text>
      </View>

      {/* TARIFA */}

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="cash"
            size={24}
            color={Colors.primary}
          />

          <Text style={styles.label}>
            Tarifa final
          </Text>
        </View>

        <Text style={styles.value}>
          ${fare.toLocaleString('es-CO')}
        </Text>
      </View>

      {/* COMISIÓN */}

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="remove-circle"
            size={24}
            color={Colors.error}
          />

          <Text style={styles.label}>
            Comisión plataforma
          </Text>
        </View>

        <Text style={styles.commission}>
          ${commission.toLocaleString('es-CO')}
        </Text>
      </View>

      {/* GANANCIA */}

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="wallet"
            size={24}
            color={Colors.primary}
          />

          <Text style={styles.label}>
            Ganancia neta
          </Text>
        </View>

        <Text style={styles.earnings}>
          ${driverEarnings.toLocaleString('es-CO')}
        </Text>
      </View>

      {/* MÉTODO DE PAGO */}

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="card"
            size={24}
            color="#2563EB"
          />

          <Text style={styles.label}>
            Método de pago
          </Text>
        </View>

        <Text style={styles.valueSmall}>
          {paymentMethod}
        </Text>
      </View>

      {/* ESTADO DEL PAGO */}

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name={
              paymentStatus === 'APROBADO'
                ? 'checkmark-circle'
                : 'time'
            }
            size={24}
            color={
              paymentStatus === 'APROBADO'
                ? Colors.primary
                : '#F59E0B'
            }
          />

          <Text style={styles.label}>
            Estado del pago
          </Text>
        </View>

        <Text
          style={[
            styles.paymentStatus,
            {
              color:
                paymentStatus === 'APROBADO'
                  ? Colors.primary
                  : '#F59E0B',
            },
          ]}
        >
          {paymentStatus === 'APROBADO'
            ? '🟢 APROBADO'
            : '🟡 PENDIENTE'}
        </Text>
      </View>

      {/* DETALLE DEL VIAJE */}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>
          Detalle del viaje
        </Text>

        <View style={styles.summaryRow}>
          <Ionicons
            name="navigate"
            size={18}
            color={Colors.primary}
          />

          <Text style={styles.summaryText}>
            Distancia recorrida: 5.3 km
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Ionicons
            name="time"
            size={18}
            color={Colors.primary}
          />

          <Text style={styles.summaryText}>
            Duración total: 14 min
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Ionicons
            name="car"
            size={18}
            color={Colors.primary}
          />

          <Text style={styles.summaryText}>
            Categoría: Económico
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Ionicons
            name="location"
            size={18}
            color={Colors.primary}
          />

          <Text style={styles.summaryText}>
            Parque de El Poblado
          </Text>
        </View>

        <View style={styles.summaryRow}>
          <Ionicons
            name="flag"
            size={18}
            color={Colors.error}
          />

          <Text style={styles.summaryText}>
            Centro Comercial Santa Fe
          </Text>
        </View>
      </View>

      <CustomButton
        title={
          paymentStatus === 'APROBADO'
            ? 'Pago confirmado ✅'
            : 'Confirmar cobro'
        }
        onPress={confirmarCobro}
      />
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

  statusCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },

  statusTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.secondary,
    marginTop: 10,
  },

  statusDescription: {
    marginTop: 6,
    color: Colors.gray,
    textAlign: 'center',
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  label: {
    marginLeft: 10,
    fontWeight: '700',
    color: Colors.secondary,
  },

  value: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.secondary,
  },

  commission: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.error,
  },

  earnings: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.primary,
  },

  valueSmall: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.secondary,
  },

  paymentStatus: {
    fontSize: 24,
    fontWeight: '700',
  },

  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 15,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  summaryText: {
    marginLeft: 10,
    color: Colors.gray,
    fontSize: 14,
  },
});