"use client"

import { useEffect, useState } from 'react'

export function useAndroidWebView() {
  const [isAndroidWebView, setIsAndroidWebView] = useState(false)

  useEffect(() => {
    // Проверяем, запущено ли приложение в Android WebView
    const userAgent = navigator.userAgent.toLowerCase()
    const isAndroid = userAgent.includes('android')
    const isWebView = userAgent.includes('wv') || // Android WebView
                     userAgent.includes('version/') && userAgent.includes('chrome') && !userAgent.includes('edg') // Chrome WebView
    
    setIsAndroidWebView(isAndroid && isWebView)
  }, [])

  return isAndroidWebView
}
