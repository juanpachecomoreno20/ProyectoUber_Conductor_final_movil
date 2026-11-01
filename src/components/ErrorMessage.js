import { Text, StyleSheet } from 'react-native';

export default function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <Text style={styles.error}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  error: {
    marginTop: 6,
    fontSize: 13,
    color: '#DC2626',
  },
});