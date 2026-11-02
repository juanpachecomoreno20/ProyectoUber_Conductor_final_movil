/**
 * ProfileScreen
 *
 * Pantalla de perfil del conductor (pestaña Perfil).
 * Primera entrega: vacía, sin datos de usuario ni Firebase.
 * Incluye un enlace de navegación hacia RegisterScreen (Stack).
 */
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ProfileImagePicker from '../components/ProfileImagePicker';
import { ROUTES } from '../constants/routes';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.description}>
        Próximamente se mostrará la información del conductor almacenada en Firebase..
      </Text>
      <Pressable
        style={styles.link}
        onPress={() => navigation.navigate(ROUTES.REGISTER)}
      >
        <Text style={styles.linkText}>Ir a registro</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    marginBottom: 16,
  },
  link: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  linkText: {
    color: '#0a7ea4',
    fontSize: 16,
  },
});
