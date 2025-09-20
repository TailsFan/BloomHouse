
"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, CreditCard, MapPin, Clock, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, deleteDoc, writeBatch } from "firebase/firestore";

interface CartItem {
  id: string; // Firestore document ID
  bouquetId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (isOpen && user) {
      const fetchCartItems = async () => {
        setLoading(true);
        try {
          const cartCollection = collection(db, "users", user.uid, "cart");
          const cartSnapshot = await getDocs(cartCollection);
          const cartList = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem));
          setCartItems(cartList);
        } catch (error) {
          console.error("Error fetching cart items: ", error);
        }
        setLoading(false);
      };

      fetchCartItems();
    } else if (!user) {
        setCartItems([]);
    }
  }, [isOpen, user]);

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (!user) return;
    if (newQuantity <= 0) {
      await removeItem(id);
    } else {
      try {
        const itemRef = doc(db, "users", user.uid, "cart", id);
        await updateDoc(itemRef, { quantity: newQuantity });
        setCartItems(items =>
          items.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
          )
        );
      } catch (error) {
        console.error("Error updating quantity: ", error);
      }
    }
  };

  const removeItem = async (id: string) => {
    if (!user) return;
     try {
        await deleteDoc(doc(db, "users", user.uid, "cart", id));
        setCartItems(items => items.filter(item => item.id !== id));
    } catch (error) {
        console.error("Error removing item from cart: ", error);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 3000 ? 0 : 300;
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!user) return;
    
    try {
      const cartCollectionRef = collection(db, "users", user.uid, "cart");
      const cartSnapshot = await getDocs(cartCollectionRef);
      
      const batch = writeBatch(db);
      cartSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      setCartItems([]);
      alert("Заказ оформлен! В ближайшее время с вами свяжется наш менеджер.");
      onClose();
    } catch (error) {
      console.error("Error clearing cart: ", error);
      alert("Произошла ошибка при оформлении заказа.");
    }
  };

  if (!user) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
              <ShoppingCart /> Корзина
            </DialogTitle>
          </DialogHeader>
           <div className="text-center py-8">
            <h3 className="text-lg font-medium text-foreground mb-2">Войдите, чтобы посмотреть корзину</h3>
            <p className="text-muted-foreground mb-6">
             Войдите в свой аккаунт, чтобы добавлять товары в корзину.
            </p>
            <Button onClick={onClose} className="bg-rose-accent hover:bg-rose-dark text-white">
              Войти
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (loading) {
    return (
       <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
           <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
              <ShoppingCart /> Корзина
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Загрузка корзины...</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
              <ShoppingCart /> Корзина
            </DialogTitle>
          </DialogHeader>
          
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-lg font-medium text-foreground mb-2">Корзина пуста</h3>
            <p className="text-muted-foreground mb-6">
              Добавьте букеты в корзину, чтобы оформить заказ
            </p>
            <Button onClick={onClose} className="bg-rose-accent hover:bg-rose-dark text-white">
              Перейти к покупкам
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-primary flex items-center gap-2">
            <ShoppingCart /> Корзина ({cartItems.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{item.name}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-primary">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-warm-rose p-6 rounded-lg sticky top-4 space-y-6">
              <h3 className="text-lg font-medium text-foreground">Оформление заказа</h3>
              
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <MapPin className="h-4 w-4" />
                  Адрес доставки
                </label>
                <Input
                  placeholder="Введите адрес доставки"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  Время доставки
                </label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-card"
                >
                  <option value="asap">Как можно скорее</option>
                  <option value="today">Сегодня до 18:00</option>
                  <option value="tomorrow">Завтра утром</option>
                  <option value="specific">Выбрать время</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <CreditCard className="h-4 w-4" />
                  Способ оплаты
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary"
                    />
                    <span className="text-sm">Картой онлайн</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-primary"
                    />
                    <span className="text-sm">Наличными при доставке</span>
                  </label>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Товары:</span>
                  <span>{subtotal.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Доставка:</span>
                  <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                    {deliveryFee === 0 ? "Бесплатно" : `${deliveryFee} ₽`}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-xs text-green-600">
                    🎉 Бесплатная доставка от 3000 ₽
                  </p>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Итого:</span>
                  <span className="text-primary">{total.toLocaleString()} ₽</span>
                </div>
              </div>

              <Button 
                className="w-full bg-rose-accent hover:bg-rose-dark text-white"
                onClick={handleCheckout}
                disabled={!deliveryAddress}
              >
                Оформить заказ
              </Button>

              <div className="text-xs text-muted-foreground">
                <p>💳 Безопасная оплата</p>
                <p>🚚 Доставка за 2 часа</p>
                <p>🌸 Гарантия свежести</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
