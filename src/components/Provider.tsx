"use client"

import { useRouter } from 'next/router';
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import api from '@/lib/api';

const Provider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refresh')
    try {
      const res = await api.post('api/token/refresh/', {
        refresh: refreshToken,
      });
      if (res.status == 200) {
        localStorage.setItem('access', res.data.access)
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false)
      }

    } catch (error) {
      console.log(error)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const token = localStorage.getItem('access')
    if (!token) {
      setIsAuthorized(false);
      return
    }
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now()

    if (tokenExpiration < now) {
      await refreshToken()
    } else {
      setIsAuthorized(true)
    }

  }

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  return isAuthorized ? children : router.push('/login')


}

export default Provider