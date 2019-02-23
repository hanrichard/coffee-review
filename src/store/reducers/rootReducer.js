
import authReducer from './authReducer'
import shopsReducer from './shopsReducer'
import reviewsReducer from './reviewsReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    reviews: reviewsReducer,
    shops: shopsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer;