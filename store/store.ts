import { atom } from 'jotai'

const musicAtom = atom({
  id: 0,
  title: 'artist',
  content: 'track',
  imageUrl: '',
  fileUrl: '',
})

export default musicAtom
