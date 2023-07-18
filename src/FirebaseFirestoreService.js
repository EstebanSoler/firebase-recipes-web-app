import firebaseApp from "./FirebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";

const firestoreDb = firebaseApp.firestore;
//const firestoreDb = getFirestore(firebaseApp);

const createDocument = async(collectionName, document) => {
  
  try {
    const docRef = await addDoc(collection(firestoreDb, collectionName), document);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

const readDocument = (collectionName, id) => {
  return getDoc(doc(firestoreDb, collectionName, id));
};

const readDocuments = async ({
  collectionName,
  queries,
  orderByField,
  orderByDirection,
  perPage,
  cursorId,
}) => {
  let collectionRef = collection(firestoreDb, collectionName);
  const queryConstraints = [];

  if (queries && queries.length > 0) {
    for (const query of queries) {
      queryConstraints.push(where(query.field, query.condition, query.value));
    }
  }

  if (orderByField && orderByDirection) {
    queryConstraints.push(orderBy(orderByField, orderByDirection));
  }

  if (perPage) {
    queryConstraints.push(limit(perPage));
  }

  if (cursorId) {
    const document = await readDocument(collection, cursorId);

    queryConstraints.push(startAfter(document));
  }

  const firestoreQuery = query(collectionRef, ...queryConstraints);

  //return documents;
  return await getDocs(firestoreQuery);
}

const updateDocument = (collectionName, id, document) => {
  return updateDoc(doc(firestoreDb, collectionName, id), document);
};

const deleteDocument = (collectionName, id) => {
  return deleteDoc(doc(firestoreDb, collectionName, id));
};


const FirebaseFirestoreService = {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};

export default FirebaseFirestoreService;