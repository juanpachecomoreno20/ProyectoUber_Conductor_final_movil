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

## 02/11/2026

### Actividad realizada
Mejoras visuales de la pantalla Perfil.

### Herramientas utilizadas
- Visual Studio Code 
- Cursor IDE
- Microsoft Copilot
- React Native
- Firebase Firestore

### Uso de IA
Se utilizó IA para proponer mejoras visuales y reutilización de componentes previamente desarrollados.

### Resultado obtenido
La pantalla Perfil fue conectada a Firestore y se mejoró visualmente utilizando componentes reutilizables e iconografía con Ionicons.

### Mejoras realizadas
- Reutilización de SectionTitle.
- Integración de Ionicons.
- Organización de información personal y del vehículo.
- Visualización del estado "Pendiente de aprobación".
- Lectura de datos reales desde Firestore.

### Aprendizaje
Se comprendió cómo reutilizar componentes y cómo consumir información almacenada en Firebase Firestore para construir pantallas dinámicas.

## 02/11/2026

### Actividad realizada
Integración completa entre Registro, Vehículo, Firestore y Perfil.

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Firebase
- Firestore
- GitHub

### Uso de IA
Se utilizó IA como apoyo para la arquitectura del proyecto, conexión con Firestore, organización de componentes reutilizables y mejoras visuales de la pantalla Perfil.

### Resultado obtenido
Se logró almacenar información del conductor en Firebase Firestore y mostrarla posteriormente en la pantalla Perfil.

### Mejoras realizadas
- Integración entre RegisterScreen y VehicleScreen.
- Persistencia de datos en Firestore.
- Implementación de createDriver() y getDrivers().
- Lectura de información desde Firestore.
- Construcción de ProfileScreen dinámico.
- Visualización de información personal y del vehículo.
- Integración de iconografía con Ionicons.
- Implementación de foto ampliable en Perfil.
- Estado visual "Pendiente de aprobación".
- Acceso a Registro desde Perfil cuando no existen conductores registrados.

### Aprendizaje
Se comprendió el flujo completo de captura, almacenamiento y lectura de datos utilizando React Native y Firebase Firestore.

## 08/11/2026

### Actividad realizada
Implementación de la pantalla Inicio del conductor con geolocalización en tiempo real, mapa interactivo y construcción del flujo inicial de viajes mediante Solicitud Entrante y Viaje en Curso.

### Herramientas utilizadas
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Expo Location
- React Native Maps
- Firebase
- Firestore
- GitHub

### Uso de IA
Se utilizó IA como apoyo para la implementación del hook personalizado useDriverLocation, integración de geolocalización con Expo Location, visualización de mapas con React Native Maps, mejoras visuales de HomeScreen y construcción del flujo de navegación Home → Solicitud → Viaje.

### Resultado obtenido
Se logró mostrar la ubicación real del conductor mediante GPS, visualizarla en un mapa interactivo y construir el flujo principal entre Inicio, Solicitud Entrante y Viaje en Curso.

### Mejoras realizadas
Mejoras realizadas
Creación del hook personalizado useDriverLocation.
Solicitud y gestión de permisos de ubicación.
Obtención de coordenadas GPS en tiempo real.
Integración de React Native Maps.
Visualización de marcador en la ubicación actual.
Implementación del estado Disponible / No disponible.
Aplicación de función de limpieza (cleanup) en useEffect.
Rediseño visual de HomeScreen.
Creación de RequestScreen.
Implementación de temporizador de 15 segundos para solicitudes.
Creación de TripScreen.
Implementación de estados "Conductor en camino" y "Viaje en progreso".
Navegación Home → Solicitud → Viaje.

Aprendizaje
Se fortalecieron conocimientos sobre geolocalización en React Native, uso de hooks personalizados, integración de mapas interactivos, gestión de permisos del dispositivo y construcción de flujos de navegación similares a plataformas de transporte como Uber o InDrive.


## 08/11/2026

### Actividad realizada
Implementación y fortalecimiento del módulo de documentos del conductor, incorporando validaciones completas para la documentación obligatoria exigida por la aplicación y reorganización de accesos secundarios del sistema mediante el menú principal.

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Firebase
- Firestore
- GitHub

