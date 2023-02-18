import React, { useEffect, useState } from 'react'
import { auth, db } from '@/utils/firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { async } from '@firebase/util'
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'


function post() {

    const route = useRouter();

    //Form state
    const [post, setPost] = useState({ description: "" })
    const [user, loading] = useAuthState(auth);

    //Submit Post
    const submitPost = async (e) => {
        e.preventDefault();

        //Validation checks
        if (!post.description) {
            toast.error("Please enter a description", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1000,
            });
            return;
        }
        if (post.description.length > 300) {
            toast.error("Word limit is 300", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
            return;
        }

        const collectionRef = collection(db, 'posts');
        await addDoc(collectionRef, {
            ...post,
            timestamp: serverTimestamp(),
            user: user.uid,
            avatar: user.photoURL,
            username: user.displayName
        });
        setPost({ description: "" })
    };

    const getData = async () => {
        if (!user) return route.push("/auth/Login")
    }

    useEffect(() => {
        getData();
    }, [user])

    return (
        <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
            <form onSubmit={submitPost}>
                <h1 className='text-2xl font-bold '>Create a new Post</h1>
                <div className='py-2'>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'></textarea>
                    <p className={`text-cyan-600 font-medium text-sm ${post.description.length > 300 ? 'text-red-500' : ''}`}>{post.description.length}/300</p>
                </div>
                <button
                    type='submit'
                    className='w-full bg-cyan-600 rounded-lg text-white py-2 font-medium text-sm'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default post