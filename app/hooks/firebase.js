import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env'

const app = initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
})

const auth = getAuth(app)
const db = getFirestore()

export { auth, db, onAuthStateChanged }