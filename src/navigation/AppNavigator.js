/**
 * AppNavigator
 *
 * Stack Navigator raíz de la aplicación.
 *
 * - MainTabs: contiene las Bottom Tabs (Inicio, Perfil, Vehículo).
 * - Register: pantalla de registro, fuera de las pestañas.
 *
 * No incluye flujos de viaje, historial, ganancias ni pagos.
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from '../constants/routes';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import RequestScreen from '../screens/RequestScreen';
import TripScreen from '../screens/TripScreen';
import SummaryScreen from '../screens/SummaryScreen';
import EarningsScreen from '../screens/EarningsScreen';
import HistoryScreen from '../screens/HistoryScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.MAIN_TABS}
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.REGISTER}
        component={RegisterScreen}
        options={{ title: 'Registro' }}
      />

      <Stack.Screen
        name={ROUTES.REQUEST}
        component={RequestScreen}
        options={{
          title: 'Solicitud',
        }}
      />

      <Stack.Screen
        name={ROUTES.TRIP}
        component={TripScreen}
        options={{
          title: 'Viaje',
        }}
      />

      <Stack.Screen
        name={ROUTES.SUMMARY}
        component={SummaryScreen}
        options={{
          title: 'Resumen',
        }}
      />

      <Stack.Screen
        name={ROUTES.EARNINGS}
        component={EarningsScreen}
        options={{
          title: 'Ganancias',
        }}
      />

      <Stack.Screen
        name={ROUTES.HISTORY}
        component={HistoryScreen}
        options={{
          title: 'Historial',
        }}
      />
    </Stack.Navigator>
  );
}
