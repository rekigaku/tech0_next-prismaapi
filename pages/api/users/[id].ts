
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

import {
  prismaDeleteUser,
  prismaGetUserById,
  prismaUpdateUser,
} from '../../../lib/prisma/user'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body, query } = req

  //prismaの設定
  const prisma = new PrismaClient();

  // CRUDの関数は全てlib\prisma\users.tsに格納
  switch (method) {
    case 'GET':
      const user = await prismaGetUserById(query.id)
      res.status(200).json(user)
      break

    case 'DELETE':
      const deletedUser = await prismaDeleteUser(query.id)
      res.status(200).json({ message: `UserID ${deletedUser.id} was deleted` })
      break

    case 'PUT':
      const updateUser = await prismaUpdateUser(query.id, body)
      res.status(200).json(updateUser)
      break

    default:
      res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
      res.status(405).end(`${method} method not allowed`)
  }
}