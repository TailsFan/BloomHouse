"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CatalogModal } from "@/components/sasha/CatalogModal"
import { GiftsModal } from "@/components/sasha/GiftsModal"
import { CareModal } from "@/components/sasha/CareModal"
import { AboutModal } from "@/components/sasha/AboutModal"

export default function TestModalsPage() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [giftsOpen, setGiftsOpen] = useState(false)
  const [careOpen, setCareOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Тестирование модальных окон</h1>
        
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
          <h2 className="text-xl font-semibold mb-2">Инструкции для тестирования:</h2>
          <ul className="space-y-2 text-sm">
            <li>• Откройте модальные окна на мобильном устройстве</li>
            <li>• Проверьте, что заголовок и кнопка закрытия видны</li>
            <li>• Убедитесь, что контент не обрезается сверху</li>
            <li>• Проверьте прокрутку на длинном контенте</li>
            <li>• Протестируйте в Android Studio WebView</li>
          </ul>
        </div>
      </div>

      <CatalogModal 
        isOpen={catalogOpen} 
        onClose={() => setCatalogOpen(false)} 
      />
      
      <GiftsModal 
        isOpen={giftsOpen} 
        onClose={() => setGiftsOpen(false)} 
      />
      
      <CareModal 
        isOpen={careOpen} 
        onClose={() => setCareOpen(false)} 
      />
      
      <AboutModal 
        isOpen={aboutOpen} 
        onClose={() => setAboutOpen(false)} 
      />
    </div>
  )
}
