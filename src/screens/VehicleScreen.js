/**
 * VehicleScreen
 *
 * Pestaña 2 - Información del Vehículo.
 */
import { createDriver } from '../services/firestoreService';
import * as ImagePicker from 'expo-image-picker';

import {
  useContext,
  useState,
} from 'react';

import {
  AppContext,
} from '../context/AppContext';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import CustomPicker from '../components/CustomPicker';
import { ROUTES } from '../constants/routes';
import ProfileImagePicker from '../components/ProfileImagePicker';
import { CommonActions } from '@react-navigation/native';

const CATEGORIAS = [
  'Económico',
  'Comfort',
  'XL',
  'Premium',
  'SUV',
  'Van',
];
const COLORES = [
  'Blanco',
  'Negro',
  'Gris',
  'Plata',
  'Rojo',
  'Azul',
  'Verde',
  'Amarillo',
  'Naranja',
  'Beige',
];

const ANIO_MINIMO = 2000;
const PLACA_REGEX =
  /^[A-Z]{3}[0-9]{3}$/;


export default function VehicleScreen() {

  const route = useRoute();
  const navigation = useNavigation();

  const { setDriver } =
    useContext(AppContext);

  const datosPersonales =
    route.params?.datosPersonales;

  console.log(
    'DATOS PERSONALES:',
    datosPersonales
  );


  const [guardando, setGuardando] = useState(false);

  const [fotoVehiculo, setFotoVehiculo] = useState(null);

  const [categoria, setCategoria] = useState('');
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [color, setColor] = useState('');
  const [capacidad, setCapacidad] = useState('');

  const [errores, setErrores] = useState({});

  const limpiarError = (campo) => {
    setErrores((actuales) => {
      const copia = { ...actuales };
      delete copia[campo];
      return copia;
    });
  };

  const seleccionarFotoVehiculo = async () => {
    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
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
      setFotoVehiculo(
        resultado.assets[0].uri
      );

      limpiarError('fotoVehiculo');
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!fotoVehiculo) {
      nuevosErrores.fotoVehiculo =
        'La foto del vehículo es obligatoria.';
    }

    if (!categoria) {
      nuevosErrores.categoria =
        'Selecciona una categoría.';
    }

    if (!placa.trim()) {
      nuevosErrores.placa =
        'La placa es obligatoria.';
    } else if (!PLACA_REGEX.test(placa)) {
      nuevosErrores.placa =
        'La placa debe tener formato ABC123.';
    }

    if (!marca.trim()) {
      nuevosErrores.marca =
        'La marca es obligatoria.';
    }

    if (!modelo.trim()) {
      nuevosErrores.modelo =
        'El modelo es obligatorio.';
    }

    if (!anio) {
      nuevosErrores.anio =
        'El año es obligatorio.';
    } else {
      const anioNumero = Number(anio);
      const anioActual = new Date().getFullYear();

      if (
        anioNumero < ANIO_MINIMO ||
        anioNumero > anioActual
      ) {
        nuevosErrores.anio =
          `Ingresa un año válido entre ${ANIO_MINIMO} y ${anioActual}.`;
      }
    }

    if (!color) {
      nuevosErrores.color =
        'Selecciona un color.';
    }

    if (!capacidad) {
      nuevosErrores.capacidad =
        'La capacidad es obligatoria.';
    } else {

      const capacidadNumero =
        Number(capacidad);

      if (capacidadNumero <= 0) {
        nuevosErrores.capacidad =
          'La capacidad debe ser mayor que cero.';
      }

      if (
        categoria === 'XL' &&
        capacidadNumero < 6
      ) {
        nuevosErrores.capacidad =
          'La categoría XL exige mínimo 6 pasajeros.';
      }
    }

    setErrores(nuevosErrores);

    return (
      Object.keys(nuevosErrores).length === 0
    );
  };

  const onGuardarVehiculo = async () => {

    if (guardando) {
      return;
    }

    const valido = validarFormulario();

    if (!valido) {
      return;
    }

    if (!datosPersonales) {
      Alert.alert(
        'Información incompleta',
        'Debes registrar primero los datos personales.'
      );
      return;
    }
    try {

      setGuardando(true);

      console.log('INICIANDO GUARDADO');
      console.log('DATOS PERSONALES:', datosPersonales);

      const resultado = await createDriver({
        datosPersonales,
        vehiculo: {
          categoria,
          placa,
          marca,
          modelo,
          anio,
          color,
          capacidad,
        },
      });

      setDriver({
        id: resultado.id,
        datosPersonales,
        vehiculo: {
          categoria,
          placa,
          marca,
          modelo,
          anio,
          color,
          capacidad,
          fotoVehiculo,
        },
      });


      console.log('DOCUMENTO CREADO:', resultado.id);

      Alert.alert(
        'Éxito',
        'Conductor registrado correctamente.',
        [
          {
            text: 'OK',
            onPress: () =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: ROUTES.PROFILE,
                    },
                  ],
                })
              )
          },
        ]
      );
    } catch (error) {

      console.log('ERROR FIREBASE:', error);

      Alert.alert(
        'Error',
        error.message
      );

    } finally {

      setGuardando(false);

    }

  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
      keyboardVerticalOffset={50}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.contenido}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.encabezado}>
          <Text style={styles.numero}>
            Pestaña 2
          </Text>

          <Text style={styles.titulo}>
            Información del vehículo
          </Text>

          <Text style={styles.subtitulo}>
            Completa la información del vehículo
            que utilizarás como conductor.
          </Text>
        </View>

        <View style={styles.card}>
          <ProfileImagePicker
            label="Foto del vehículo"
            imageUri={fotoVehiculo}
            onSelectImage={seleccionarFotoVehiculo}
            error={errores.fotoVehiculo}
          />

          <CustomPicker
            icon="layers-outline"
            label="Categoría"
            selectedValue={categoria}
            onValueChange={(valor) => {
              setCategoria(valor);
              limpiarError('categoria');
            }}
            items={CATEGORIAS}
            placeholder="Selecciona una categoría"
            error={errores.categoria}
          />

          <CustomInput
            icon="card-outline"
            label="Placa"
            value={placa}
            onChangeText={(texto) => {
              setPlaca(
                texto.toUpperCase()
              );
              limpiarError('placa');
            }}
            placeholder="ABC123"
            error={errores.placa}
            autoCapitalize="characters"
          />

          <CustomInput
            icon="car-outline"
            label="Marca"
            value={marca}
            onChangeText={(texto) => {
              setMarca(texto);
              limpiarError('marca');
            }}
            placeholder="Ej. Chevrolet"
            error={errores.marca}
            maxLength={30}
          />

          <CustomInput
            icon="car-sport-outline"
            label="Modelo"
            value={modelo}
            onChangeText={(texto) => {
              setModelo(texto);
              limpiarError('modelo');
            }}
            placeholder="Ej. Onix"
            error={errores.modelo}
            maxLength={30}
          />

          <CustomInput
            icon="calendar-outline"
            label="Año"
            value={anio}
            onChangeText={(texto) => {
              setAnio(
                texto
                  .replace(/[^\d]/g, '')
                  .slice(0, 4)
              );

              limpiarError('anio');
            }}
            placeholder="2024"
            error={errores.anio}
            keyboardType="number-pad"
          />

          <CustomPicker
            icon="color-palette-outline"
            label="Color"
            selectedValue={color}
            onValueChange={(valor) => {
              setColor(valor);
              limpiarError('color');
            }}
            items={COLORES}
            placeholder="Selecciona un color"
            error={errores.color}
          />

          <CustomInput
            icon="people-outline"
            label="Capacidad de pasajeros"
            value={capacidad}
            onChangeText={(texto) => {
              setCapacidad(
                texto.replace(/[^\d]/g, '')
              );

              limpiarError('capacidad');
            }}
            placeholder="4"
            error={errores.capacidad}
            keyboardType="number-pad"
          />

          <CustomButton
            title="Guardar vehículo"
            onPress={onGuardarVehiculo}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  contenido: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },

  encabezado: {
    marginBottom: 16,
  },

  numero: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669',
    textTransform: 'uppercase',
    marginBottom: 4,
  },

  titulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },

  subtitulo: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },
});