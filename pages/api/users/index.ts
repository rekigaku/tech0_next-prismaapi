import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';
import { prismaCreateUser, prismaGetUsers } from '../../../lib/prisma/user'

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const { method, body } = req
  
    switch (method) {
      case 'GET':
        const users = await prismaGetUsers()
        res.status(200).json(users)
        break
  
      case 'POST':
        const createdUser = await prismaCreateUser(body)
        res.status(200).json(createdUser)
        break
  
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`${method} method not allowed`)
    }
  }