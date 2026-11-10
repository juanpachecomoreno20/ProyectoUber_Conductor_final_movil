import React, {
    useContext,
    useState,
} from 'react';

import {
    Alert,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from 'react-native';

import {
    AppContext,
} from '../context/AppContext';

import {
    updateDriver,
} from '../services/firestoreService';


import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import ProfileImagePicker from '../components/ProfileImagePicker';
import SectionTitle from '../components/SectionTitle';
import DateTimePicker from '@react-native-community/datetimepicker';

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

    const [guardando, setGuardando] =
        useState(false);

    const limpiarError = (campo) => {
        setErrores((prev) => ({
            ...prev,
            [campo]: '',
        }));
    };

    const [
        mostrarFechaLicencia,
        setMostrarFechaLicencia,
    ] = useState(false);

    const [
        mostrarFechaSoat,
        setMostrarFechaSoat,
    ] = useState(false);

    const [
        mostrarFechaTecnico,
        setMostrarFechaTecnico,
    ] = useState(false);


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


    const formatearFecha = (fecha) => {
        return fecha.toLocaleDateString('es-CO');
    };

    const cambiarFechaLicencia = (
        event,
        fechaSeleccionada
    ) => {
        setMostrarFechaLicencia(false);

        if (fechaSeleccionada) {
            setFechaLicencia(
                formatearFecha(
                    fechaSeleccionada
                )
            );

            limpiarError(
                'fechaLicencia'
            );
        }
    };

    const cambiarFechaSoat = (
        event,
        fechaSeleccionada
    ) => {
        setMostrarFechaSoat(false);

        if (fechaSeleccionada) {
            setFechaSoat(
                formatearFecha(
                    fechaSeleccionada
                )
            );

            limpiarError(
                'fechaSoat'
            );
        }
    };

    const cambiarFechaTecnico = (
        event,
        fechaSeleccionada
    ) => {
        setMostrarFechaTecnico(false);

        if (fechaSeleccionada) {
            setFechaTecnico(
                formatearFecha(
                    fechaSeleccionada
                )
            );

            limpiarError(
                'fechaTecnico'
            );
        }
    };

    const onGuardarDocumentos = async () => {
        const valido =
            validarFormulario();

        if (guardando) {
            return;
        }

        if (!valido) {
            return;
        }

        try {
            const documentos = {
                licenciaUri,
                numeroLicencia,
                fechaLicencia,

                soatUri,
                fechaSoat,

                tecnicoUri,
                fechaTecnico,

                correoPago,
                terminos,
            };

            setGuardando(true);

            await updateDriver(
                driver.id,
                {
                    documentos,
                }
            );

            setDriver({
                ...driver,
                documentos,
            });

            Alert.alert(
                'Éxito',
                'Documentos guardados correctamente.'
            );
        } catch (error) {
            console.log(
                'ERROR DOCUMENTOS:',
                error
            );

            Alert.alert(
                'Error',
                'No fue posible guardar los documentos.'
            );
        }
    };


    const seleccionarLicencia = async () => {
        const permiso =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert(
                'Permiso requerido',
                'Debes permitir acceso a la galería.'
            );
            return;
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });

        if (
            !resultado.canceled &&
            resultado.assets?.[0]?.uri
        ) {
            setLicenciaUri(
                resultado.assets[0].uri
            );

            limpiarError('licencia');
        }
    };


    const seleccionarSoat = async () => {
        const permiso =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert(
                'Permiso requerido',
                'Debes permitir acceso a la galería.'
            );
            return;
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });

        if (
            !resultado.canceled &&
            resultado.assets?.[0]?.uri
        ) {
            setSoatUri(
                resultado.assets[0].uri
            );

            limpiarError('soat');
        }
    };


    const seleccionarTecnico = async () => {
        const permiso =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permiso.granted) {
            Alert.alert(
                'Permiso requerido',
                'Debes permitir acceso a la galería.'
            );
            return;
        }

        const resultado =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                quality: 0.8,
            });

        if (
            !resultado.canceled &&
            resultado.assets?.[0]?.uri
        ) {
            setTecnicoUri(
                resultado.assets[0].uri
            );

            limpiarError('tecnico');
        }
    };

    const {
        driver,
        setDriver,
    } = useContext(AppContext);

    console.log(
        'DRIVER ID:',
        driver?.id
    );


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
                    onSelectImage={seleccionarLicencia}
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
                <Text style={styles.fechaLabel}>
                    Vencimiento licencia
                </Text>

                <Pressable
                    style={styles.fechaButton}
                    onPress={() =>
                        setMostrarFechaLicencia(true)
                    }
                >
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={Colors.gray}
                    />

                    <Text style={styles.fechaText}>
                        {fechaLicencia ||
                            'Seleccionar fecha'}
                    </Text>
                </Pressable>

                {mostrarFechaLicencia && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        onChange={
                            cambiarFechaLicencia
                        }
                    />
                )}
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
                    onSelectImage={seleccionarSoat}
                />
                {errores.soat && (
                    <Text style={styles.error}>
                        {errores.soat}
                    </Text>
                )}
                <Text style={styles.fechaLabel}>
                    Vencimiento SOAT
                </Text>

                <Pressable
                    style={styles.fechaButton}
                    onPress={() =>
                        setMostrarFechaSoat(true)
                    }
                >
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={Colors.gray}
                    />

                    <Text style={styles.fechaText}>
                        {fechaSoat ||
                            'Seleccionar fecha'}
                    </Text>
                </Pressable>

                {mostrarFechaSoat && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={
                            Platform.OS === 'ios'
                                ? 'spinner'
                                : 'default'
                        }
                        onChange={cambiarFechaSoat}
                    />
                )}

                {errores.fechaSoat && (
                    <Text style={styles.error}>
                        {errores.fechaSoat}
                    </Text>
                )}
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
                    onSelectImage={seleccionarTecnico}
                />
                {errores.tecnico && (
                    <Text style={styles.error}>
                        {errores.tecnico}
                    </Text>
                )}

                <Text style={styles.fechaLabel}>
                    Vencimiento técnico mecánica
                </Text>

                <Pressable
                    style={styles.fechaButton}
                    onPress={() =>
                        setMostrarFechaTecnico(true)
                    }
                >
                    <Ionicons
                        name="calendar-outline"
                        size={20}
                        color={Colors.gray}
                    />

                    <Text style={styles.fechaText}>
                        {fechaTecnico ||
                            'Seleccionar fecha'}
                    </Text>
                </Pressable>

                {mostrarFechaTecnico && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={
                            Platform.OS === 'ios'
                                ? 'spinner'
                                : 'default'
                        }
                        onChange={cambiarFechaTecnico}
                    />
                )}

                {errores.fechaTecnico && (
                    <Text style={styles.error}>
                        {errores.fechaTecnico}
                    </Text>
                )}
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
                title={
                    guardando
                        ? 'Guardando...'
                        : 'Guardar documentos'
                }
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

    fechaLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: Colors.secondary,
        marginBottom: 6,
      },
      
      fechaButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 5,
      },
      
      fechaText: {
        marginLeft: 10,
        color: Colors.secondary,
      },

});