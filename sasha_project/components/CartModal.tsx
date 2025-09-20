import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from './figma/ImageWithFallback';
// Using emoji icons instead of lucide-react
// import { Minus, Plus, Trash2, CreditCard, MapPin, Clock } from "lucide-react";
import { Separator } from "./ui/separator";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Мок данные корзины
const initialCartItems = [
  {
    id: 1,
    name: "Классический букет красных роз",
    image: "https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldCUyMHJvc2VzfGVufDF8fHx8MTc1NzE2MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 3450,
    quantity: 1,
    description: "15 красных роз в элегантной упаковке"
  },
  {
    id: 2,
    name: "Романтичные розовые розы",
    image: "https://images.unsplash.com/photo-1695050193946-3a3bde70c2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0JTIwcm9tYW50aWN8ZW58MXx8fHwxNzU3MTYwODMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 4100,
    quantity: 2,
    description: "21 розовая роза с зеленью и упаковкой"
  },
  {
    id: 3,
    name: "Плюшевый мишка",
    image: "https://images.unsplash.com/photo-1547567987-216150fb814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjBzb2Z0JTIwdG95fGVufDF8fHx8MTc1NzE2MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 890,
    quantity: 1,
    description: "Мягкий плюшевый мишка 30 см"
  }
];

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 3000 ? 0 : 300;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    alert("Заказ оформлен! В ближайшее время с вами свяжется наш менеджер.");
    onClose();
  };

  if (cartItems.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-primary">
              🛒 Корзина
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
          <DialogTitle className="text-2xl font-semibold text-primary">
            🛒 Корзина ({cartItems.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Товары в корзине */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white border border-border rounded-lg p-4">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
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
                          <span className="text-sm">−</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <span className="text-sm">+</span>
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
                          <span className="text-sm">🗑️</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Оформление заказа */}
          <div className="lg:col-span-1">
            <div className="bg-warm-rose p-6 rounded-lg sticky top-4 space-y-6">
              <h3 className="text-lg font-medium text-foreground">Оформление заказа</h3>
              
              {/* Адрес доставки */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <span className="text-sm">📍</span>
                  Адрес доставки
                </label>
                <Input
                  placeholder="Введите адрес доставки"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                />
              </div>

              {/* Время доставки */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <span className="text-sm">⏰</span>
                  Время доставки
                </label>
                <select
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-white"
                >
                  <option value="asap">Как можно скорее</option>
                  <option value="today">Сегодня до 18:00</option>
                  <option value="tomorrow">Завтра утром</option>
                  <option value="specific">Выбрать время</option>
                </select>
              </div>

              {/* Способ оплаты */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <span className="text-sm">💳</span>
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

              {/* Итоги */}
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