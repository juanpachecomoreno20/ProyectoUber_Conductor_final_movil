# Bitácora IA - Proyecto Uber Conductor

## 01/11/2026

### Actividad realizada
Creación del proyecto base para el Proyecto Final de Desarrollo Móvil.

### Herramientas utilizadas
- Visual Studio Code
- Git
- GitHub
- Microsoft Copilot
- Expo
- React Native

### Resultado obtenido
Se creó correctamente el proyecto base utilizando Expo con JavaScript.
Se configuró Git localmente y se creó el repositorio en GitHub para el control de versiones del proyecto.

### Uso de IA
Se utilizó IA como apoyo para obtener sugerencias sobre la organización inicial del proyecto, estructura de carpetas y configuración del entorno de desarrollo.

### Aprendizaje
Se comprendió el proceso de creación de un proyecto Expo, la configuración de Git y la integración con GitHub para el seguimiento de cambios.

### Próximos pasos
- Definir la estructura general del proyecto.
- Configurar Firebase Firestore y Storage.
- Implementar el módulo de registro del conductor.
- Crear la navegación principal de la aplicación.

---

## 01/11/2026 - Primera entrega: estructura y navegación

### Actividad realizada
Se construyó únicamente la primera entrega: estructura de carpetas `src/`, navegación base (Stack + Bottom Tabs) y pantallas vacías (Home, Register, Profile, Vehicle). No se configuró Firebase ni se implementó lógica de negocio.

### Herramientas utilizadas
- Visual Studio Code
- Microsoft Copilot
- Cursor IDE
- Git
- Expo SDK 58
- React Native
- React Navigation (native-stack y bottom-tabs)

### Resultado obtenido
La aplicación queda preparada para seguir desarrollando en commits posteriores:
- Carpetas: `components`, `screens`, `navigation`, `services`, `config`, `hooks`, `context`, `constants`, `utils`.
- Stack Navigator raíz con Bottom Tabs anidadas.
- Placeholders vacíos para Firestore y Storage (sin inicializar).


### Uso de IA
Se utilizó IA como apoyo para obtener sugerencias sobre la organización inicial del proyecto, estructura de carpetas y configuración del entorno de desarrollo.


### Aprendizaje
Se comprendió cómo anidar un Bottom Tab Navigator dentro de un Stack Navigator con React Navigation, y por qué conviene dejar Register fuera de las pestañas.

### Próximos pasos
- Configurar Firebase Firestore y Storage.
- Implementar el módulo de registro del conductor.
- Conectar las pantallas vacías con datos reales.

## 01/11/2026

### Actividad realizada
Refactorización de la Pestaña 1 - Datos Personales.

### Resultado obtenido
Se implementaron componentes reutilizables para botones, entradas de texto, selectores y fotografía de perfil.

### Mejoras realizadas
- Integración de Ionicons.
- Modularización del formulario.
- Reducción de código repetido.
- Mejora de la experiencia visual.

### Aprendizaje
Se comprendió cómo reutilizar componentes en React Native mediante props para reducir duplicación de código y mejorar la mantenibilidad del proyecto.


## 02/11/2026  (1:08 AM )

### Actividad realizada
Integración de Firebase Firestore con el registro del conductor.

### Herramientas utilizadas
- Visual Studio Code
- Git
- GitHub
- Microsoft Copilot
- Firebase
- Firestore
- Expo
- React Native

### Uso de IA
Se utilizó IA como apoyo para diseñar la arquitectura de Firestore, definir la estructura de la colección conductores, organizar la separación de servicios y validar el flujo de navegación entre las pantallas de Datos Personales y Vehículo.

### Resultado obtenido
Se configuró Firebase en el proyecto y se creó la colección conductores en Firestore.

Se implementó el servicio firestoreService.js con operaciones CRUD básicas y se logró almacenar correctamente la información de Datos Personales y Vehículo dentro de Firestore.

### Aprendizaje
Se comprendió cómo conectar una aplicación React Native con Firebase Firestore, cómo crear documentos en una colección y cómo estructurar la información utilizando objetos anidados para datos personales y datos del vehículo.

### Próximos pasos
- Mostrar la información del conductor en ProfileScreen.
- Implementar lectura de datos desde Firestore.
- Configurar Firebase Storage.
- Asociar imágenes con registros del conductor.