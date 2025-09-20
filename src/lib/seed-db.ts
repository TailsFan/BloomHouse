// IMPORTANT: This script is intended to be run from a client-side component, for example, on a button click.
// It is not designed for server-side execution.

import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const bouquets = [
  {
    id: "1",
    name: "Классический букет красных роз",
    image: "https://images.unsplash.com/photo-1603983856087-c175061451de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZmxvd2VyJTIwYm91cXVldCUyMHJvc2VzfGVufDF8fHx8MTc1NzE2MDgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 3450,
    category: "Розы",
    rating: 5,
    reviews: 127,
    isPopular: true,
    isNew: false,
    description: "15 красных роз в элегантной упаковке"
  },
  {
    id: "2",
    name: "Свадебный букет из белых цветов",
    image: "https://images.unsplash.com/photo-1700142611715-8a023c5eb8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWRkaW5nJTIwYm91cXVldCUyMHdoaXRlJTIwZmxvd2Vyc3xlbnwxfHx8fDE3NTcxNjA4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 5200,
    category: "Свадебные",
    rating: 5,
    reviews: 89,
    isPopular: true,
    isNew: false,
    description: "Нежный свадебный букет из белых роз и лилий"
  },
  {
    id: "3",
    name: "Весенний микс ярких цветов",
    image: "https://images.unsplash.com/photo-1619962992057-be492a5816f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNwcmluZyUyMGZsb3dlciUyMGJvdXF1ZXR8ZW58MXx8fHwxNzU3MTYwODMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 2890,
    category: "Микс",
    rating: 4,
    reviews: 203,
    isPopular: true,
    isNew: false,
    description: "Яркий весенний букет из тюльпанов и нарциссов"
  },
  {
    id: "4",
    name: "Романтичные розовые розы",
    image: "https://images.unsplash.com/photo-1695050193946-3a3bde70c2c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwaW5rJTIwcm9zZXMlMjBib3VxdWV0JTIwcm9tYW50aWN8ZW58MXx8fHwxNzU3MTYwODMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 4100,
    category: "Розы",
    rating: 5,
    reviews: 156,
    isPopular: true,
    isNew: false,
    description: "21 розовая роза с зеленью и упаковкой"
  },
  {
    id: "5",
    name: "Элегантный микс",
    image: "https://images.unsplash.com/photo-1699830008232-fe4ae2a6ee11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaXhlZCUyMGZsb3dlciUyMGJvdXF1ZXQlMjBlbGVnYW50fGVufDF8fHx8MTc1NzE2MzMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 3750,
    category: "Микс",
    rating: 4,
    reviews: 95,
    isPopular: false,
    isNew: true,
    description: "Стильная композиция из роз и лилий"
  },
  {
    id: "6",
    name: "Солнечные подсолнухи",
    image: "https://images.unsplash.com/photo-1752765579894-9a7aef6fb359?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdW5mbG93ZXIlMjBib3VxdWV0JTIwYnJpZ2h0fGVufDF8fHx8MTc1NzE2MDgzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 2450,
    category: "Подсолнухи",
    rating: 4,
    reviews: 78,
    isPopular: false,
    isNew: true,
    description: "Яркий букет из свежих подсолнухов"
  },
  {
    id: "7",
    name: "Букет из хризантем",
    image: "https://images.unsplash.com/photo-1666869689643-ca221e2b1ecc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjaHJ5c2FudGhlbXVtJTIwZmxvd2VycyUyMGNvbG9yZnVsfGVufDF8fHx8MTc1NzE2MzI2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1890,
    category: "Хризантемы",
    rating: 4,
    reviews: 134,
    isPopular: false,
    isNew: false,
    description: "Пышный букет из разноцветных хризантем"
  },
  {
    id: "8",
    name: "Премиум композиция",
    image: "https://images.unsplash.com/photo-1699830008232-fe4ae2a6ee11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtaXhlZCUyMGZsb3dlciUyMGJvdXF1ZXQlMjBlbGVnYW50fGVufDF8fHx8MTc1NzE2MzMwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 6890,
    category: "Премиум",
    rating: 5,
    reviews: 42,
    isPopular: false,
    isNew: true,
    description: "Эксклюзивная композиция из редких цветов"
  }
];

const gifts = [
  {
    id: "1",
    name: "Плюшевый мишка классический",
    image: "https://images.unsplash.com/photo-1547567987-216150fb814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjBzb2Z0JTIwdG95fGVufDF8fHx8MTc1NzE2MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 890,
    description: "Мягкий плюшевый мишка 30 см"
  },
  {
    id: "2",
    name: "Набор мини-игрушек",
    image: "https://images.unsplash.com/photo-1719556359001-2d7ce40a9d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjdXRlJTIwcGx1c2glMjBhbmltYWxzJTIwdG95c3xlbnwxfHx8fDE3NTcxNjMxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1250,
    description: "Набор из 3 мини-игрушек"
  },
  {
    id: "3",
    name: "Плюшевый зайчик",
    image: "https://images.unsplash.com/photo-1547567987-216150fb814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWRkeSUyMGJlYXIlMjBzb2Z0JTIwdG95fGVufDF8fHx8MTc1NzE2MzE3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 750,
    description: "Мягкий зайчик 25 см"
  },
  {
    id: "4",
    name: "Большой мишка",
    image: "https://images.unsplash.com/photo-1719556359001-2d7ce40a9d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjdXRlJTIwcGx1c2glMjBhbmltYWxzJTIwdG95c3xlbnwxfHx8fDE3NTcxNjMxNzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    price: 1890,
    description: "Большой плюшевый мишка 50 см"
  }
];


export const seedDatabase = async () => {
    let bouquetsAdded = 0;
    let giftsAdded = 0;

    try {
        // Seed bouquets
        const bouquetsCollection = collection(db, "bouquets");
        for (const bouquet of bouquets) {
            const { id, ...bouquetData } = bouquet;
            const q = query(bouquetsCollection, where("name", "==", bouquetData.name));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                await addDoc(bouquetsCollection, bouquetData);
                bouquetsAdded++;
            }
        }

        // Seed gifts
        const giftsCollection = collection(db, "gifts");
        for (const gift of gifts) {
            const { id, ...giftData } = gift;
            const q = query(giftsCollection, where("name", "==", giftData.name));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                await addDoc(giftsCollection, giftData);
                giftsAdded++;
            }
        }
        
        return { success: true, bouquetsAdded, giftsAdded };
    } catch (error) {
        console.error("Error seeding database: ", error);
        return { success: false, error, bouquetsAdded, giftsAdded };
    }
}
