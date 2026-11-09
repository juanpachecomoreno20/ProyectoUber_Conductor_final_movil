import React from 'react';

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

export default function EarningsScreen({
    navigation,
  }) {
    const viajesHoy = 3;
    const viajesSemana = 12;
    const viajesMes = 46;

    const facturadoHoy = 55500;
    const facturadoSemana = 234000;
    const facturadoMes = 897000;

    const comisiones = 179400;

    const gananciaNeta =
        facturadoMes - comisiones;

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

            {/* SALDO */}

            <View style={styles.balanceCard}>
                <Ionicons
                    name="wallet"
                    size={40}
                    color={Colors.white}
                />

                <Text style={styles.balanceLabel}>
                    Saldo disponible
                </Text>

                <Text style={styles.balance}>
                    ${gananciaNeta.toLocaleString('es-CO')}
                </Text>
            </View>

            {/* HOY */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Hoy
                </Text>

                <Text style={styles.value}>
                    {viajesHoy} viajes
                </Text>

                <Text style={styles.money}>
                    ${facturadoHoy.toLocaleString('es-CO')}
                </Text>
            </View>

            {/* SEMANA */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Esta semana
                </Text>

                <Text style={styles.value}>
                    {viajesSemana} viajes
                </Text>

                <Text style={styles.money}>
                    ${facturadoSemana.toLocaleString('es-CO')}
                </Text>
            </View>

            {/* MES */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Este mes
                </Text>

                <Text style={styles.value}>
                    {viajesMes} viajes
                </Text>

                <Text style={styles.money}>
                    ${facturadoMes.toLocaleString('es-CO')}
                </Text>
            </View>

            {/* DETALLE */}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>
                    Resumen financiero
                </Text>

                <View style={styles.row}>
                    <Ionicons
                        name="cash-outline"
                        size={20}
                        color={Colors.primary}
                    />

                    <Text style={styles.rowText}>
                        Facturación total:
                        ${facturadoMes.toLocaleString('es-CO')}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Ionicons
                        name="remove-circle-outline"
                        size={20}
                        color={Colors.error}
                    />

                    <Text style={styles.rowText}>
                        Comisiones:
                        ${comisiones.toLocaleString('es-CO')}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Ionicons
                        name="wallet-outline"
                        size={20}
                        color={Colors.primary}
                    />

                    <Text style={styles.rowText}>
                        Ganancia neta:
                        ${gananciaNeta.toLocaleString('es-CO')}
                    </Text>
                </View>

                <CustomButton
                    title="Ver historial de carreras"
                    onPress={() =>
                        navigation.navigate(
                            ROUTES.HISTORY
                        )
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
        color: Colors.secondary,
    },
});