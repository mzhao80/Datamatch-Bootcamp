import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/database";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from "react-redux-firebase";
import { composeWithDevTools } from "redux-devtools-extension";

const firebaseConfig = {
  apiKey: "AIzaSyCu24LaNl5-G-Ig1Ugnh2mcHdjCJb-T-i0",
  authDomain: "datamatch-bootcamp-861d4.firebaseapp.com",
  databaseURL: "https://datamatch-bootcamp-861d4-default-rtdb.firebaseio.com",
  projectId: "datamatch-bootcamp-861d4",
  storageBucket: "datamatch-bootcamp-861d4.appspot.com",
  messagingSenderId: "73532113327",
  appId: "1:73532113327:web:9a51990f36c7d30439af5a",
  measurementId: "G-YQJTZ7ZJSQ",
};

firebase.initializeApp(firebaseConfig);

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools());

const rrfConfig = {
  userProfile: "users",
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  // createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
