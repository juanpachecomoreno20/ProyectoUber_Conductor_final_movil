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


## 09/11/2026

### Actividad realizada
Implementación de la persistencia del módulo de documentos del conductor mediante Firebase Firestore y optimización de la arquitectura de acceso a datos utilizando AppContext.

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
Se utilizó IA únicamente como apoyo para revisar la arquitectura de la aplicación, proponer mejoras de rendimiento, estructurar el uso de AppContext, corregir errores relacionados con la gestión de imágenes y definir la integración de documentos con Firestore. La implementación final, validación funcional y pruebas fueron realizadas manualmente por el desarrollador.

### Prompt utilizado
"Integrar DocumentScreen con Firebase Firestore utilizando el conductor cargado en AppContext. Guardar la información de licencia, SOAT, revisión técnico mecánica, correo de pagos y aceptación de términos dentro del documento del conductor existente, manteniendo las validaciones actuales y la arquitectura del proyecto."

### Resultado obtenido
Se logró almacenar correctamente la información documental del conductor dentro del documento correspondiente en Firestore, reutilizando AppContext para acceder al conductor activo sin necesidad de consultas repetidas a la base de datos.

### Mejoras realizadas
- Integración de DocumentScreen con Firestore.
- Uso de updateDriver() para actualizar el conductor existente.
- Creación del objeto documentos dentro de Firestore.
- Almacenamiento de información documental en el mismo registro del conductor.
- Persistencia de licencia, SOAT y técnico mecánica.
- Persistencia de correo Mercado Pago.
- Persistencia de aceptación de términos.
- Corrección del flujo de carga de imágenes mediante Expo Image Picker.
- Implementación de AppContext para compartir información del conductor entre pantallas.
- Eliminación de dependencias innecesarias de ProfileScreen hacia Firestore.
- Optimización de acceso al conductor mediante estado global compartido.

### Resultado de pruebas
- Registro del conductor almacenado correctamente en Firestore.
- Obtención del driverId desde AppContext.
- Guardado exitoso de documentos.
- Verificación manual del objeto documentos en Firestore.
- Correcto almacenamiento de imágenes, fechas, número de licencia y datos de pago.

### Commit asociado
feat: integrar documentos del conductor con firestore

### Aprendizaje
Se fortalecieron conocimientos sobre gestión centralizada de estado mediante Context API, actualización parcial de documentos en Firestore, reutilización de datos compartidos entre pantallas y persistencia de información documental en aplicaciones móviles con React Native y Firebase.

## 10/11/2026

### Actividad realizada
Implementación de persistencia de documentos del conductor en Firebase Firestore y optimización de la arquitectura mediante Context API para compartir la información del conductor entre pantallas.

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Expo Image Picker
- Firebase
- Firestore
- Context API
- GitHub

### Uso de IA
Se utilizó IA únicamente como apoyo para revisar la arquitectura de la aplicación, optimizar la carga de información del conductor, integrar AppContext, corregir errores durante la persistencia de documentos y proponer mejoras de rendimiento. La implementación final, validación funcional y pruebas fueron realizadas manualmente por el desarrollador.

### Prompt utilizado
"Integrar DocumentScreen con Firestore utilizando AppContext para acceder al conductor activo. Guardar la información documental dentro del mismo documento del conductor y optimizar ProfileScreen para utilizar datos compartidos desde contexto en lugar de consultar Firestore repetidamente."

### Resultado obtenido
Se logró almacenar correctamente la información documental dentro del documento del conductor en Firestore. Además, se implementó AppContext para compartir la información cargada del conductor entre las diferentes pantallas de la aplicación, reduciendo consultas innecesarias a la base de datos.

### Mejoras realizadas
- Implementación de AppContext para gestionar el conductor activo.
- Carga global del conductor desde Firestore al iniciar la aplicación.
- Disponibilidad de `driver` y `driver.id` en todas las pantallas.
- Integración de DocumentScreen con Firestore.
- Uso de `updateDriver()` para actualizar el conductor existente.
- Persistencia de licencia, SOAT y revisión técnico mecánica.
- Persistencia de fechas de vencimiento.
- Persistencia de correo Mercado Pago.
- Persistencia de aceptación de términos.
- Corrección de errores de carga de imágenes.
- Corrección de errores de navegación y contexto.
- Incorporación de estado documental en ProfileScreen.
- Optimización de ProfileScreen para reutilizar información compartida desde AppContext.

