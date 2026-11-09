import React, {
    useMemo,
    useState,
  } from 'react';
  
  import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  
  import { Ionicons } from '@expo/vector-icons';
  
  import SectionTitle from '../components/SectionTitle';
  import Colors from '../constants/colors';
  
  const trips = [
    {
      id: '1',
      date: '08/11/2026',
      time: '08:30 AM',
      origin: 'Parque El Poblado',
      destination: 'Centro Comercial Santa Fe',
      category: 'Económico',
      fare: 18500,
      earnings: 14800,
      paymentMethod: 'Efectivo',
      paymentStatus: 'Aprobado',
      filter: 'Hoy',
    },
    {
      id: '2',
      date: '08/11/2026',
      time: '01:15 PM',
      origin: 'Laureles',
      destination: 'Universidad de Antioquia',
      category: 'XL',
      fare: 26900,
      earnings: 21520,
      paymentMethod: 'Mercado Pago',
      paymentStatus: 'Aprobado',
      filter: 'Hoy',
    },
    {
      id: '3',
      date: '06/11/2026',
      time: '06:00 PM',
      origin: 'Envigado',
      destination: 'Sabaneta',
      category: 'Premium',
      fare: 32000,
      earnings: 25600,
      paymentMethod: 'Efectivo',
      paymentStatus: 'Aprobado',
      filter: 'Semana',
    },
  ];
  
  export default function HistoryScreen() {
    const [selectedFilter, setSelectedFilter] =
      useState('Hoy');
  
    const filteredTrips = useMemo(() => {
      if (selectedFilter === 'Todos') {
        return trips;
      }
  
      return trips.filter(
        (trip) =>
          trip.filter === selectedFilter
      );
    }, [selectedFilter]);
  
    const renderItem = ({ item }) => (
      <View style={styles.tripCard}>
        <View style={styles.tripHeader}>
          <Text style={styles.tripDate}>
            {item.date}
          </Text>
  
          <Text style={styles.tripTime}>
            {item.time}
          </Text>
        </View>
  
        <View style={styles.tripRow}>
          <Ionicons
            name="location"
            size={18}
            color={Colors.primary}
          />
  
          <Text style={styles.tripText}>
            {item.origin}
          </Text>
        </View>
  
        <View style={styles.tripRow}>
          <Ionicons
            name="flag"
            size={18}
            color={Colors.error}
          />
  
          <Text style={styles.tripText}>
            {item.destination}
          </Text>
        </View>
  
        <View style={styles.tripInfo}>
          <Text style={styles.infoText}>
            {item.category}
          </Text>
  
          <Text style={styles.infoText}>
            {item.paymentMethod}
          </Text>
        </View>
  
        <View style={styles.moneyRow}>
          <Text style={styles.fare}>
            ${item.fare.toLocaleString('es-CO')}
          </Text>
  
          <Text style={styles.earnings}>
            ${item.earnings.toLocaleString(
              'es-CO'
            )}
          </Text>
        </View>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <SectionTitle
          title="Historial de carreras 🚕"
        />
  
        <Text style={styles.subtitle}>
          Consulta los viajes realizados.
        </Text>
  
        <View style={styles.filters}>
          {[
            'Hoy',
            'Semana',
            'Mes',
            'Todos',
          ].map((filter) => (
            <Pressable
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter &&
                  styles.activeFilter,
              ]}
              onPress={() =>
                setSelectedFilter(filter)
              }
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter &&
                    styles.activeText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
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
            showsVerticalScrollIndicator={
              false
            }
          />
        )}
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
    },
  
    filterButton: {
      backgroundColor: Colors.white,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
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
    },
  
    tripInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
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
      fontSize: 16,
    },
  
    earnings: {
      fontWeight: '700',
      color: Colors.primary,
      fontSize: 16,
    },
  
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    emptyText: {
      marginTop: 10,
      color: Colors.gray,
    },
  });