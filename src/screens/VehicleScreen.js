/**
 * VehicleScreen
 *
 * Pestaña 2 - Información del Vehículo.
 *
 * Primera entrega:
 * - Captura de datos del vehículo.
 * - Validaciones locales con useState.
 * - Componentes reutilizables.
 * - Selección de imagen local.
 *
 * Pendiente:
 * - Integración con Firestore.
 * - Integración con Storage.
 * - Persistencia de datos.
 */
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
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
import ProfileImagePicker from '../components/ProfileImagePicker';

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

export default function VehicleScreen() {
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
    }

    setErrores(nuevosErrores);

    return (
      Object.keys(nuevosErrores).length === 0
    );
  };

  const onGuardarVehiculo = () => {
    const valido = validarFormulario();

    if (!valido) {
      return;
    }

    Alert.alert(
      'Vehículo',
      'Información válida. La integración con Firestore se realizará más adelante.'
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.contenido}
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