import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { User } from '@prisma/client'
import UserCard from '../components/UserCard'
import RegisterForm from '../components/RegisterForm'

export default function Home() {
  const [users, setUsers] = useState<Pick<User, 'id' | 'email' | 'name'>[]>([])

  useEffect(() => {
    ;(async () => {
      const res = await fetch('/api/users')
      const users = await res.json()
      setUsers(users)
      console.log(users)
    })()
  }, [])

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl font-black font-sans p-4 mt-6">
          Register Form
        </h2>
        <RegisterForm />
        <h2 className="text-4xl font-black font-sans p-4 mt-6">User Lists</h2>
        <div className="flex flex-wrap w-full justify-center items-center gap-3">
          {users &&
            users.map((user) => (
              <UserCard key={user.id} user={user} isDetailds={false} />
            ))}
        </div>
      </div>
    </Layout>
  )
}