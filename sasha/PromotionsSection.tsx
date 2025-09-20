
"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Tag, Clock } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface Bouquet {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating?: number;
  reviews: number;
  description: string;
}

export function PromotionsSection() {
  const [products, setProducts] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPromotionalProducts = async () => {
      setLoading(true);
      try {
        const bouquetsCollection = collection(db, "bouquets");
        const q = query(
          bouquetsCollection,
          where("category", "==", "Розы"),
          limit(2)
        );
        const querySnapshot = await getDocs(q);
        const promoList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const originalPrice = data.price;
          const discountedPrice = Math.round(originalPrice * 0.8);
          return {
            id: doc.id,
            ...data,
            price: discountedPrice,
            originalPrice: originalPrice,
            discount: "20%",
          } as Bouquet;
        });
        setProducts(promoList);
      } catch (error) {
        console.error("Error fetching promotional products:", error);
      }
      setLoading(false);
    };

    fetchPromotionalProducts();
  }, []);

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        {/* Main Promotion Banner */}
        <div className="bg-gradient-to-r from-rose/20 to-sage-green/20 rounded-2xl p-8 mb-12 border border-rose/30">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Tag className="text-rose-accent mr-2" />
                <span className="bg-rose-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                  Акция недели
                </span>
              </div>
              <h2 className="text-3xl font-semibold text-foreground mb-4">
                Скидка 20% на все букеты роз
              </h2>
              <p className="text-muted-foreground mb-6">
                Только до конца недели! Создайте незабываемые моменты с нашими 
                роскошными букетами из премиальных роз.
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  До конца акции: 3 дня 14 часов
                </div>
              </div>
              <Button size="lg" className="bg-rose-accent hover:bg-rose-dark text-white">
                Выбрать букет роз
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            {/* Promotional Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {loading
                ? Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="space-y-2">
                      <Skeleton className="h-64 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))
                : products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      title={product.name}
                      image={product.image}
                      price={product.price.toString()}
                      originalPrice={product.originalPrice?.toString()}
                      discount={product.discount}
                      rating={product.rating}
                      reviewsCount={product.reviews}
                      description={product.description}
                    />
                  ))}
            </div>
          </div>
        </div>

        {/* Additional Promotions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-sage-green/10 rounded-xl p-6 border border-sage-green/20">
            <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🚚</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Бесплатная доставка</h3>
            <p className="text-sm text-muted-foreground mb-4">
              При заказе от 3000 рублей доставляем бесплатно в пределах МКАД
            </p>
            <Button variant="outline" size="sm" className="border-sage-green text-sage-green hover:bg-sage-green hover:text-white">
              Подробнее
            </Button>
          </div>

          <div className="bg-rose/10 rounded-xl p-6 border border-rose/20">
            <div className="w-12 h-12 bg-rose/30 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Программа лояльности</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Копите баллы с каждой покупки и получайте скидки до 15%
            </p>
            <Button variant="outline" size="sm" className="border-rose-accent text-rose-accent hover:bg-rose-accent hover:text-white">
              Участвовать
            </Button>
          </div>

          <div className="bg-warm-rose/30 rounded-xl p-6 border border-rose-light/40">
            <div className="w-12 h-12 bg-rose-light/40 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="font-semibold text-foreground mb-2">Подписка на цветы</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Регулярная доставка свежих букетов со скидкой 10%
            </p>
            <Button variant="outline" size="sm" className="border-rose-dark text-rose-dark hover:bg-rose-dark hover:text-white">
              Оформить
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
