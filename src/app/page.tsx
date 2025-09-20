
"use client";

import { useState, useRef } from "react";
import { Header } from "@/components/sasha/Header";
import { Hero } from "@/components/sasha/Hero";
import { FeaturedSection } from "@/components/sasha/FeaturedSection";
import { NewArrivals } from "@/components/sasha/NewArrivals";
import { PromotionsSection } from "@/components/sasha/PromotionsSection";
import { Footer } from "@/components/sasha/Footer";
import { GiftsModal } from "@/components/sasha/GiftsModal";
import { CareModal } from "@/components/sasha/CareModal";
import { AboutModal } from "@/components/sasha/AboutModal";
import { CreateBouquetModal } from "@/components/sasha/CreateBouquetModal";
import { CatalogModal } from "@/components/sasha/CatalogModal";
import { CartModal } from "@/components/sasha/CartModal";
import { FavoritesModal } from "@/components/sasha/FavoritesModal";
import { LoginModal } from "@/components/sasha/LoginModal";

export default function App() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [initialSearchTerm, setInitialSearchTerm] = useState("");
  const featuredRef = useRef<HTMLDivElement>(null);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => {
    setOpenModal(null);
    // Сброс поиска при закрытии модального окна, чтобы он не сохранялся при следующем открытии
    if (openModal === 'catalog') {
        setInitialSearchTerm("");
    }
  }

  const handleSearch = (term: string) => {
    setInitialSearchTerm(term);
    setOpenModal('catalog');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onNavigate={scrollToFeatured}
        onOpenModal={setOpenModal}
        onSearch={handleSearch}
      />
      <main>
        <Hero onOpenModal={setOpenModal} />
        <div ref={featuredRef}>
          <FeaturedSection onOpenModal={setOpenModal} />
        </div>
        <NewArrivals />
        <PromotionsSection />
      </main>
      <Footer />

      {/* Modals */}
      <GiftsModal isOpen={openModal === 'gifts'} onClose={closeModal} />
      <CareModal isOpen={openModal === 'care'} onClose={closeModal} />
      <AboutModal isOpen={openModal === 'about'} onClose={closeModal} />
      <CreateBouquetModal isOpen={openModal === 'create'} onClose={closeModal} />
      <CatalogModal isOpen={openModal === 'catalog'} onClose={closeModal} initialSearchTerm={initialSearchTerm} />
      <CartModal isOpen={openModal === 'cart'} onClose={closeModal} />
      <FavoritesModal isOpen={openModal === 'favorites'} onClose={closeModal} />
      <LoginModal isOpen={openModal === 'login'} onClose={closeModal} />
    </div>
  );
}
