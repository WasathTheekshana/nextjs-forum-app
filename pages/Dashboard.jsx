import React, { useEffect } from 'react'
import { auth } from '@/utils/firebase-config'
import {useAuthState} from "react-firebase-hooks/auth"

function Dashboard() {

    const [user, loading] = useAuthState(auth);

    const data = user ? user.displayName : "Guest";


  return (
    <div>
        <h1>Hi{data}</h1>
    </div>
  )
}

export default Dashboard