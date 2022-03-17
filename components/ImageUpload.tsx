import { useS3Upload } from 'next-s3-upload'
import { useState } from 'react'

export default function UploadPage(props) {
  let { uploadToS3, files } = useS3Upload()
  let [imageUrl, setImageUrl] = useState()

  let handleFileChange = async (event) => {
    let file = event.target.files[0]
    let { url } = await uploadToS3(file)
    // @ts-ignore
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
      {imageUrl && <img src={imageUrl} />}
    </div>
  )
}
