import { atom } from 'jotai'

const musicAtom = atom({
  id: 0,
  title: 'artist',
  content: 'track',
  imageUrl: '',
  fileUrl: '',
})

export const staticMusicAtom = atom(null, (_get, set) => set(musicAtom))

export default musicAtom
