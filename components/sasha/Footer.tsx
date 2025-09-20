"use client";

import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-rose to-sage-green rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">🌸</span>
              </div>
              <h3 className="text-xl font-semibold">BloomHouse</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Создаём уникальные цветочные композиции с 2018 года. 
              Каждый букет — это произведение искусства, созданное с любовью.
            </p>
            <div className="flex space-x-3">
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Каталог</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Букеты роз</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Свадебные букеты</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Цветы в коробках</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Композиции</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Подарочные наборы</a>
              <a href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Комнатные растения</a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Phone className="text-sm mt-1 text-rose-accent flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-white">+7 (495) 123-45-67</div>
                  <div className="text-gray-300">Круглосуточно</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="text-sm mt-1 text-rose-accent flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-white">info@bloomhouse.ru</div>
                  <div className="text-gray-300">Ответим в течение часа</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-sm mt-1 text-rose-accent flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-white">ул. Цветочная, 15</div>
                  <div className="text-gray-300">Москва, 123456</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="text-sm mt-1 text-sage-green flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-white">Работаем 24/7</div>
                  <div className="text-gray-300">Доставка и самовывоз</div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium">Новости и акции</h4>
            <p className="text-gray-300 text-sm">
              Подпишитесь на рассылку и получайте уведомления о новых букетах и специальных предложениях
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Ваш email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-sage-green"
              />
              <Button className="w-full bg-rose-accent hover:bg-rose-dark text-white">
                Подписаться
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-300">
              © 2024 BloomHouse. Все права защищены.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Условия использования</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Доставка и оплата</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
