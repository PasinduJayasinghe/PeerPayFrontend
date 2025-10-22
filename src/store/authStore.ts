import { create } from 'zustand'
import type { User, UserType } from '../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  userRole: UserType | null
  setUser: (user: User | null) => void
  setAuth: (token: string, user: User, role: UserType) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('authToken') || null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  userRole: (localStorage.getItem('userRole') as UserType) || null,
  
  setUser: (user) => set({ user }),
  
  setAuth: (token, user, role) => {
    localStorage.setItem('authToken', token)
    localStorage.setItem('userRole', role)
    set({
      token,
      user,
      userRole: role,
      isAuthenticated: true,
    })
  },
  
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    set({
      user: null,
      token: null,
      userRole: null,
      isAuthenticated: false,
    })
  },
}))