### Resultado de pruebas
- Registro de conductor almacenado correctamente en Firestore.
- Obtención correcta del conductor mediante AppContext.
- Visualización correcta del `driver.id`.
- Guardado exitoso de documentos.
- Verificación manual del objeto `documentos` dentro de Firestore.
- Visualización correcta del estado documental desde Perfil.

### Commit asociado
feat: integrar documentos firestore y optimizar contexto global

### Aprendizaje
Se fortalecieron conocimientos sobre Context API, centralización de estado global, actualización parcial de documentos en Firestore, reutilización de información compartida entre pantallas y optimización de consultas a bases de datos en aplicaciones React Native.

## 10/11/2026

### Actividad realizada
Implementación del contexto global de viajes (TripContext) para conectar el flujo completo entre Solicitud Entrante, Viaje en Curso, Resumen del Viaje, Ganancias e Historial.

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Context API
- GitHub

### Uso de IA
Se utilizó IA únicamente como apoyo para estructurar el contexto global de viajes, conectar las pantallas existentes, reemplazar datos simulados y validar el flujo completo del conductor. La implementación final, adaptación al proyecto, corrección de errores, pruebas funcionales y validaciones fueron realizadas manualmente por el desarrollador.

### Prompt utilizado
"Implementar TripContext para eliminar datos simulados de RequestScreen, TripScreen, SummaryScreen, EarningsScreen e HistoryScreen. Gestionar activeTrip y tripHistory, registrar viajes completados y utilizar los datos reales para alimentar Ganancias e Historial."

### Resultado obtenido
Se logró implementar un contexto global de viajes que permite gestionar el viaje activo y el historial de viajes realizados. Las pantallas de Ganancias e Historial ahora consumen información generada por el flujo real de viajes en lugar de utilizar datos simulados.

### Mejoras realizadas
- Creación de TripContext.
- Gestión global de activeTrip.
- Gestión global de tripHistory.
- Integración de RequestScreen con TripContext.
- Integración de TripScreen con TripContext.
- Integración de SummaryScreen con TripContext.
- Registro automático del viaje al confirmar el cobro.
- Limpieza automática del viaje activo después del pago.
- Integración de EarningsScreen con tripHistory.
- Cálculo dinámico de métricas mediante useMemo.
- Integración de HistoryScreen con tripHistory.
- Eliminación de datos simulados en Ganancias.
- Validación del flujo:
  Request → Trip → Summary → Earnings → History.
- Corrección de navegación posterior al cobro.
- Corrección de duplicados en historial mediante validación de identificadores únicos.

### Resultado de pruebas
- Creación correcta del viaje activo desde RequestScreen.
- Cambio correcto de estados del viaje.
- Registro correcto del viaje al confirmar el cobro.
- Visualización correcta del historial.
- Sincronización correcta entre Historial y Ganancias.
- Incremento automático de métricas al completar nuevos viajes.
- Navegación estable durante todo el flujo.

### Commit asociado
feat: implementar trip context y flujo real de viajes

### Aprendizaje
Se fortalecieron conocimientos sobre Context API, manejo de estado compartido entre múltiples pantallas, diseño de flujos de negocio completos, eliminación de datos simulados y cálculo dinámico de indicadores a partir de información generada por la aplicación.

## 10/11/2026

### Actividad realizada
Implementación del contexto global de viajes (TripContext) para conectar el flujo completo entre Solicitud Entrante, Viaje en Curso, Resumen del Viaje, Ganancias e Historial.

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Context API
- GitHub

### Uso de IA
Se utilizó IA únicamente como apoyo para estructurar la gestión de viajes mediante Context API, conectar pantallas existentes, eliminar datos simulados y validar el flujo completo del conductor. La implementación final, integración, corrección de errores y pruebas funcionales fueron realizadas manualmente por el desarrollador.

### Prompt utilizado
"Implementar TripContext para gestionar activeTrip y tripHistory, reemplazando los datos simulados en las pantallas de viajes, ganancias e historial y conectando el flujo completo del conductor."

### Resultado obtenido
Se logró conectar las pantallas RequestScreen, TripScreen, SummaryScreen, EarningsScreen e HistoryScreen mediante un contexto global de viajes. Los viajes realizados se registran dinámicamente y alimentan automáticamente las pantallas de Ganancias e Historial.

