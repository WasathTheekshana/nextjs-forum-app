import React from 'react'
import { auth } from '@/utils/firebase-config'
import {useAuthState} from "react-firebase-hooks/auth"

function Dashboard() {

    const [user, loading] = useAuthState(auth);



  return (
    <div>
        <h1>Hi {user.displayName}</h1>
    </div>
  )
}

export default Dashboard