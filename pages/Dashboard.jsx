import React, { useEffect, useState } from 'react'
import { auth, db } from '@/utils/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/router';
import { async } from '@firebase/util';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import Messege from '@/components/Messege';

function Dashboard() {

  const [user, loading] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);
  const route = useRouter();


  const getData = async () => {
    if (loading) return <h1>Loading</h1>
    if (!user) return route.push("/auth/Login")
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, where("user", "==", user.uid))
    const unsubcribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), doc: doc.id })))
    });
    return unsubcribe;
  }

  useEffect(() => {
    getData()
  }, [user, loading])



  return (
    <div>
      <h1>Your Posts</h1>
      {allPosts.map(post => <Messege {...post} />)}
    </div>
  )
}

export default Dashboard