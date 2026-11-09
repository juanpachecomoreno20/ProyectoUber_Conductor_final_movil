import React, { useState } from 'react';

import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import ProfileImagePicker from '../components/ProfileImagePicker';
import SectionTitle from '../components/SectionTitle';

export default function DocumentScreen() {
    const [licenciaUri, setLicenciaUri] =
        useState(null);

    const [soatUri, setSoatUri] =
        useState(null);

    const [tecnicoUri, setTecnicoUri] =
        useState(null);

    const [numeroLicencia, setNumeroLicencia] =
        useState('');

    const [correoPago, setCorreoPago] =
        useState('');

    const [
        fechaLicencia,
        setFechaLicencia,
    ] = useState('');

    const [fechaSoat, setFechaSoat] =
        useState('');

    const [
        fechaTecnico,
        setFechaTecnico,
    ] = useState('');

    const [terminos, setTerminos] =
        useState(false);

    const [errores, setErrores] =
        useState({});


    const limpiarError = (campo) => {
        setErrores((prev) => ({
            ...prev,
            [campo]: '',
        }));
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!licenciaUri) {
            nuevosErrores.licencia =
                'Debes cargar la licencia.';
        }

        if (!numeroLicencia.trim()) {
            nuevosErrores.numeroLicencia =
                'Número de licencia obligatorio.';
        } else if (
            numeroLicencia.trim().length < 6
        ) {
            nuevosErrores.numeroLicencia =
                'Número de licencia inválido.';
        }

        if (!fechaLicencia.trim()) {
            nuevosErrores.fechaLicencia =
                'Fecha de vencimiento obligatoria.';
        }

        if (!soatUri) {
            nuevosErrores.soat =
                'Debes cargar el SOAT.';
        }

        if (!fechaSoat.trim()) {
            nuevosErrores.fechaSoat =
                'Fecha de vencimiento obligatoria.';
        }

        if (!tecnicoUri) {
            nuevosErrores.tecnico =
                'Debes cargar la técnico mecánica.';
        }

        if (!fechaTecnico.trim()) {
            nuevosErrores.fechaTecnico =
                'Fecha de vencimiento obligatoria.';
        }

        if (!correoPago.trim()) {
            nuevosErrores.correoPago =
                'Correo obligatorio.';
        } else if (
            !/^\S+@\S+\.\S+$/.test(
                correoPago
            )
        ) {
            nuevosErrores.correoPago =
                'Correo inválido.';
        }

        if (!terminos) {
            nuevosErrores.terminos =
                'Debes aceptar los términos.';
        }

        setErrores(nuevosErrores);

        return (
            Object.keys(nuevosErrores).length === 0
        );
    };

    const onGuardarDocumentos = () => {
        const valido =
            validarFormulario();

        if (!valido) {
            return;
        }

        console.log(
            'Documentos guardados'
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <SectionTitle
                title="Documentos 📄"
            />

            <Text style={styles.subtitulo}>
                Gestiona la documentación requerida
                para operar como conductor.
            </Text>

            {/* LICENCIA */}

            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Ionicons
                        name="card-outline"
                        size={24}
                        color={Colors.primary}
                    />

                    <Text style={styles.title}>
                        Licencia de conducción
                    </Text>
                </View>

                <ProfileImagePicker
                    label="Fotografía de la licencia"
                    imageUri={licenciaUri}
                    onSelectImage={setLicenciaUri}
                />

                {errores.licencia && (
                    <Text style={styles.error}>
                        {errores.licencia}
                    </Text>
                )}

                <CustomInput
                    icon="document-text-outline"
                    label="Número de licencia"
                    value={numeroLicencia}
                    onChangeText={(texto) => {
                        setNumeroLicencia(texto);
                        limpiarError('numeroLicencia');
                    }}
                    placeholder="Ej. 123456789"
                />
                {errores.numeroLicencia && (
                    <Text style={styles.error}>
                        {errores.numeroLicencia}
                    </Text>
                )}
                <CustomInput
                    icon="calendar-outline"
                    label="Vencimiento licencia"
                    value={fechaLicencia}
                    onChangeText={(texto) => {
                        setFechaLicencia(texto);
                        limpiarError('fechaLicencia');
                    }}
                    placeholder="DD/MM/AAAA"
                />
                {errores.fechaLicencia && (
                    <Text style={styles.error}>
                        {errores.fechaLicencia}
                    </Text>
                )}

            </View>

            {/* SOAT */}

            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Ionicons
                        name="shield-checkmark-outline"
                        size={24}
                        color={Colors.primary}
                    />

                    <Text style={styles.title}>
                        SOAT
                    </Text>
                </View>

                <ProfileImagePicker
                    label="Fotografía del SOAT"
                    imageUri={soatUri}
                    onSelectImage={setSoatUri}
                />
                {errores.soat && (
                    <Text style={styles.error}>
                        {errores.soat}
                    </Text>
                )}
                <CustomInput
                    icon="calendar-outline"
                    label="Vencimiento SOAT"
                    value={fechaSoat}
                    onChangeText={(texto) => {
                        setFechaSoat(texto);
                        limpiarError('fechaSoat');
                    }}
                    placeholder="DD/MM/AAAA"
                />
                {errores.fechaSoat && (
                    <Text style={styles.error}>
                        {errores.fechaSoat}
                    </Text>
                )}

            </View>

            {/* TÉCNICO MECÁNICA */}

            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Ionicons
                        name="construct-outline"
                        size={24}
                        color={Colors.primary}
                    />

                    <Text style={styles.title}>
                        Revisión técnico mecánica
                    </Text>
                </View>

                <ProfileImagePicker
                    label="Fotografía del certificado"
                    imageUri={tecnicoUri}
                    onSelectImage={setTecnicoUri}
                />
                {errores.tecnico && (
                    <Text style={styles.error}>
                        {errores.tecnico}
                    </Text>
                )}

                <CustomInput
                    icon="calendar-outline"
                    label="Vencimiento técnico mecánica"
                    value={fechaTecnico}
                    onChangeText={(texto) => {
                        setFechaTecnico(texto);
                        limpiarError('fechaTecnico');
                    }}
                    placeholder="DD/MM/AAAA"
                />
                {errores.fechaTecnico && (
                    <Text style={styles.error}>
                        {errores.fechaTecnico}
                    </Text>
                )}
            </View>

            {/* PAGOS */}

            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Ionicons
                        name="wallet-outline"
                        size={24}
                        color={Colors.primary}
                    />

                    <Text style={styles.title}>
                        Información de pagos
                    </Text>
                </View>

                <CustomInput
                    icon="mail-outline"
                    label="Correo Mercado Pago"
                    value={correoPago}
                    onChangeText={(texto) => {
                        setCorreoPago(texto);
                        limpiarError('correoPago');
                    }}
                    placeholder="correo@mercadopago.com"
                />
                {errores.correoPago && (
                    <Text style={styles.error}>
                        {errores.correoPago}
                    </Text>
                )}
            </View>

            {/* ESTADO */}

            <View style={styles.card}>
                <View style={styles.headerRow}>
                    <Ionicons
                        name="checkmark-circle-outline"
                        size={24}
                        color={Colors.primary}
                    />

                    <Text style={styles.title}>
                        Estado documental
                    </Text>
                </View>

                <Text style={styles.status}>
                    🟡 Pendiente de revisión
                </Text>

                <Text style={styles.description}>
                    Los documentos serán revisados
                    antes de habilitar la cuenta del
                    conductor.
                </Text>
            </View>

            {/* TÉRMINOS */}

            <View style={styles.card}>
                <View style={styles.switchRow}>
                    <View style={styles.switchText}>
                        <Text style={styles.title}>
                            Aceptación de términos
                        </Text>

                        <Text style={styles.description}>
                            Confirmo que la información
                            suministrada es real y que los
                            documentos se encuentran
                            vigentes.
                        </Text>
                    </View>

                    <Switch
                        value={terminos}
                        onValueChange={(valor) => {
                            setTerminos(valor);
                            limpiarError('terminos');
                        }}
                    />
                    {errores.terminos && (
                        <Text style={styles.error}>
                            {errores.terminos}
                        </Text>
                    )}
                </View>
            </View>

            <CustomButton
                title="Guardar documentos"
                onPress={onGuardarDocumentos}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:
            Colors.background,
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

    card: {
        backgroundColor:
            Colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        elevation: 3,
    },

    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    title: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '700',
        color: Colors.secondary,
    },

    description: {
        marginTop: 8,
        color: Colors.gray,
        fontSize: 12,
        lineHeight: 18,
    },

    status: {
        fontSize: 16,
        fontWeight: '700',
        color: '#F59E0B',
    },

    switchRow: {
        flexDirection: 'row',
        justifyContent:
            'space-between',
        alignItems: 'center',
    },

    switchText: {
        flex: 1,
        marginRight: 20,
    },

    error: {
        color: Colors.error,
        fontSize: 12,
        marginTop: 5,
        marginBottom: 10,
    },

});