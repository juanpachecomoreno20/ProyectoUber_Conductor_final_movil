/**
 * RegisterScreen — Pestaña 1: Datos personales del conductor.
 *
 * Formulario con validaciones locales (useState).
 */
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomPicker from '../components/CustomPicker';
import ProfileImagePicker from '../components/ProfileImagePicker';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../constants/routes';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const NOMBRE_MAX = 50;
const DOC_MIN = 6;
const DOC_MAX = 10;
const CELULAR_LARGO = 10;

/** Letras (incluye tildes y ñ) y espacios. */
const SOLO_LETRAS = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;
const SOLO_NUMEROS = /^\d+$/;
const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENEROS = ['Masculino', 'Femenino', 'Otro'];
const IDIOMAS = ['Español', 'Inglés'];

/** Fecha máxima permitida: hace exactamente 18 años (mayoría de edad). */
function obtenerFechaMaxima18() {
  const fecha = new Date();
  fecha.setHours(0, 0, 0, 0);
  fecha.setFullYear(fecha.getFullYear() - 18);
  return fecha;
}

/** Función para verificar si la fecha de nacimiento es mayor a 18 años */
function tieneMinimo18Anios(fechaNacimiento) {
  if (!fechaNacimiento) {
    return false;
  }
  return fechaNacimiento.getTime() <= obtenerFechaMaxima18().getTime();
}

