import React, { useState } from 'react';

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/colors';
import { ROUTES } from '../constants/routes';

export default function HomeMenu({
  navigation,
}) {
  const [visible, setVisible] =
    useState(false);

  const items = [
    {
      icon: 'cash-outline',
      label: 'Ganancias',
      route: ROUTES.EARNINGS,
    },
    {
      icon: 'receipt-outline',
      label: 'Historial',
      route: ROUTES.HISTORY,
    },
    {
      icon: 'document-text-outline',
      label: 'Documentos',
      route: ROUTES.DOCUMENTS,
    },
    {
      icon: 'settings-outline',
      label: 'Configuración',
      route: ROUTES.SETTINGS,
    },
  ];

  const navegar = (route) => {
    setVisible(false);

    navigation.navigate(route);
  };

  return (
    <>
      <Pressable
        style={styles.menuButton}
        onPress={() => setVisible(true)}
      >
        <Ionicons
          name="menu"
          size={32}
          color={Colors.secondary}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <Pressable style={styles.modal}>
            <Text style={styles.title}>
              Menú conductor
            </Text>

            {items.map((item) => (
              <TouchableOpacity
                key={item.label}
                style={styles.option}
                onPress={() =>
                  navegar(item.route)
                }
              >
                <Ionicons
                  name={item.icon}
                  size={22}
                  color={Colors.primary}
                />

                <Text
                  style={styles.optionText}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.logout}
            >
              <Ionicons
                name="log-out-outline"
                size={22}
                color={Colors.error}
              />

              <Text
                style={styles.logoutText}
              >
                Cerrar sesión
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() =>
                setVisible(false)
              }
            >
              <Text style={styles.closeText}>
                Volver
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    padding: 6,
  },

  overlay: {
    flex: 1,
    backgroundColor:
      'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '85%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.secondary,
    marginBottom: 20,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },

  optionText: {
    marginLeft: 15,
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: '600',
  },

  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 10,
  },

  logoutText: {
    marginLeft: 15,
    color: Colors.error,
    fontWeight: '700',
  },

  closeButton: {
    marginTop: 15,
    alignItems: 'center',
  },

  closeText: {
    color: Colors.primary,
    fontWeight: '700',
  },
});