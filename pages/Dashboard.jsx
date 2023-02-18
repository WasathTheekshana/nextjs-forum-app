import React, { useEffect } from 'react'
import { auth } from '@/utils/firebase-config'
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from 'next/router';
import { async } from '@firebase/util';

function Dashboard() {

  const [user, loading] = useAuthState(auth);
  const route = useRouter();


  const getData = async() => {
    if (loading) return <h1>Loading</h1>
    if (!user) return route.push("/auth/Login")
  }

  useEffect(() => {
    getData()
  },[user, loading])


  return (
    <div>
      <h1>Hi</h1>
    </div>
  )
}

export default Dashboard