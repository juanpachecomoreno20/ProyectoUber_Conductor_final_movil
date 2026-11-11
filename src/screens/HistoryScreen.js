import React, {
  useMemo,
  useState,
} from 'react';

import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SectionTitle from '../components/SectionTitle';
import Colors from '../constants/colors';
import { useTripContext } from '../context/TripContext';

export default function HistoryScreen() {
  const [selectedFilter, setSelectedFilter] =
    useState('Todos');
  const [selectedPaymentFilter, setSelectedPaymentFilter] =
    useState('Todos');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { tripHistory } = useTripContext();

  const filteredTrips = useMemo(() => {
    const byDate = [...tripHistory].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.date);
      const dateB = new Date(b.createdAt || b.date);
      return dateB - dateA;
    });

    let filtered = byDate;

    if (selectedFilter !== 'Todos' && selectedFilter !== 'Rango') {
      filtered = filtered.filter(
        (trip) => trip.filter === selectedFilter
      );
    }

    if (selectedFilter === 'Rango' && startDate && endDate) {
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();

      filtered = filtered.filter((trip) => {
        const tripTime = new Date(
          trip.createdAt || trip.date
        ).getTime();

        return tripTime >= start && tripTime <= end;
      });
    }

    if (selectedPaymentFilter !== 'Todos') {
      filtered = filtered.filter(
        (trip) => trip.paymentMethod === selectedPaymentFilter
      );
    }

    return filtered;
  }, [
    endDate,
    selectedFilter,
    selectedPaymentFilter,
    startDate,
    tripHistory,
  ]);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.tripCard}
      onPress={() => setSelectedTrip(item)}
    >
      <View style={styles.tripHeader}>
        <Text style={styles.tripDate}>{item.date}</Text>

        <Text style={styles.tripTime}>{item.time}</Text>
      </View>

      <View style={styles.tripRow}>
        <Ionicons
          name="location"
          size={18}
          color={Colors.primary}
        />

        <Text style={styles.tripText}>{item.origin}</Text>
      </View>

      <View style={styles.tripRow}>
        <Ionicons
          name="flag"
          size={18}
          color={Colors.error}
        />

        <Text style={styles.tripText}>{item.destination}</Text>
      </View>

      <View style={styles.tripInfo}>
        <Text style={styles.infoText}>{item.category}</Text>

        <Text style={styles.infoText}>{item.paymentMethod}</Text>
      </View>

      <View style={styles.tripStatusRow}>
        <Text style={styles.statusText}>Pago: {item.paymentStatus}</Text>
      </View>

      <View style={styles.moneyRow}>
        <Text style={styles.fare}>
          ${Number(item.fare || 0).toLocaleString('es-CO')}
        </Text>

        <Text style={styles.earnings}>
          ${Number(item.earnings || item.driverEarnings || 0).toLocaleString(
            'es-CO'
          )}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <SectionTitle title="Historial de carreras 🚕" />

      <Text style={styles.subtitle}>
        Consulta los viajes realizados.
      </Text>

      <View style={styles.filters}>
        {['Hoy', 'Semana', 'Mes', 'Rango', 'Todos'].map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilter,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeText,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {selectedFilter === 'Rango' && (
        <View style={styles.dateRangeContainer}>
          <TextInput
            style={styles.dateInput}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="Desde yyyy-mm-dd"
            placeholderTextColor={Colors.gray}
          />

          <TextInput
            style={styles.dateInput}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="Hasta yyyy-mm-dd"
            placeholderTextColor={Colors.gray}
          />
        </View>
      )}

      <View style={styles.filters}>
        {['Todos', 'Efectivo', 'Tarjeta', 'Mercado Pago'].map(
          (filter) => (
            <Pressable
              key={filter}
              style={[
                styles.filterButton,
                selectedPaymentFilter === filter &&
                  styles.activeFilter,
              ]}
              onPress={() => setSelectedPaymentFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedPaymentFilter === filter &&
                    styles.activeText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {filteredTrips.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="car-outline"
            size={60}
            color={Colors.gray}
          />

          <Text style={styles.emptyText}>
            No existen viajes para este filtro.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredTrips}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Modal
        visible={Boolean(selectedTrip)}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedTrip(null)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setSelectedTrip(null)}
        >
          <Pressable style={styles.modalCard}>
            {selectedTrip && (
              <>
                <Text style={styles.modalTitle}>
                  Detalle del viaje
                </Text>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Origen:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTrip.origin}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Destino:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTrip.destination}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Distancia:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTrip.distance}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Duración:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTrip.duration}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Comisión:</Text>
                  <Text style={styles.modalValue}>
                    ${Number(selectedTrip.commission || 0).toLocaleString(
                      'es-CO'
                    )}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Propina:</Text>
                  <Text style={styles.modalValue}>
                    ${Number(selectedTrip.tip || 0).toLocaleString(
                      'es-CO'
                    )}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Ganancia neta:</Text>
                  <Text style={styles.modalValue}>
                    ${Number(
                      selectedTrip.driverEarnings ||
                        selectedTrip.earnings ||
                        0
                    ).toLocaleString('es-CO')}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Estado del pago:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTrip.paymentStatus}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Categoría:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTrip.category}
                  </Text>
                </View>

                <View style={styles.modalRow}>
                  <Text style={styles.modalLabel}>Calificación:</Text>
                  <Text style={styles.modalValue}>
                    {selectedTrip.rating
                      ? `${selectedTrip.rating} / 5`
                      : 'Sin calificación'}
                  </Text>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },

  subtitle: {
    color: Colors.gray,
    marginTop: -5,
    marginBottom: 20,
  },

  filters: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap',
  },

  filterButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },

  activeFilter: {
    backgroundColor: Colors.primary,
  },

  filterText: {
    color: Colors.secondary,
    fontWeight: '600',
  },

  activeText: {
    color: Colors.white,
  },

  dateRangeContainer: {
    marginBottom: 20,
  },

  dateInput: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    color: Colors.secondary,
  },

  tripCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 3,
  },

  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  tripDate: {
    fontWeight: '700',
    color: Colors.secondary,
  },

  tripTime: {
    color: Colors.gray,
  },

  tripRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  tripText: {
    marginLeft: 10,
    color: Colors.secondary,
    flexShrink: 1,
  },

  tripInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  tripStatusRow: {
    marginTop: 8,
    marginBottom: 8,
  },

  statusText: {
    color: Colors.gray,
  },

  infoText: {
    color: Colors.gray,
  },

  moneyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  fare: {
    fontWeight: '700',
    color: Colors.secondary,
  },

  earnings: {
    fontWeight: '700',
    color: Colors.primary,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },

  emptyText: {
    color: Colors.gray,
    marginTop: 12,
    textAlign: 'center',
  },

  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,
    elevation: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 16,
  },

  modalRow: {
    marginBottom: 10,
  },

  modalLabel: {
    color: Colors.gray,
    fontWeight: '700',
    marginBottom: 2,
  },

  modalValue: {
    color: Colors.secondary,
  },
});