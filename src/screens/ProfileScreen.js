/**
 * ProfileScreen
 *
 * Perfil del conductor.
 *
 * Muestra la información almacenada
 * en Firebase Firestore.
 */
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { ROUTES } from '../constants/routes';

import {
  useContext,
  useState,
} from 'react';

import {
  AppContext,
} from '../context/AppContext';


import {
  ActivityIndicator,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import SectionTitle from '../components/SectionTitle';

import Colors from '../constants/colors';
import Typography from '../constants/typography';
import Dimensions from '../constants/dimensions';

export default function ProfileScreen() {
  const [showImage, setShowImage] =
    useState(false);
  const navigation = useNavigation();

  const {
    driver,
    loadingDriver,
  } = useContext(AppContext);

  if (loadingDriver) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!driver) {
    return (
      <View style={styles.center}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No existen conductores registrados.
          </Text>
  
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Registrar conductor"
              onPress={() =>
                navigation.navigate(
                  ROUTES.REGISTER
                )
              }
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {driver.datosPersonales?.fotoUri ? (
        <Pressable
          onPress={() => setShowImage(true)}
        >
          <Image
            source={{
              uri: driver.datosPersonales?.fotoUri,
            }}
            style={styles.image}
          />
        </Pressable>

      ) : null}


      {driver?.datosPersonales?.fotoUri ? (
        <Modal
          visible={showImage}
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <Pressable
              style={styles.modalClose}
              onPress={() => setShowImage(false)}
            >
              <Ionicons
                name="close"
                size={30}
                color="white"
              />
            </Pressable>

            <Image
              source={{
                uri: driver.datosPersonales.fotoUri,
              }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      ) : null}

      <Text style={styles.title}>
        {driver.datosPersonales?.nombreCompleto}
      </Text>

      <View style={styles.statusContainer}>
        <Ionicons
          name="time-outline"
          size={18}
          color="#D97706"
        />

        <Text style={styles.statusText}>
          Pendiente de aprobación
        </Text>
      </View>

      <SectionTitle
        title="Información personal"
      />

      <View style={styles.row}>
        <Ionicons
          name="card-outline"
          size={20}
          color={Colors.primary}
        />
        <Text style={styles.item}>
          Documento: {driver.datosPersonales?.documento}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="call-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Celular:
          {' '}
          {driver.datosPersonales?.celular}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="person-outline"
          size={20}
          color={Colors.primary}
        />
        <Text style={styles.item}>
          Género:
          {' '}
          {driver.datosPersonales?.genero}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="language-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Idioma:
          {' '}
          {driver.datosPersonales?.idioma}
        </Text>
      </View>

      <SectionTitle
        title="Información del vehículo"
      />

      <View style={styles.row}>
        <Ionicons
          name="layers-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Categoría:
          {' '}
          {driver.vehiculo?.categoria}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="card-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Placa:
          {' '}
          {driver.vehiculo?.placa}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="car-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Marca:
          {' '}
          {driver.vehiculo?.marca}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="car-sport-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Modelo:
          {' '}
          {driver.vehiculo?.modelo}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="calendar-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Año:
          {' '}
          {driver.vehiculo?.anio}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons
          name="people-outline"
          size={20}
          color={Colors.primary}
        />

        <Text style={styles.item}>
          Capacidad:
          {' '}
          {driver.vehiculo?.capacidad}
          {' '}
          pasajeros
        </Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  section: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '700',
  },

  item: {
    fontSize: Typography.body,
    marginLeft: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  statusText: {
    marginLeft: 8,
    color: '#D97706',
    fontWeight: '700',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },

  emptyContainer: {
    alignItems: 'center',
  },

  emptyText: {
    marginBottom: 20,
    fontSize: Typography.body,
    color: Colors.secondary,
  },

  buttonContainer: {
    width: 220,
  },
});

