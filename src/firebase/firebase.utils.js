import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  writeBatch
  } from 'firebase/firestore';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBi0-D2ITIrH2BhVcBJ7yqP5c1MxCeD46I",
  authDomain: "ecommerceapp-e9938.firebaseapp.com",
  projectId: "ecommerceapp-e9938",
  storageBucket: "ecommerceapp-e9938.appspot.com",
  messagingSenderId: "326751075936",
  appId: "1:326751075936:web:9f24bb51171fd137a30d05",
  measurementId: "G-BFFK2DCJ6J"
});

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(firestore, `users/${userAuth.uid}`);

  const { displayName, email } = userAuth;
  const createdAt = new Date();

  try {
    await setDoc(userRef, {
      displayName,
      email,
      createdAt,
      ...additionalData,
    })
  } catch(error) {
    console.log('error creating user', error);
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey);
  console.log('collectionRef', collectionRef);

  const batch = writeBatch(firestore);

  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef);
    console.log('newDocRef', newDocRef);
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      doc: doc.id,
      title,
      items,
    }
  });

  return transformedCollection.reduce((acc, collection) => {
    acc[collection.title.toLowerCase()] = collection;
    
    return acc;
  }, {});
}

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider);
};
