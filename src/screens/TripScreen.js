import React, { useState } from 'react';

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

export default function TripScreen() {
  const [pasajeroAbordo, setPasajeroAbordo] =
    useState(false);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <SectionTitle
        title="Viaje en curso 🚕"
      />

      <Text style={styles.subtitulo}>
        Gestiona el estado actual del viaje.
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>
          Estado actual
        </Text>

        <Text style={styles.status}>
          {pasajeroAbordo
            ? '🟢 VIAJE EN PROGRESO'
            : '🟡 CONDUCTOR EN CAMINO'}
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
            <Text style={styles.label}>
              Origen
            </Text>

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
            <Text style={styles.label}>
              Destino
            </Text>

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
            <Text style={styles.label}>
              Distancia restante
            </Text>

            <Text style={styles.value}>
              5.3 km
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
              14 min
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        {!pasajeroAbordo ? (
          <CustomButton
            title="Pasajero a bordo"
            onPress={() =>
              setPasajeroAbordo(true)
            }
          />
        ) : (
          <CustomButton
            title="Finalizar viaje"
            onPress={() =>
              console.log(
                'Viaje finalizado'
              )
            }
          />
        )}
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