import 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/database';

import { firebaseConfig } from '../constants/defaultValues';

firebase.initializeApp(firebaseConfig);

export default firebase;
