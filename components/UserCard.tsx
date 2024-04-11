import { Card } from 'flowbite-react'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { User } from '@prisma/client'
import { FC } from 'react'
import Link from 'next/link'

interface Props {
  user: Pick<User, 'id' | 'email' | 'name'>
  isDetailds: boolean
}

const UserCard: FC<Props> = ({ user, isDetailds }) => {
  return (
    <div className="w-60">
      <Card>
        <div className="flex flex-col items-center pb-10">
          <CheckBadgeIcon className="mb-3 h-24 w-24 rounded-full shadow-lg" />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </span>
          {!isDetailds && (
            <div className="mt-4 flex space-x-3 lg:mt-6">
              <Link
                href={`/users/${user.id}`}
                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                User Details
              </Link>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default UserCard