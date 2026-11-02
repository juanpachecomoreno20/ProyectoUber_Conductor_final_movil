import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import ErrorMessage from './ErrorMessage';

export default function ProfileImagePicker({
  label,
  imageUri,
  onSelectImage,
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Pressable
        style={styles.imageContainer}
        onPress={onSelectImage}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.icon}>
              +
            </Text>

            <Text style={styles.helper}>
              Seleccionar de la galería
            </Text>
          </View>
        )}
      </Pressable>

      {imageUri ? (
        <Pressable onPress={onSelectImage}>
          <Text style={styles.link}>
            Cambiar foto
          </Text>
        </Pressable>
      ) : null}

      <ErrorMessage message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },

  imageContainer: {
    alignSelf: 'center',
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#A7F3D0',
  },

  image: {
    width: '100%',
    height: '100%',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },

  icon: {
    fontSize: 32,
    color: '#059669',
    marginBottom: 4,
  },

  helper: {
    fontSize: 12,
    color: '#047857',
    textAlign: 'center',
  },

  link: {
    marginTop: 8,
    textAlign: 'center',
    color: '#059669',
    fontWeight: '600',
  },
});