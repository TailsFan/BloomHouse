
"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface Bouquet {
  id: string;
  name: string;
  image: string;
  price: number;
  isNew?: boolean;
  rating?: number;
  reviews: number;
  description: string;
}

export function NewArrivals() {
  const [products, setProducts] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewProducts = async () => {
      setLoading(true);
      try {
        const bouquetsCollection = collection(db, "bouquets");
        const q = query(bouquetsCollection, where("isNew", "==", true), limit(3));
        const querySnapshot = await getDocs(q);
        const newList = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Bouquet)
        );
        setProducts(newList);
      } catch (error) {
        console.error("Error fetching new products:", error);
      }
      setLoading(false);
    };

    fetchNewProducts();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-accent to-warm-rose">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-rose-accent mr-2" />
            <span className="text-rose-accent font-medium">Новинки</span>
          </div>
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Свежие поступления
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Новые уникальные композиции и сезонные букеты. 
            Будьте первыми, кто оценит наши последние творения
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           {loading
            ? Array.from({ length: 3 }).map((_, index) => (
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
                  isNew={product.isNew}
                  rating={product.rating}
                  reviewsCount={product.reviews}
                  description={product.description}
                />
              ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button size="lg" className="bg-rose-accent hover:bg-rose-dark text-white">
            Посмотреть все новинки
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
