import React, { useEffect } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../firebase";

function Admin() {
  useEffect(
    () =>
      onSnapshot(collection(db, "posts"), (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(data);
      }),
    []
  );

  return <div>Admin</div>;
}

export default Admin;
