// Using emoji icons instead of lucide-react
// import { ShoppingCart, Search, Heart, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onNavigate: () => void;
  onOpenModal: (modal: string) => void;
}

export function Header({ onNavigate, onOpenModal }: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose to-sage-green rounded-full flex items-center justify-center">
              <span className="text-white font-semibold">🌸</span>
            </div>
            <h1 className="text-2xl font-semibold text-primary">BloomHouse</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={onNavigate} className="text-foreground hover:text-primary transition-colors">Букеты</button>
            <button onClick={() => onOpenModal('gifts')} className="text-foreground hover:text-primary transition-colors">Подарки</button>
            <button onClick={() => onOpenModal('care')} className="text-foreground hover:text-primary transition-colors">Уход</button>
            <button onClick={() => onOpenModal('about')} className="text-foreground hover:text-primary transition-colors">О нас</button>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
              <Input 
                placeholder="Поиск букетов..." 
                className="pl-10 bg-input-background border-border focus:border-primary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-accent"
              onClick={() => onOpenModal('favorites')}
            >
              <span className="text-lg">❤️</span>
              <span className="absolute -top-1 -right-1 bg-rose-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-accent"
              onClick={() => onOpenModal('cart')}
            >
              <span className="text-lg">🛒</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <span className="text-lg">☰</span>
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">🔍</span>
            <Input 
              placeholder="Поиск букетов..." 
              className="pl-10 bg-input-background border-border focus:border-primary"
            />
          </div>
        </div>
      </div>
    </header>
  );
}