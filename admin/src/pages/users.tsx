import axios from 'axios'
import { useEffect, useState } from 'react'
import type { UserLoginResponse } from '../auth/types'
import { CREATE_ADMIN, GET_ALL_USERS, VERIFY_USER } from '../api/constants'
import { UserCard } from '../components/user-component'

export const UserPage = () => {
  const [users, setUsers] = useState<UserLoginResponse[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${GET_ALL_USERS}`,
          { withCredentials: true }
        )
        setUsers(response?.data?.data || [])
      } catch (err) {
        console.error("Failed to fetch users:", err)
      }
    }

    fetchUsers()
  }, [])

  const onAssignAdmin = async (id: string) => {
    console.log("Assign admin to:", id)
    // Your update logic here

      await axios.put(`${import.meta.env.BASE_URL}${CREATE_ADMIN}/${id}`, {}, {
        withCredentials :true
      })
  }

  const onVerifyUser = async (id: string) => {
    console.log("Verify user:", id)
    await axios.put(`${import.meta.env.BASE_URL}${VERIFY_USER}/${id}`,{}, {
      withCredentials : true
    }); 
  }

  return (
    <div className="p-6 flex flex-wrap gap-4">
      {users.map((user : UserLoginResponse) => (
        
        <UserCard
          user={user}
          onAssignAdmin={onAssignAdmin}
          onVerifyUser={onVerifyUser}
        />
      ))}
    </div>
  )
}
