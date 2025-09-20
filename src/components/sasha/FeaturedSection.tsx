
"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

interface Bouquet {
  id: string;
  name: string;
  image: string;
  price: number;
  isPopular?: boolean;
  rating?: number;
  reviews: number;
  description: string;
}

interface FeaturedSectionProps {
  onOpenModal: (modal: string) => void;
}

export function FeaturedSection({ onOpenModal }: FeaturedSectionProps) {
  const [products, setProducts] = useState<Bouquet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      setLoading(true);
      try {
        const bouquetsCollection = collection(db, "bouquets");
        const q = query(
          bouquetsCollection,
          where("isPopular", "==", true),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const featuredList = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Bouquet)
        );
        setProducts(featuredList);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-foreground mb-2">
              Популярные букеты
            </h2>
            <p className="text-muted-foreground">
              Самые любимые композиции наших клиентов
            </p>
          </div>
          <Button
            variant="outline"
            className="hidden md:flex items-center border-2 border-rose-accent text-rose-accent hover:bg-rose hover:text-rose-accent"
            onClick={() => onOpenModal("catalog")}
          >
            Все букеты
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
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
                  isPopular={product.isPopular}
                  rating={product.rating}
                  reviewsCount={product.reviews}
                  description={product.description}
                />
              ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center mt-8 md:hidden">
          <Button
            variant="outline"
            className="border-2 border-rose-accent text-rose-accent hover:bg-rose hover:text-rose-accent"
            onClick={() => onOpenModal("catalog")}
          >
            Все букеты
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
