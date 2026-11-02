/**
 * Servicio de Firestore (NoSQL).
 * Aquí se implementarán después las operaciones CRUD
 * del conductor y del vehículo (sin lógica de viajes).
 */

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from '../config/firebase';

const COLLECTION = 'conductores';

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
 * Obtener conductores
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