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

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    // .then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   // ...
    // }).catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // The email of the user's account used.
    //   const email = error.email;
    //   // The AuthCredential type that was used.
    //   const credential = GoogleAuthProvider.credentialFromError(error);
    //   // ...
    // })
};
