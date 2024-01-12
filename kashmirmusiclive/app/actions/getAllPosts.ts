import { db } from "@/firebase/firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { CompletePost } from "../(protected)/admin/components/post-form";

export default async function getAllPosts() {
  try {
    const q = query(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("updatedAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    let fetchedPosts: CompletePost[] = [];

    querySnapshot.forEach((doc) => {
      fetchedPosts.push({
        id: doc.id,
        author: doc.data().author,
        category: doc.data().category,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        date: doc.data().date,
        imageUrl: doc.data().imageUrl,
        published: doc.data().published,
        title: doc.data().title,
        uid: doc.data().uid,
        updatedAt: doc.data().updatedAt,
      });
    });
    return fetchedPosts;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
}
