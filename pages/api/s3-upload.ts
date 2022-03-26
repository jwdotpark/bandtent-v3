// pages/api/s3-upload.js
import { APIRoute } from 'next-s3-upload'

export default APIRoute.configure({
  key(req, filename) {
    return `bandtent-v3/uploads/path/${filename.toUpperCase()}`
  },
})

