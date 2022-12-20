import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, onValue } from "firebase/database";
import { fbUserState, fbCareersState, fbWorksState } from './store';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzgY8QZOs4LJLDZUFFzRLkFtVhL658Bdg",
  authDomain: "shuichi-negishi.firebaseapp.com",
  databaseURL: "https://shuichi-negishi.firebaseio.com",
  projectId: "shuichi-negishi",
  storageBucket: "shuichi-negishi.appspot.com",
  messagingSenderId: "468457502353",
  appId: "1:468457502353:web:865a8a45948f9570e7b130"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function initialize () {
  auth.onAuthStateChanged(currentUser => {
    if (currentUser && currentUser.emailVerified) {
      fbUserState.set(currentUser);
      const db = getDatabase();
      const careersRef = ref(db, 'careers/');
      const worksRef = ref(db, 'works/');
      onValue(careersRef, (snapshot) => {
        const data = snapshot.val();
        fbCareersState.set(data);
      });
      onValue(worksRef, (snapshot) => {
        const data = snapshot.val();
        fbWorksState.set(data);
      });
    } else {
      console.log('logout');
    }
  });
}

export default {
  initialize,
  auth
}