
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ROUTES } from '../constants/routes';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VehicleScreen from '../screens/VehicleScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6B7280',

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === ROUTES.HOME) {
            iconName = 'speedometer-outline';
          } else if (route.name === ROUTES.PROFILE) {
            iconName = 'person-outline';
          } else if (route.name === ROUTES.VEHICLE) {
            iconName = 'car-outline';
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
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