### Uso de IA
Se utilizó IA únicamente como apoyo para revisar la estructura del formulario, proponer validaciones, organizar componentes reutilizables y sugerir mejoras de experiencia de usuario. La integración final, adaptación al proyecto, validación funcional y pruebas fueron realizadas manualmente por el desarrollador.

### Prompt utilizado
"Completar la pantalla DocumentScreen reutilizando los componentes existentes del proyecto. Agregar validaciones para licencia, SOAT, revisión técnico mecánica, correo Mercado Pago y aceptación de términos, mostrando los errores debajo de cada campo y manteniendo la identidad visual actual de la aplicación."

### Resultado obtenido
Se completó la pantalla de Documentos permitiendo registrar la información obligatoria del conductor, validar los campos requeridos y controlar errores antes de permitir el almacenamiento de la información.

### Mejoras realizadas
- Creación de la pantalla DocumentScreen.
- Integración de ProfileImagePicker para documentos.
- Integración de CustomInput para captura de información.
- Registro de número de licencia.
- Registro de vencimiento de licencia.
- Registro de vencimiento de SOAT.
- Registro de vencimiento de revisión técnico mecánica.
- Registro de correo asociado a Mercado Pago.
- Implementación de validación para imágenes obligatorias.
- Implementación de validación para número de licencia.
- Implementación de validación para fechas obligatorias.
- Implementación de validación para correo electrónico.
- Implementación de validación de aceptación de términos.
- Visualización de mensajes de error debajo de cada campo.
- Limpieza automática de errores cuando el usuario corrige la información.
- Reorganización del acceso a Documentos desde el menú principal de la aplicación.

### Aprendizaje
Se fortalecieron conocimientos sobre validación de formularios en React Native, manejo de estados de error, retroalimentación visual para el usuario, reutilización de componentes y organización modular de pantallas dentro de una aplicación móvil de transporte.

## 09/11/2026

### Actividad realizada
Implementación y fortalecimiento del módulo de documentos del conductor, incorporando captura de información obligatoria, gestión de imágenes de documentos y validaciones completas del formulario.

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Expo Image Picker
- Firebase
- Firestore
- GitHub

### Uso de IA
Se utilizó IA únicamente como apoyo para revisar la estructura del formulario, proponer validaciones, corregir errores relacionados con la selección de imágenes, organizar componentes reutilizables y mejorar la experiencia de usuario. La integración final, adaptación al proyecto, validación funcional y pruebas fueron realizadas manualmente por el desarrollador.

### Prompt utilizado
"Completar la pantalla DocumentScreen reutilizando los componentes existentes del proyecto. Agregar validaciones para licencia, SOAT, revisión técnico mecánica, correo Mercado Pago y aceptación de términos, mostrando los errores debajo de cada campo y manteniendo la identidad visual actual de la aplicación."

### Resultado obtenido
Se completó el módulo de documentos permitiendo registrar la información obligatoria del conductor, cargar imágenes desde la galería, validar todos los campos requeridos y controlar errores antes del almacenamiento de la información.

### Mejoras realizadas
- Creación de DocumentScreen.
- Integración de ProfileImagePicker para documentos.
- Implementación de carga de imágenes desde la galería.
- Registro de número de licencia.
- Registro de vencimiento de licencia.
- Registro de vencimiento de SOAT.
- Registro de vencimiento de revisión técnico mecánica.
- Registro de correo asociado a Mercado Pago.
- Implementación de validaciones para imágenes obligatorias.
- Implementación de validaciones para fechas obligatorias.
- Implementación de validación de correo electrónico.
- Implementación de validación de aceptación de términos.
- Visualización de mensajes de error debajo de cada campo.
- Limpieza automática de errores cuando el usuario corrige la información.
- Corrección del flujo de selección de imágenes mediante Expo Image Picker.
- Integración de acceso a Documentos desde el menú principal HomeMenu.

### Commit asociado
feat: implementar modulo de documentos con validaciones

### Aprendizaje
Se fortalecieron conocimientos sobre validación de formularios en React Native, manejo de estados de error, selección de imágenes con Expo Image Picker, reutilización de componentes y organización modular de funcionalidades dentro de una aplicación móvil de transporte.