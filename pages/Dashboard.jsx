import React, { useEffect, useState } from 'react'
import { auth, db } from '@/utils/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/router';
import { collection, onSnapshot, query, where, orderBy, doc, deleteDoc } from 'firebase/firestore';
import Messege from '@/components/Messege';
import Link from 'next/link';

function Dashboard() {

  const [user, loading] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const route = useRouter();


  const getData = async () => {
    if (loading) return <h1>Loading</h1>
    if (!user) return route.push("/auth/Login")
    const collectionRef = collection(db, 'posts');
    const q = query(collectionRef, where("user", "==", user.uid))
    const unsubcribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    });
    return unsubcribe;
  }

  useEffect(() => {
    getData()
  }, [user, loading])

  //Delete Post
  const deletePost = async (id) => {
    const userDoc = doc(db, "posts", id);
    await deleteDoc(userDoc);
  }



  return (
    <div>
      <h1>Your Posts</h1>
      {posts.map((post) => (
        <React.Fragment key={post.id}>
          <Messege {...post}>
            <div className='flex flex-row gap-3'>
              <button onClick={() => deletePost(post.id)} className='cursor-pointer text-red-500 font-medium'>Delete</button>
              <Link href={{pathname: "/Post", query: post}}>
                <button className='cursor-pointer text-blue-500 font-medium'>Edit</button>
              </Link>
            </ div>
          </Messege>
        </React.Fragment>
      ))
      }
    </div >
  )
}

export default Dashboard