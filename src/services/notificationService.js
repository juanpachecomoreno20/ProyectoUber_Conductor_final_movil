import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    return null;
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });

    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return null;
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
  } catch (error) {
    console.warn('No se pudo obtener el token Expo Push:', error);
    return null;
  }
}

export async function scheduleLocalNotification(titleOrOptions, maybeMessage) {
  const options =
    typeof titleOrOptions === 'string'
      ? {
          title: titleOrOptions,
          message: maybeMessage || 'Tienes una nueva notificación.',
        }
      : titleOrOptions || {};

  const {
    title = 'Notificación',
    message = 'Tienes una nueva notificación.',
    data = {},
  } = options;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body: message,
      data,
    },
    trigger: null,
  });

  return true;
}
