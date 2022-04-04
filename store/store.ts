import { atom } from 'jotai'

const musicAtom = atom({
  id: 0,
  title: '',
  content: '',
  imageUrl: '',
  fileUrl: '',
})

export default musicAtom
