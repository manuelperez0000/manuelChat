import { createWithEqualityFn } from 'zustand/traditional'

const useZustand = createWithEqualityFn((set) => ({
  users: [],
  setUsers: () => set((newState) => ({ users: newState })),
  chats: [],
  setChats: () => set((newState) => ({ chats: newState })),
}))

export default useZustand