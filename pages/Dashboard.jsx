import React, { useEffect, useState } from 'react'
import { auth, db } from '@/utils/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/router';
import { collection, onSnapshot, query, where, orderBy, doc, deleteDoc } from 'firebase/firestore';
import Messege from '@/components/Messege';

function Dashboard() {

  const [user, loading] = useAuthState(auth);
  const [allPosts, setAllPosts] = useState([]);
  const route = useRouter();


  const getData = async () => {
    if (loading) return <h1>Loading</h1>
    if (!user) return route.push("/auth/Login")
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, where("user", "==", user.uid), orderBy("timestamp", "desc"))
    const unsubcribe = onSnapshot(q, (snapshot) => {
      setAllPosts(snapshot.docs.map((doc) => ({ ...doc.data(), doc: doc.id })))
    });
    return unsubcribe;
  }

  useEffect(() => {
    getData()
  }, [user, loading])

  //Delete Post



  return (
    <div>
      <h1>Your Posts</h1>
      {allPosts.map(post =>
        <Messege key={post.id} {...post}>
          <div className='flex gap-3'>
            <p className='cursor-pointer text-red-500 font-medium'>Delete</p>
            <p className='cursor-pointer text-blue-500 font-medium'>Edit</p>
          </div>
        </Messege>)}
    </div>
  )
}

export default Dashboard