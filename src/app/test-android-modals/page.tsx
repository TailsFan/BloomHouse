"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CatalogModal } from "@/components/sasha/CatalogModal"
import { GiftsModal } from "@/components/sasha/GiftsModal"
import { CareModal } from "@/components/sasha/CareModal"
import { AboutModal } from "@/components/sasha/AboutModal"
import { useAndroidWebView } from "@/hooks/use-android-webview"

export default function TestAndroidModalsPage() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [giftsOpen, setGiftsOpen] = useState(false)
  const [careOpen, setCareOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const isAndroidWebView = useAndroidWebView()

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Тестирование модальных окон для Android WebView</h1>
        
        <div className="mb-6 p-4 bg-blue-100 rounded-lg">
          <p className="text-sm">
            <strong>Платформа:</strong> {isAndroidWebView ? "Android WebView" : "Обычный браузер"}
          </p>
          <p className="text-sm mt-1">
            <strong>User Agent:</strong> {typeof window !== 'undefined' ? navigator.userAgent : 'N/A'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button 
            onClick={() => setCatalogOpen(true)}
            className="h-16 text-lg"
          >
            🌺 Каталог букетов
          </Button>
          
          <Button 
            onClick={() => setGiftsOpen(true)}
            className="h-16 text-lg"
          >
            🧸 Подарки
          </Button>
          
          <Button 
            onClick={() => setCareOpen(true)}
            className="h-16 text-lg"
          >
            💚 Уход за букетами
          </Button>
          
          <Button 
            onClick={() => setAboutOpen(true)}
            className="h-16 text-lg"
          >
            🌸 О компании
          </Button>
        </div>
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h3 className="font-medium mb-2">Инструкции для тестирования:</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Откройте эту страницу в Android Studio WebView</li>
            <li>• Нажмите на любую кнопку выше, чтобы открыть модальное окно</li>
            <li>• Проверьте, что модальное окно отображается полностью, без обрезания</li>
            <li>• Попробуйте прокрутить содержимое модального окна</li>
            <li>• Убедитесь, что кнопка закрытия работает корректно</li>
          </ul>
        </div>
      </div>

      {/* Modals */}
      <CatalogModal isOpen={catalogOpen} onClose={() => setCatalogOpen(false)} />
      <GiftsModal isOpen={giftsOpen} onClose={() => setGiftsOpen(false)} />
      <CareModal isOpen={careOpen} onClose={() => setCareOpen(false)} />
      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  )
}
