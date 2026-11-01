/**
 * App.js
 *
 * Punto de entrada visual de la app.
 * Monta el NavigationContainer de React Navigation
 * y el Stack Navigator raíz (con Bottom Tabs anidadas).
 *
 * No configura Firebase, mapas, pagos ni lógica de viajes.
 */
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AppProvider from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}
