/**
 * TabNavigator
 *
 * Bottom Tabs de las secciones principales del conductor:
 * Inicio, Perfil y Vehículo.
 *
 * El registro no va en pestañas: se abre desde el Stack (AppNavigator).
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ROUTES } from '../constants/routes';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VehicleScreen from '../screens/VehicleScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Tab.Screen
        name={ROUTES.HOME}
        component={HomeScreen}
        options={{ title: 'Inicio' }}
      />
      <Tab.Screen
        name={ROUTES.PROFILE}
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
      <Tab.Screen
        name={ROUTES.VEHICLE}
        component={VehicleScreen}
        options={{ title: 'Vehículo' }}
      />
    </Tab.Navigator>
  );
}
