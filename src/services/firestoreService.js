/**
 * Firestore Service
 *
 * Maneja las operaciones CRUD de las colecciones conductores y viajes.
 */
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../config/firebase';

const COLLECTION = 'conductores';
const TRIPS_COLLECTION = 'trips';

/**
 * Crear conductor
 */
export const createDriver = async (driverData) => {
  return await addDoc(
    collection(db, COLLECTION),
    {
      ...driverData,
      createdAt: serverTimestamp(),
    }
  );
};

/**
 * Obtener conductores por id
 */
export const getDrivers = async () => {
  const querySnapshot = await getDocs(
    collection(db, COLLECTION)
  );

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

/**
 * Actualizar conductor
 */
export const updateDriver = async (
  id,
  data
) => {
  const documentRef = doc(
    db,
    COLLECTION,
    id
  );

  await updateDoc(
    documentRef,
    data
  );
};

/**
 * Eliminar conductor
 */
export const deleteDriver = async (
  id,
) => {
  const documentRef = doc(
    db,
    COLLECTION,
    id
  );

  await deleteDoc(
    documentRef,
  );
};

export const getDriverById = async (id) => {
  const documentRef = doc(
    db,
    COLLECTION,
    id
  );

  const documentSnapshot =
    await getDoc(documentRef);

  if (!documentSnapshot.exists()) {
    return null;
  }

  return {
    id: documentSnapshot.id,
    ...documentSnapshot.data(),
  };
};

export const createTrip = async (tripData) => {
  const timestamp = new Date().toISOString();

  return await addDoc(
    collection(db, TRIPS_COLLECTION),
    {
      ...tripData,
      createdAt: tripData.createdAt || timestamp,
      completedAt: tripData.completedAt || timestamp,
    }
  );
};

export const getTrips = async () => {
  const querySnapshot = await getDocs(
    collection(db, TRIPS_COLLECTION)
  );

  return querySnapshot.docs.map((document) => ({
    id: document.id,
    ...document.data(),
  }));
};

export const subscribeToTrips = (callback) => {
  return onSnapshot(
    collection(db, TRIPS_COLLECTION),
    (querySnapshot) => {
      const trips = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));

      callback(trips);
    },
    (error) => {
      console.log('Error en onSnapshot trips:', error);
    }
  );
};
``