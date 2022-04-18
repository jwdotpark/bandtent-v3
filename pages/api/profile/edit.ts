// @ts-nocheck
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next'

// put /api/auth/profile/edit
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (session && req.method === 'PUT') {
    const { name, email, description, location, website } = req.body

    const uid = session?.user.id
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
      // console.log(user)
    } catch (e) {
      res.status(500)
      res.json({ error: 'Unable to perform the action' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.status(500)
    res.json({ error: 'Unable to perform the action' })
  }
}
