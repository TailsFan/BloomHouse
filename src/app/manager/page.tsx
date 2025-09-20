
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

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

const emptyBouquet: Omit<Bouquet, 'id'> = {
  name: '',
  description: '',
  price: 0,
  image: '',
  category: '',
  rating: 0,
  reviews: 0,
  isNew: false,
  isPopular: false,
};

const isValidUrl = (urlString: string) => {
  if (!urlString) return false;
  try {
    new URL(urlString);
    return true;
  }
  catch(e){
    return false;
  }
}

export default function ManagerPage() {
  const { appUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [bouquets, setBouquets] = useState<Bouquet[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBouquet, setCurrentBouquet] = useState<Partial<Bouquet>>(emptyBouquet);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!appUser || (appUser.role !== 'admin' && appUser.role !== 'manager')) {
        router.push('/');
      } else {
        fetchBouquets();
      }
    }
  }, [appUser, loading, router]);

  const fetchBouquets = async () => {
    setPageLoading(true);
    const bouquetsCollection = collection(db, 'bouquets');
    const bouquetsSnapshot = await getDocs(bouquetsCollection);
    const bouquetsList = bouquetsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Bouquet));
    setBouquets(bouquetsList);
    setPageLoading(false);
  };

  const handleOpenDialog = (bouquet?: Bouquet) => {
    if (bouquet) {
      setCurrentBouquet(bouquet);
      setIsEditing(true);
    } else {
      setCurrentBouquet(emptyBouquet);
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleDeleteBouquet = async (bouquetId: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот букет?')) {
      try {
        await deleteDoc(doc(db, "bouquets", bouquetId));
        toast({ title: "Успех!", description: "Букет удален." });
        fetchBouquets();
      } catch (error) {
        toast({ title: "Ошибка", description: "Не удалось удалить букет." });
        console.error("Error deleting bouquet:", error);
      }
    }
  };

  const handleSaveChanges = async () => {
    try {
      const bouquetData = { ...currentBouquet };
      bouquetData.price = Number(bouquetData.price) || 0;
      bouquetData.rating = Number(bouquetData.rating) || 0;
      bouquetData.reviews = Number(bouquetData.reviews) || 0;

      if (isEditing && currentBouquet.id) {
        const { id, ...dataToUpdate } = bouquetData;
        const bouquetRef = doc(db, 'bouquets', id);
        await updateDoc(bouquetRef, dataToUpdate);
        toast({ title: "Успех!", description: "Букет обновлен." });
      } else {
        await addDoc(collection(db, 'bouquets'), bouquetData);
        toast({ title: "Успех!", description: "Букет добавлен." });
      }
      setIsDialogOpen(false);
      fetchBouquets();
    } catch (error) {
       toast({ title: "Ошибка", description: "Не удалось сохранить изменения." });
       console.error("Error saving bouquet:", error);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setCurrentBouquet(prev => ({ ...prev, [id]: value }));
  };
  
  const handleCheckboxChange = (id: 'isNew' | 'isPopular', checked: boolean) => {
     setCurrentBouquet(prev => ({ ...prev, [id]: checked }));
  };

  if (loading || pageLoading) {
    return <div className="flex h-screen items-center justify-center">Загрузка...</div>;
  }
  
  if (!appUser || (appUser.role !== 'admin' && appUser.role !== 'manager')) {
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Панель менеджера</h1>
        <div className="flex gap-2">
            <Button onClick={() => handleOpenDialog()}>Добавить букет</Button>
            <Button asChild variant="outline">
                <Link href="/">На главную</Link>
            </Button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Изображение</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bouquets.map((bouquet) => (
              <TableRow key={bouquet.id}>
                <TableCell>
                  {isValidUrl(bouquet.image) ? (
                    <Image src={bouquet.image} alt={bouquet.name} width={40} height={40} className="rounded-md object-cover"/>
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                      Фото
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{bouquet.name}</TableCell>
                <TableCell>{bouquet.price} ₽</TableCell>
                <TableCell>{bouquet.category}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleOpenDialog(bouquet)}>
                    Изменить
                  </Button>
                   <Button variant="destructive" size="sm" onClick={() => handleDeleteBouquet(bouquet.id)}>
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {bouquets.map((bouquet) => (
            <Card key={bouquet.id}>
                <CardHeader className="flex-row gap-4 items-center">
                    {isValidUrl(bouquet.image) ? (
                        <Image src={bouquet.image} alt={bouquet.name} width={60} height={60} className="rounded-md object-cover"/>
                    ) : (
                        <div className="w-[60px] h-[60px] bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                        Фото
                        </div>
                    )}
                    <div>
                        <CardTitle>{bouquet.name}</CardTitle>
                        <CardDescription>{bouquet.category} - {bouquet.price} ₽</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleOpenDialog(bouquet)}>
                            Изменить
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteBouquet(bouquet.id)}>
                            Удалить
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Редактировать букет' : 'Добавить букет'}</DialogTitle>
            <DialogDescription>
              Внесите изменения в информацию о букете.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Название</Label>
              <Input id="name" value={currentBouquet.name} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Описание</Label>
              <Textarea id="description" value={currentBouquet.description} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">URL фото</Label>
              <Input id="image" value={currentBouquet.image} onChange={handleInputChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Цена</Label>
              <Input id="price" type="number" value={currentBouquet.price} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Категория</Label>
              <Input id="category" value={currentBouquet.category} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">Рейтинг</Label>
              <Input id="rating" type="number" value={currentBouquet.rating} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reviews" className="text-right">Отзывы</Label>
              <Input id="reviews" type="number" value={currentBouquet.reviews} onChange={handleInputChange} className="col-span-3" />
            </div>
             <div className="flex items-center space-x-2 col-start-2 col-span-3">
                <Checkbox id="isNew" checked={currentBouquet.isNew} onCheckedChange={(checked) => handleCheckboxChange('isNew', checked as boolean)} />
                <label htmlFor="isNew" className="text-sm font-medium">Новинка</label>
             </div>
             <div className="flex items-center space-x-2 col-start-2 col-span-3">
                <Checkbox id="isPopular" checked={currentBouquet.isPopular} onCheckedChange={(checked) => handleCheckboxChange('isPopular', checked as boolean)} />
                <label htmlFor="isPopular" className="text-sm font-medium">Популярный</label>
             </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveChanges}>Сохранить</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
