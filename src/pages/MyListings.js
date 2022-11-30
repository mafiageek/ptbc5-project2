import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  // doc,
  // deleteDoc,
  // query,
} from "firebase/firestore";
import { db } from "../firebase";

export default function MyListings(props) {
  const [posts, setPosts] = useState([]);

  // const handleDelete = async (id) => {
  //   const docRef = doc(db, "posts", id);
  //   await deleteDoc(docRef);
  // };

  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPosts(data.filter((post) => post.uid === props.user.uid));
        console.log(data);
      }),
    [props.user.uid]
  );

  console.log(posts);

  return <div>MyListings</div>;
}
