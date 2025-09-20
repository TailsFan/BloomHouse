import { useState, useRef } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FeaturedSection } from "./components/FeaturedSection";
import { NewArrivals } from "./components/NewArrivals";
import { PromotionsSection } from "./components/PromotionsSection";
import { Footer } from "./components/Footer";
import { GiftsModal } from "./components/GiftsModal";
import { CareModal } from "./components/CareModal";
import { AboutModal } from "./components/AboutModal";
import { CreateBouquetModal } from "./components/CreateBouquetModal";
import { CatalogModal } from "./components/CatalogModal";
import { CartModal } from "./components/CartModal";
import { FavoritesModal } from "./components/FavoritesModal";

export default function App() {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const featuredRef = useRef<HTMLDivElement>(null);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => setOpenModal(null);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onNavigate={scrollToFeatured}
        onOpenModal={setOpenModal}
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
      <CatalogModal isOpen={openModal === 'catalog'} onClose={closeModal} />
      <CartModal isOpen={openModal === 'cart'} onClose={closeModal} />
      <FavoritesModal isOpen={openModal === 'favorites'} onClose={closeModal} />
    </div>
  );
}