### Mejoras realizadas
- Creación de TripContext.
- Gestión global de activeTrip.
- Gestión global de tripHistory.
- Integración de RequestScreen con TripContext.
- Integración de TripScreen con estados del viaje.
- Integración de SummaryScreen con registro automático de viajes.
- Integración de EarningsScreen con métricas dinámicas.
- Integración de HistoryScreen con viajes generados por la aplicación.
- Implementación de cálculos con useMemo.
- Corrección de navegación posterior al cobro.
- Corrección de duplicados en historial.
- Corrección del flujo Home → Solicitud → Viaje → Resumen → Ganancias → Historial.

### Resultado de pruebas
- Solicitud creada correctamente.
- Viaje aceptado correctamente.
- Cambio de estados validado.
- Cobro confirmado correctamente.
- Viaje agregado al historial.
- Historial y Ganancias muestran la misma cantidad de viajes.
- Navegación estable durante todo el flujo.

### Commit asociado
feat: implementar trip context y flujo real de viajes

### Aprendizaje
Se fortalecieron conocimientos sobre Context API, gestión de estados compartidos, sincronización entre pantallas, eliminación de datos simulados y construcción de un flujo funcional completo para aplicaciones de transporte.


## 10/11/2026

### Actividad realizada
Implementación de la lógica de cálculo de tarifas del proyecto y conexión del flujo de viajes con el contexto global de viajes (TripContext).

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Context API
- GitHub

### Uso de IA
Se utilizó IA únicamente como apoyo para integrar la lógica de cálculo de tarifas, estructurar TripContext y conectar los datos generados por los viajes con las pantallas de Resumen, Ganancias e Historial. La implementación final, validación funcional y pruebas fueron realizadas manualmente por el desarrollador.

### Prompt utilizado
"Integrar pricing.js y calculateFare.js dentro del flujo actual de viajes. Reemplazar valores hardcodeados de tarifas, comisiones y ganancias por cálculos dinámicos y conectar los viajes realizados con EarningsScreen e HistoryScreen."

### Resultado obtenido
Las tarifas, comisiones y ganancias ahora se calculan mediante una función centralizada. Además, los viajes completados alimentan dinámicamente las pantallas de Ganancias e Historial utilizando TripContext.

### Mejoras realizadas
- Integración de pricing.js.
- Integración de calculateFare().
- Eliminación de valores hardcodeados de tarifas.
- Integración de TripContext con RequestScreen.
- Integración de TripContext con TripScreen.
- Integración de TripContext con SummaryScreen.
- Registro de viajes completados dentro de tripHistory.
- Integración de métricas dinámicas en EarningsScreen.
- Integración de HistoryScreen con viajes generados por la aplicación.
- Corrección de duplicados en historial.
- Corrección de navegación posterior a la confirmación del cobro.

### Resultado de pruebas
- Flujo Solicitud → Viaje → Resumen funcionando.
- Generación correcta de tarifas, comisiones y ganancias.
- Registro automático de viajes completados.
- Historial mostrando viajes generados durante la ejecución.
- Ganancias mostrando información basada en los viajes realizados.

### Commit asociado
feat: integrar calculo de tarifas y flujo dinamico de viajes

### Aprendizaje
Se fortalecieron conocimientos sobre centralización de reglas de negocio, cálculo dinámico de tarifas, manejo de estados compartidos mediante contexto y reutilización de información entre múltiples pantallas de la aplicación.


## 10/11/2026

### Actividad realizada
Implementación de sincronización en tiempo real de viajes mediante Firestore y optimización de las métricas de Ganancias.

### Herramientas utilizadas
- Visual Studio Code
- Cursor IDE
- Microsoft Copilot
- Expo
- React Native
- Firebase
- Firestore
- Context API
- GitHub

### Uso de IA
Se utilizó IA únicamente como apoyo para integrar Firestore en tiempo real mediante onSnapshot y ajustar el cálculo de métricas financieras del conductor. La implementación final y las pruebas funcionales fueron realizadas manualmente.

### Resultado obtenido
Historial y Ganancias ahora se sincronizan automáticamente con la colección trips de Firestore sin necesidad de reiniciar la aplicación.

### Mejoras realizadas
- Integración de onSnapshot en TripContext.
- Sincronización automática de HistoryScreen.
- Sincronización automática de EarningsScreen.
- Corrección del saldo del conductor.
- Actualización automática de métricas financieras.

### Commit asociado
feat: integrar firestore tiempo real para viajes y ganancias