import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import ErrorMessage from './ErrorMessage';

export default function CustomPicker({
  icon,
  label,
  selectedValue,
  onValueChange,
  items,
  placeholder,
  error,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
      </Text>

      <View
        style={[
          styles.pickerContainer,
          error && styles.pickerError,
        ]}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={20}
            color="#6B7280"
            style={styles.icon}
          />
        ) : null}

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
          >
            <Picker.Item
              label={placeholder}
              value=""
            />

            {items.map((item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
              />
            ))}
          </Picker>
        </View>
      </View>

      <ErrorMessage message={error} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },

  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },

  pickerError: {
    borderColor: '#DC2626',
  },

  icon: {
    marginLeft: 14,
  },

  pickerWrapper: {
    flex: 1,
  },
});