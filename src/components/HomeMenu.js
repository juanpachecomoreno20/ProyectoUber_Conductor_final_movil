import React from 'react';

import {
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import { ROUTES } from '../constants/routes';


export default function HomeMenu({
  navigation,
}) {
  const abrirMenu = () => {
    Alert.alert(
      'Menú conductor',
      'Selecciona una opción',
      [
        {
          text: '💰 Ganancias',
          onPress: () =>
            navigation.navigate(
              ROUTES.EARNINGS
            ),
        },
        {
          text: '🚕 Historial',
          onPress: () =>
            navigation.navigate(
              ROUTES.HISTORY
            ),
        },
        {
            text: '📄 Documentos',
            onPress: () =>
              navigation.navigate(
                ROUTES.DOCUMENTS
              ),
          },

        {
          text: '⚙️ Configuración',
          onPress: () =>
            navigation.navigate(
                ROUTES.SETTINGS
              )
        },
        {
          text: '🚪 Cerrar sesión',
          onPress: () =>
            console.log(
              'Cerrar sesión'
            ),
          style: 'destructive',
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <Pressable
      style={styles.button}
      onPress={abrirMenu}
    >
      <Ionicons
        name="menu"
        size={32}
        color={Colors.secondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 6,
  },
});