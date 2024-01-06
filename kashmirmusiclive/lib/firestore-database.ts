import { db } from "@/firebase/firebase-config";
import {
  doc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const usersCollection = collection(db, "users");

// update the user document with a timestamp based on your system time
const updateUserTimestamp = async (userId: string) => {
  const userDoc = doc(usersCollection, userId);
  const timestampUpdate = { lastLogin: serverTimestamp() };

  try {
    await updateDoc(userDoc, timestampUpdate);
  } catch (error) {
    console.error("Error updating document with timestamp: ", error);
  }
};

export { updateUserTimestamp };
