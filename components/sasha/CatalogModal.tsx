
"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { MobileDialog, MobileDialogContent, MobileDialogHeader, MobileDialogTitle } from "@/components/ui/mobile-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { db } from "@/lib/firebase";
import { collection, getDocs, addDoc, query, where, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Bouquet {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  isPopular?: boolean;
  isNew?: boolean;
  description: string;
}

interface CatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchTerm?: string;
}

const categories = ["Все", "Розы", "Микс", "Свадебные", "Хризантемы", "Подсолнухи", "Премиум"];

const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  }
  catch(e){
    return false;
  }
}

export function CatalogModal({ isOpen, onClose, initialSearchTerm = "" }: CatalogModalProps) {
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedCategory, setSelectedCategory] = useState("Все");
  const [sortBy, setSortBy] = useState("popular");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialSearchTerm);
      const fetchBouquets = async () => {
        setLoading(true);
        try {
          const bouquetsCollection = collection(db, "bouquets");
          const bouquetsSnapshot = await getDocs(bouquetsCollection);
          const bouquetsList = bouquetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bouquet));
          setBouquets(bouquetsList);
        } catch (error) {
          console.error("Error fetching bouquets: ", error);
        }
        setLoading(false);
      };

      fetchBouquets();
    }
  }, [isOpen, initialSearchTerm]);
  
  const handleAddToCart = async (bouquet: Bouquet) => {
    if (!user) {
      toast({ title: "Ошибка", description: "Пожалуйста, войдите в систему, чтобы добавить товар в корзину." });
      return;
    }
    try {
      const cartCollection = collection(db, "users", user.uid, "cart");
      const q = query(cartCollection, where("bouquetId", "==", bouquet.id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0];
        const newQuantity = existingDoc.data().quantity + 1;
        await updateDoc(doc(db, "users", user.uid, "cart", existingDoc.id), { quantity: newQuantity });
        toast({ title: "Успешно!", description: `Количество "${bouquet.name}" в корзине обновлено.` });
      } else {
        await addDoc(cartCollection, {
          bouquetId: bouquet.id,
          name: bouquet.name,
          image: bouquet.image,
          price: bouquet.price,
          quantity: 1,
          description: bouquet.description,
        });
        toast({ title: "Успешно!", description: `"${bouquet.name}" добавлен в корзину.` });
      }
    } catch (error) {
      console.error("Error adding to cart: ", error);
      toast({ title: "Ошибка", description: "Не удалось добавить товар в корзину." });
    }
  };

  const filteredBouquets = bouquets
    .filter(bouquet => {
      if (!bouquet.image || !isValidUrl(bouquet.image)) {
          return false;
      }
      const matchesSearch = bouquet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Все" || bouquet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
    });

  return (
    <MobileDialog open={isOpen} onOpenChange={onClose}>
      <MobileDialogContent className="max-w-6xl">
        <MobileDialogHeader>
          <MobileDialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">
            🌺 Каталог букетов
          </MobileDialogTitle>
        </MobileDialogHeader>
        
        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          <div className="bg-warm-rose p-3 sm:p-4 rounded-lg">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Поиск букетов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm sm:text-base"
                />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap text-xs sm:text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-card w-full text-sm sm:text-base"
              >
                <option value="popular">По популярности</option>
                <option value="price-asc">По цене (возр)</option>
                <option value="price-desc">По цене (убыв)</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          <div>
             {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Загрузка букетов...</p>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  Найдено букетов: {filteredBouquets.length}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {filteredBouquets.map((bouquet) => (
                    <div key={bouquet.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative">
                        <Image
                          src={bouquet.image}
                          alt={bouquet.name}
                          width={400}
                          height={300}
                          className="w-full h-40 sm:h-48 object-cover"
                        />
                        
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {bouquet.isPopular && (
                            <Badge className="bg-rose-accent text-white">Популярный</Badge>
                          )}
                          {bouquet.isNew && (
                            <Badge className="bg-green-500 text-white">Новинка</Badge>
                          )}
                        </div>
                        
                        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                          <Heart className="h-5 w-5 text-rose-accent" />
                        </button>
                      </div>
                      
                      <div className="p-3 sm:p-4">
                        <h3 className="font-medium text-foreground mb-2 text-sm sm:text-base">{bouquet.name}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 h-8 sm:h-10">{bouquet.description}</p>
                        
                        <div className="flex items-center gap-1 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                                i < bouquet.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                            ({bouquet.reviews})
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-base sm:text-lg font-semibold text-primary">{bouquet.price.toLocaleString()} ₽</span>
                          <Button 
                            size="sm"
                            className="bg-rose-accent hover:bg-rose-dark text-white text-xs sm:text-sm"
                            onClick={() => handleAddToCart(bouquet)}
                          >
                            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">В корзину</span>
                            <span className="sm:hidden">+</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredBouquets.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Букеты не найдены</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Попробуйте изменить фильтры или поисковый запрос.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </MobileDialogContent>
    </MobileDialog>
  );
}
