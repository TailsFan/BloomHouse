
"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { ShoppingCart, Search, Heart, Menu, LogOut, X, Flower2, UserCog, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";


interface HeaderProps {
  onNavigate: () => void;
  onOpenModal: (modal: string) => void;
  onSearch: (term: string) => void;
}

export function Header({ onNavigate, onOpenModal, onSearch }: HeaderProps) {
  const { user, appUser } = useAuth();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (user) {
      const favoritesCol = collection(db, "users", user.uid, "favorites");
      const cartCol = collection(db, "users", user.uid, "cart");

      const unsubFavorites = onSnapshot(favoritesCol, (snapshot) => {
        setFavoritesCount(snapshot.size);
      });
      const unsubCart = onSnapshot(cartCol, (snapshot) => {
        setCartCount(snapshot.docs.reduce((acc, doc) => acc + doc.data().quantity, 0));
      });

      return () => {
        unsubFavorites();
        unsubCart();
      };
    } else {
      setFavoritesCount(0);
      setCartCount(0);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const navLinks = (
    <>
      <SheetClose asChild>
        <Button onClick={onNavigate} variant="ghost" className="justify-start">Букеты</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button onClick={() => onOpenModal('gifts')} variant="ghost" className="justify-start">Подарки</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button onClick={() => onOpenModal('care')} variant="ghost" className="justify-start">Уход</Button>
      </SheetClose>
      <SheetClose asChild>
        <Button onClick={() => onOpenModal('about')} variant="ghost" className="justify-start">О нас</Button>
      </SheetClose>
    </>
  );

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose to-sage-green rounded-full flex items-center justify-center">
              <Flower2 className="text-white h-5 w-5" />
            </div>
            <h1 className="text-2xl font-semibold text-primary">BloomHouse</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={onNavigate} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Букеты</button>
            <button onClick={() => onOpenModal('gifts')} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Подарки</button>
            <button onClick={() => onOpenModal('care')} className="text-sm font-medium text-foreground hover:text-primary transition-colors">Уход</button>
            <button onClick={() => onOpenModal('about')} className="text-sm font-medium text-foreground hover:text-primary transition-colors">О нас</button>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-xs mx-8">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Поиск букетов..."
                className="pl-10 bg-input border-border focus:border-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-accent"
              onClick={() => onOpenModal('favorites')}
            >
              <Heart className="h-5 w-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{favoritesCount}</span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-accent"
              onClick={() => onOpenModal('cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
              )}
            </Button>
            
            {user ? (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
                        <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName ?? 'Пользователь'}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {appUser && (appUser.role === 'admin' || appUser.role === 'manager') && (
                      <DropdownMenuItem asChild>
                        <Link href="/manager">
                          <Wrench className="mr-2 h-4 w-4" />
                          <span>Панель менеджера</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    {appUser && appUser.role === 'admin' && (
                       <DropdownMenuItem asChild>
                        <Link href="/admin">
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Панель админа</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Выйти</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button onClick={() => onOpenModal('login')} variant="outline" className="hidden sm:inline-flex border-rose-accent text-rose-accent hover:bg-rose hover:text-rose-accent">
                Войти
              </Button>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Открыть меню</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Меню</SheetTitle>
                  </SheetHeader>
                  <div className="p-4">
                    <div className="flex flex-col space-y-4">
                      {navLinks}
                    </div>
                    <Separator className="my-6" />
                     {user ? (
                        <div className="flex flex-col space-y-2">
                           <div className="flex items-center gap-2">
                             <Avatar className="h-8 w-8">
                               <AvatarImage src={user.photoURL ?? ""} alt={user.displayName ?? ""} />
                               <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                             </Avatar>
                             <div>
                               <p className="text-sm font-medium">{user.displayName ?? 'Пользователь'}</p>
                               <p className="text-xs text-muted-foreground">{user.email}</p>
                             </div>
                           </div>
                           {appUser && (appUser.role === 'admin' || appUser.role === 'manager') && (
                              <SheetClose asChild>
                                <Link href="/manager" className="w-full">
                                  <Button variant="outline" className="w-full justify-start">
                                    <Wrench className="mr-2 h-4 w-4" />Панель менеджера
                                  </Button>
                                </Link>
                              </SheetClose>
                            )}
                            {appUser && appUser.role === 'admin' && (
                              <SheetClose asChild>
                                <Link href="/admin" className="w-full">
                                  <Button variant="outline" className="w-full justify-start">
                                    <UserCog className="mr-2 h-4 w-4" />Панель админа
                                  </Button>
                                </Link>
                              </SheetClose>
                            )}
                           <Button onClick={() => { handleLogout(); }} variant="outline" size="sm">
                              <LogOut className="mr-2 h-4 w-4" /> Выйти
                           </Button>
                        </div>
                      ) : (
                        <SheetClose asChild>
                           <Button onClick={() => onOpenModal('login')} className="w-full bg-rose-accent hover:bg-rose-dark text-white">
                            Войти
                          </Button>
                        </SheetClose>
                      )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-4">
           <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Поиск букетов..."
              className="pl-10 bg-input border-border focus:border-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
}
