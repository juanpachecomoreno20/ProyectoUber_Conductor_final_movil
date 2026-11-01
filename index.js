/**
 * index.js
 *
 * Registro del componente raíz para Expo (Expo Go o build nativo).
 * No define pantallas ni navegación; eso vive en App.js y src/.
 */
import { registerRootComponent } from 'expo';

import App from './App';

registerRootComponent(App);
