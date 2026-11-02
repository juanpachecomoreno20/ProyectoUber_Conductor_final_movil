/**
 * Firestore Service
 *
 * Maneja las operaciones CRUD de la colección conductores.
 *
 * Colección:
 * conductores
 */
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
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
``