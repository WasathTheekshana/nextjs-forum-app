import React from 'react'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { auth, db } from '@/utils/firebase-config'
import { toast } from 'react-toastify';
import Messege from '@/components/Messege';
import { arrayUnion, doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';

function slug() {

    const router = useRouter();
    const routeData = router.query;
    const [messege, setMessege] = useState('');
    const [allMesseges, setAllMesseges] = useState([]);

    //Submit messege
    const submitMessege = async () => {
        //check if the user is logged
        if (!auth.currentUser) return router.push('/auth/Login');
        if (!messege) {
            toast.error('Do not leave an empty messege', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500
            });
            return;
        }

        const docRef = doc(db, 'posts', routeData.id);
        await updateDoc(docRef, {
            comments: arrayUnion({
                messege,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            })
        });
        setMessege('');
    };

    //Display comments
    const getCommments = async () => {
        const docRef = doc(db, 'posts', routeData.id)
        const docSnap = await getDoc(docRef);
        setAllMesseges(docSnap.data().comments);
    }

    useEffect(() => {
        if (!router.isReady) return;
        getCommments();
    },[])

    return (
        <div>
            <Messege {...routeData}>
            </Messege>
            <div className='my-4'>
                <div className='flex'>
                    <input onChange={(e) => setMessege(e.target.value)}
                        type="text"
                        value={messege}
                        placeholder="Send a messege"
                        className='bg-gray-800 w-full rounded text-sm p-2 '
                    />
                    <button onClick={submitMessege} className='bg-cyan-500 text-white py-2 ml-1 text-sm px-4 rounded'>Submit</button>
                </div>
                <div className='py-6'>
                    <h2>Comments</h2>
                    {allMesseges?.map(messege => (
                        <div>
                            <div>
                                <img src={messege.avatar} />
                                <h2>{messege.userName}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default slug;