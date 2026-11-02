/**
 * Configuración de Firebase.
 *
 */
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAjNYb23T4R11gY-anDhbtjAavBgk-yROY',
  authDomain: 'proyectouberconductor.firebaseapp.com',
  projectId: 'proyectouberconductor',
  storageBucket: 'proyectouberconductor.firebasestorage.app',
  messagingSenderId: '722961238638',
  appId: '1:722961238638:web:98a24a5db80f8d295d347f',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;