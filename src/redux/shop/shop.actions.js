import ShopActionTypes from "./shop.types";
import { collection, onSnapshot } from 'firebase/firestore';//

import { firestore,
  convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';//

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = collection(firestore, 'collections');
    dispatch(fetchCollectionsStart());

    onSnapshot(
      collectionRef,
      async snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        dispatch(fetchCollectionsSuccess(collectionsMap));
      },
      error => dispatch(fetchCollectionsFailure(error.message))
    );
  }
}
