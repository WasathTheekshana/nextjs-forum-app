import React, { useEffect, useState } from 'react'
import { auth, db } from '@/utils/firebase-config'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'


function post() {
    return (
        <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
            <form>
                <h1 className='text-2xl font-bold '>Create a new Post</h1>
                <div className='py-2'>
                    <h3 className='text-lg font-medium py-2'>Description</h3>
                    <textarea className='bg-gray-800 h-48 w-full text-white rounded-lg p-2 text-sm'></textarea>
                    <p>0/300</p>
                </div>
                <button className='w-full bg-cyan-600 rounded-lg text-white py-2 font-medium text-sm'>Submit</button>
            </form>
        </div>
    )
}

export default post