import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDNu-7AYiYiQQDb_1M7LS3ssEMNaD_9Wfg",
  authDomain: "coffeereview-9b2a0.firebaseapp.com",
  databaseURL: "https://coffeereview-9b2a0.firebaseio.com",
  projectId: "coffeereview-9b2a0",
  storageBucket: "coffeereview-9b2a0.appspot.com",
  messagingSenderId: "216053829039"
  };

  firebase.initializeApp(config);
  firebase.firestore().settings({
      // timestampsInSnapshots: true
  })

  export default firebase;