import React from 'react';

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

export default function SummaryScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <SectionTitle title="Resumen del viaje 💵" />

      <Text style={styles.subtitulo}>
        Revisa el resultado final del viaje.
      </Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="cash-outline"
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.label}>
            Tarifa final
          </Text>
        </View>

        <Text style={styles.value}>
          $18.500
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="remove-circle-outline"
            size={22}
            color={Colors.error}
          />

          <Text style={styles.label}>
            Comisión plataforma
          </Text>
        </View>

        <Text style={styles.value}>
          $3.700
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="wallet-outline"
            size={22}
            color={Colors.primary}
          />

          <Text style={styles.label}>
            Ganancia neta
          </Text>
        </View>

        <Text style={styles.earnings}>
          $14.800
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Ionicons
            name="time-outline"
            size={22}
            color="#F59E0B"
          />

          <Text style={styles.label}>
            Estado del pago
          </Text>
        </View>

        <Text style={styles.pending}>
          PENDIENTE
        </Text>
      </View>

      <CustomButton
        title="Confirmar cobro"
        onPress={() =>
          console.log(
            'Cobro confirmado'
          )
        }
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
  },

  subtitulo: {
    color: Colors.gray,
    marginTop: -5,
    marginBottom: 20,
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
    fontSize: 28,
    fontWeight: '700',
    color: Colors.secondary,
  },

  earnings: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
  },

  pending: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F59E0B',
  },
});