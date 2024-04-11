import { PrismaClient } from '@prisma/client';
import { User } from '@prisma/client'

const prisma = new PrismaClient();

export const prismaGetUsers = async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    return users
  }
  
export const prismaCreateUser = async (
    body: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    return createdUser
}
  
export const prismaGetUserById = async (id: string | string[] | undefined) => {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        posts: true,
      },
    })
    return user
}
  
export const prismaDeleteUser = async (id: string | string[] | undefined) => {
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
      },
    })
    return deletedUser
}
  
export const prismaUpdateUser = async (
    id: string | string[] | undefined,
    body: Pick<User, 'email' | 'name'>
  ) => {
    const updateUser = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: body.email,
        name: body.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
},
    })
    return updateUser
}