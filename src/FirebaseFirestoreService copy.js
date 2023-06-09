import firebaseApp from "./FirebaseConfig";
import { getFirestore, collection, addDoc, getDocs, query, where } from "firebase/firestore";

const firestoreDb = getFirestore(firebaseApp);

const createDocument = async(collectionName, document) => {
  
  try {
    const docRef = await addDoc(collection(firestoreDb, collectionName), document);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}

const readDocuments = async ({collectionName, queries}) => {
  let collectionRef = collection(firestoreDb, collectionName);
  const queryConstraints = [];

  if (queries && queries.length > 0) {
    for (const query of queries) {
      queryConstraints.push(where(query.field, query.condition, query.value));
    }
  }

  const firestoreQuery = query(collectionRef, ...queryConstraints);

  //return documents;
  return await getDocs(firestoreQuery);
}

/*const readDocuments = async ({collectionName, queries}) => {
  let collectionRef = collection(firestoreDb, collectionName);
  
  const documents = await getDocs(collection(firestoreDb, collectionName));
  console.log('DOCS', documents.docs);
  const array = [];
  documents.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    array[doc.id] = doc.data();
  });

  console.log('PPP', array);
  const jsonString = JSON.stringify(Object.assign({}, array))
  console.log(jsonString);

  return documents;

}*/


const FirebaseFirestoreService = {
  createDocument,
  readDocuments,
};

export default FirebaseFirestoreService;