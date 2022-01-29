import { takeLatest, call, put } from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { collection, query, getDocs } from 'firebase/firestore';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  try {
    const q = query(collection(firestore, 'collections'));
    const snapshot = yield getDocs(q);
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch(error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
