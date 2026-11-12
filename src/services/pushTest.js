export const sendPushNotification = async (
    expoPushToken
) => {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'PRUEBA PUSH DEFINITIVA ✅',
        body: 'Juan Camilo, si ves esto ya funciona.',
        data: {
            type: 'request',
        },
    };

    const response = await fetch(
        'https://exp.host/--/api/v2/push/send',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        }
    );

    const result = await response.json();

    console.log(
        'PUSH RESPONSE:',
        result
    );

    return result;
};