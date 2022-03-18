import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'

// put /api/auth/profile/edit
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  const { name, email, description, location, website } = req.body
  // @ts-ignore id type not exist on next-auth session
  const uid = session?.user.id
  console.log('user id: ', uid)
  try {
    const user = await prisma.user.update({
      where: { id: Number(uid) },
      data: {
        ...req.body,
        name: name,
        email: email,
        description: description,
        location: location,
        website: website,
      },
    })
    res.status(200)
    res.json(user)
  } catch (e) {
    res.status(500)
    res.json({ error: 'Unable to update user information' })
    console.log(e)
  } finally {
    await prisma.$disconnect()
  }
}
