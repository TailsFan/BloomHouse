
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';


interface User {
  uid: string;
  email: string;
  displayName: string | null;
  role: 'user' | 'manager' | 'admin';
}

export default function AdminPage() {
  const { appUser, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!loading && appUser?.role !== 'admin') {
      router.push('/');
    } else if (appUser?.role === 'admin') {
      const fetchUsers = async () => {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList = usersSnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() } as User));
        setUsers(usersList);
        setPageLoading(false);
      };
      fetchUsers();
    }
  }, [appUser, loading, router]);

  const handleRoleChange = async (uid: string, role: 'user' | 'manager') => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { role });
      setUsers(users.map(u => (u.uid === uid ? { ...u, role } : u)));
      toast({ title: "Успех!", description: "Роль пользователя обновлена." });
    } catch (error) {
      console.error("Error updating role:", error);
      toast({ title: "Ошибка", description: "Не удалось обновить роль." });
    }
  };

  const handleDeleteUser = async (uid: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя? Это действие необратимо.')) {
        try {
            await deleteDoc(doc(db, "users", uid));
            setUsers(users.filter(u => u.uid !== uid));
            toast({ title: "Успех!", description: "Пользователь удален." });
        } catch (error) {
            console.error("Error deleting user document:", error);
            toast({ title: "Ошибка", description: "Не удалось удалить пользователя." });
        }
    }
  };

  if (loading || pageLoading) {
    return <div className="flex h-screen items-center justify-center">Загрузка...</div>;
  }
  
  if (appUser?.role !== 'admin') {
    return null; 
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Панель администратора</h1>
        <Button asChild variant="outline">
          <Link href="/">На главную</Link>
        </Button>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Имя</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.displayName || 'Не указано'}</TableCell>
                <TableCell>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" disabled={user.role === 'admin'}>{user.role}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleRoleChange(user.uid, 'user')}>user</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRoleChange(user.uid, 'manager')}>manager</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
                <TableCell className="text-right">
                   <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.uid)} disabled={user.role === 'admin'}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <Card key={user.uid}>
            <CardHeader>
                <CardTitle>{user.displayName || 'Пользователь без имени'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Роль</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" disabled={user.role === 'admin'}>{user.role}</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.uid, 'user')}>user</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRoleChange(user.uid, 'manager')}>manager</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Действия</span>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteUser(user.uid)} disabled={user.role === 'admin'}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Удалить
                    </Button>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
