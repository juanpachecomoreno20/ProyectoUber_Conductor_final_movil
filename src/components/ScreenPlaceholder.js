/**
 * Componente visual mínimo para pantallas vacías de la primera entrega.
 * No contiene lógica de negocio; solo muestra un título y un texto guía.
 */
import { StyleSheet, Text, View } from 'react-native';

export default function ScreenPlaceholder({ title, description }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
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
  },
});
