import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'

export default function UploadPage(props) {
  let [imageUrl, setImageUrl] = useState<string>()
  let { uploadToS3, files } = useS3Upload()

  let handleFileChange = async (event) => {
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    setImageUrl(url)
  }
  props.img(imageUrl)

  return (
    <div>
      <input onChange={handleFileChange} type="file" />

      <div className="pt-8">
        {files.map((file, index) => (
          <div key={index}>
            File #{index} progress: {file.progress}%
          </div>
        ))}
      </div>
    </div>
  )
}