/** Función para formatear la fecha de nacimiento */
function formatearFecha(fecha) {
  return fecha.toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
/** Componente para el formulario de registro */
export default function RegisterScreen() {
  const [fotoUri, setFotoUri] = useState(null);
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [genero, setGenero] = useState('');
  const [correo, setCorreo] = useState('');
  const [idioma, setIdioma] = useState('');
  const [errores, setErrores] = useState({});

  const navigation = useNavigation();

  const limpiarError = (campo) => {
    setErrores((actuales) => {
      if (!actuales[campo]) {
        return actuales;
      }
      const siguientes = { ...actuales };
      delete siguientes[campo];
      return siguientes;
    });
  };

  const seleccionarFoto = async () => {
    const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      setErrores((actuales) => ({
        ...actuales,
        foto: 'Se necesita permiso para acceder a la galería.',
      }));
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets?.[0]?.uri) {
      setFotoUri(resultado.assets[0].uri);
      limpiarError('foto');
    }
  };

  const onCambiarFecha = (evento, fechaSeleccionada) => {
    if (Platform.OS === 'android') {
      setMostrarCalendario(false);
    }

    if (evento.type === 'dismissed') {
      return;
    }

    if (fechaSeleccionada) {
      setFechaNacimiento(fechaSeleccionada);
      limpiarError('fechaNacimiento');
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const nombre = nombreCompleto.trim();
    const correoLimpio = correo.trim();

    if (!fotoUri) {
      nuevosErrores.foto = 'La foto de perfil es obligatoria.';
    }

    if (!nombre) {
      nuevosErrores.nombreCompleto = 'El nombre completo es obligatorio.';
    } else if (nombre.length > NOMBRE_MAX) {
      nuevosErrores.nombreCompleto = `El nombre no puede superar ${NOMBRE_MAX} caracteres.`;
    } else if (!SOLO_LETRAS.test(nombre)) {
      nuevosErrores.nombreCompleto = 'El nombre solo puede contener letras y espacios.';
    }

    if (!documento) {
      nuevosErrores.documento = 'El documento de identidad es obligatorio.';
    } else if (!SOLO_NUMEROS.test(documento) || documento.length < DOC_MIN || documento.length > DOC_MAX) {
      nuevosErrores.documento = `El documento debe tener entre ${DOC_MIN} y ${DOC_MAX} dígitos.`;
    }

    if (!celular) {
      nuevosErrores.celular = 'El número de celular es obligatorio.';
    } else if (!SOLO_NUMEROS.test(celular) || celular.length !== CELULAR_LARGO) {
      nuevosErrores.celular = `El celular debe tener exactamente ${CELULAR_LARGO} dígitos.`;
    }

    if (!fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'La fecha de nacimiento es obligatoria.';
    } else if (!tieneMinimo18Anios(fechaNacimiento)) {
      nuevosErrores.fechaNacimiento = 'Debes tener al menos 18 años para registrarte.';
    }

    if (!genero) {
      nuevosErrores.genero = 'Selecciona un género.';
    }

    if (!correoLimpio) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!CORREO_VALIDO.test(correoLimpio)) {
      nuevosErrores.correo = 'Ingresa un correo electrónico válido.';
    }

    if (!idioma) {
      nuevosErrores.idioma = 'Selecciona un idioma.';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const onContinuar = () => {
    const esValido = validarFormulario();
  
    if (!esValido) {
      return;
    }
  
    navigation.navigate(
      ROUTES.MAIN_TABS,
      {
        screen: ROUTES.VEHICLE,
    
        params: {
          datosPersonales: {
            fotoUri,
            nombreCompleto,
            documento,
            celular,
            fechaNacimiento:
              fechaNacimiento?.toISOString(),
            genero,
            correo,
            idioma,
          },
        },
      }
    ); 
  };
  
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
        <View style={styles.pestaña}>
          <Text style={styles.pestañaNumero}>Pestaña 1</Text>
          <Text style={styles.pestañaTitulo}>Datos personales</Text>
          <Text style={styles.pestañaSubtitulo}>
            Completa tu información. Todos los campos son obligatorios.
          </Text>
        </View>

        <View style={styles.tarjeta}>
          <ProfileImagePicker
            label="Foto de perfil"
            imageUri={fotoUri}
            onSelectImage={seleccionarFoto}
            error={errores.foto}
          />

          <CustomInput
            icon="person-outline"
            label="Nombre completo"
            value={nombreCompleto}
            onChangeText={(texto) => {
              setNombreCompleto(texto);
              limpiarError('nombreCompleto');
            }}
            placeholder="Ej. Ana María López"
            error={errores.nombreCompleto}
            maxLength={NOMBRE_MAX}
            autoCapitalize="words"
          />
          <Text style={styles.contador}>
            {nombreCompleto.length}/{NOMBRE_MAX}
          </Text>

          <CustomInput
            icon="card-outline"
            label="Documento de identidad"
            value={documento}
            onChangeText={(texto) => {
              setDocumento(
                texto.replace(/[^\d]/g, '').slice(0, DOC_MAX)
              );
              limpiarError('documento');
            }}
            placeholder="Entre 6 y 10 dígitos"
            error={errores.documento}
            keyboardType="number-pad"
            maxLength={DOC_MAX}
          />
          <CustomInput
            icon="call-outline"
            label="Número de celular"
            value={celular}
            onChangeText={(texto) => {
              setCelular(
                texto.replace(/[^\d]/g, '').slice(0, CELULAR_LARGO)
              );
              limpiarError('celular');
            }}
            placeholder="10 dígitos"
            error={errores.celular}
            keyboardType="phone-pad"
            maxLength={CELULAR_LARGO}
          />

          <Text style={styles.etiqueta}>Fecha de nacimiento</Text>
          <Pressable
            style={[
              styles.input,
              styles.selectorFecha,
              errores.fechaNacimiento && styles.inputError,
            ]}
            onPress={() => setMostrarCalendario(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#6B7280"
            />

            <Text
              style={[
                fechaNacimiento
                  ? styles.textoSelector
                  : styles.placeholder,
                { marginLeft: 10 },
              ]}
            >
              {fechaNacimiento
                ? formatearFecha(fechaNacimiento)
                : 'Selecciona tu fecha de nacimiento'}
            </Text>
          </Pressable>
          {mostrarCalendario ? (
            <View>
              <DateTimePicker
                value={fechaNacimiento || obtenerFechaMaxima18()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                maximumDate={obtenerFechaMaxima18()}
                onChange={onCambiarFecha}
              />
              {Platform.OS === 'ios' ? (
                <Pressable
                  style={styles.botonListo}
                  onPress={() => setMostrarCalendario(false)}
                >
                  <Text style={styles.botonListoTexto}>Listo</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
          {errores.fechaNacimiento ? (
            <Text style={styles.error}>{errores.fechaNacimiento}</Text>
          ) : null}

          <CustomPicker
            icon="people-outline"
            label="Género"
            selectedValue={genero}
            onValueChange={(valor) => {
              setGenero(valor);
              limpiarError('genero');
            }}
            items={GENEROS}
            placeholder="Selecciona el género"
            error={errores.genero}
          />
          <CustomInput
            icon="mail-outline"
            label="Correo electrónico"
            value={correo}
            onChangeText={(texto) => {
              setCorreo(texto);
              limpiarError('correo');
            }}
            placeholder="correo@ejemplo.com"
            error={errores.correo}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <CustomPicker
            icon="language-outline"
            label="Idioma"
            selectedValue={idioma}
            onValueChange={(valor) => {
              setIdioma(valor);
              limpiarError('idioma');
            }}
            items={IDIOMAS}
            placeholder="Selecciona el idioma"
            error={errores.idioma}
          />
          <CustomButton
            title="Continuar"
            onPress={onContinuar}
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
  pestaña: {
    marginBottom: 16,
  },
  pestañaNumero: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#059669',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  pestañaTitulo: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  pestañaSubtitulo: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tarjeta: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#111827',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderColor: '#DC2626',
  },
  selectorFecha: {
    justifyContent: 'center',
  },
  textoSelector: {
    fontSize: 16,
    color: '#111827',
  },
  placeholder: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  contador: {
    marginTop: 4,
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
  },
  botonListo: {
    alignSelf: 'flex-end',
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  botonListoTexto: {
    color: '#059669',
    fontWeight: '700',
  }
});