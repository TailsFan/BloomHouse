"use client"

import { useEffect, useState } from 'react'

export function useMobileDialog() {
  const [isMobile, setIsMobile] = useState(false)
  const [isAndroidWebView, setIsAndroidWebView] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isAndroid = /android/i.test(userAgent)
      const isWebView = /wv|WebView/i.test(userAgent)
      
      setIsMobile(isMobileDevice)
      setIsAndroidWebView(isAndroid && isWebView)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return { isMobile, isAndroidWebView }
}
