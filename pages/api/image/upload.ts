import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getSession } from 'next-auth/react'
import aws from 'aws-sdk'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  aws.config.update({
    region: 'eu-west-2',
    accessKeyId: process.env.AWS_ACCESS_KEYY,
    secretAccessKey: process.env.AWS_SECRETT,
  })

  const s3Bucket = process.env.AWS_BUCKET

  const s3 = new aws.S3() // Create a new instance of S3
  const fileName = req.body.fileName
  const fileType = req.body.fileType

  console.log(fileName)
  console.log(fileType)

  const s3Params = {
    Bucket: s3Bucket,
    Key: `businesslogos/${fileName}`,
    ContentType: fileType,
    ACL: 'public-read',
  }

  try {
    s3.getSignedUrl('putObject', s3Params, async (err, data) => {
      if (err) {
        return res.json({ success: false, error: err })
      }
      const returnData = {
        signedRequest: data,
        url: `https://${s3Bucket}.s3.amazonaws.com/businesslogos/${fileName}`,
      }
      const imageUrl = await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          image: returnData.url,
        },
      })

      return res.status(200).json(returnData)
    })
  } catch (err) {
    return res.status(500).json(err)
  }
}
