import firebase, { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs, addDoc, doc, deleteDoc, where, updateDoc, setDoc, getDoc, query } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAs4dCBMDRELYLfBDJGzuS8AsRaW2Q-VeE",
  authDomain: "product-a4847.firebaseapp.com",
  databaseURL: "https://product-a4847-default-rtdb.firebaseio.com",
  projectId: "product-a4847",
  storageBucket: "product-a4847.appspot.com",
  messagingSenderId: "1049837412997",
  appId: "1:1049837412997:web:eacbb02e9359c44d7a3fec",
  measurementId: "G-624NFS3T1L"
};

export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

/**
 * Lấy dữ liệu Firestore
 * @param {string} href - not null - Đường dẫn tới colection
 * @param {string} properties - thuộc tính của dữ liệu
 * @param {string} value - giá trị của thuộc tính để so sánh
 */
export const getData = async (href, properties, value) => {
  const docRef =
    properties
      ? query(collection(db, href), where(properties, "==", value))
      : query(collection(db, href))
  const q = query(docRef);
  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data()
      };
    });
  } catch (error) {
    console.error("error on firebase.js/getData()", error);
    throw error;
  }
};
/**
 * Lấy dữ liệu Firestore với id
 * @param {string} href - not null - Đường dẫn tới colection
 * @param {string} id - ID tài liệu
 */
export const getById = async (href, id) => {
  const documentRef = doc(db, href, id);
  try {
    const documentSnapshot = await getDoc(documentRef);
    const documentData = documentSnapshot.data();
    console.log(documentData)
    return documentData
  } catch (error) {
    console.error('error by getByid()', error)
    return null
  }
};

/**
 * Thêm dữ liệu vào Firestore
 * @param {string} href - not null - Đường dẫn tới colection
 * @param {object} newData - Dữ liệu mới cần thêm
 * @param {string} id - ID tùy chỉnh cho tài liệu
 */
export const addData = async (href, newData, id) => {
  try {
    const docRef = collection(db, href);
    if (id && id !== '') {
      const newDocRef = doc(docRef, id)
      await setDoc(newDocRef, newData)
    } else {
      await addDoc(docRef, newData);
    }
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
/**
 * xóa dữ liệu trong Firestore
 * @param {string} href - not null - Đường dẫn tới colection
 * @param {string} id - not null - ID tùy chỉnh cho tài liệu
 */
export const deleteData = async (href, id) => {
  const docRef = doc(db, href, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
/**
 * update dữ liệu Firestore
 * @param {string} href - not null - Đường dẫn tới colection
 * @param {string} id - not null - ID tùy chỉnh cho tài liệu
 * @param {object} data - not null - Dữ liệu cần update
 */
export const updateData = async (href, id, data) => {
  const docRef = doc(db, href, id);
  try {
    await updateDoc(docRef, data);
    console.log("update");
  } catch (error) {
    console.error("Error update document: ", error);
    throw error;
  }
};
