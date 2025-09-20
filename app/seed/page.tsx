
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { seedDatabase } from "@/lib/seed-db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

export default function SeedPage() {
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSeed = async () => {
        setLoading(true);
        setResult(null);
        setError(null);
        const seedResult = await seedDatabase();
        if (seedResult.success) {
            let message = "База данных успешно заполнена!";
            if(seedResult.bouquetsAdded > 0 || seedResult.giftsAdded > 0) {
                message += ` Добавлено ${seedResult.bouquetsAdded} букетов и ${seedResult.giftsAdded} подарков.`
            } else {
                 message = "База данных уже содержит данные. Ничего не добавлено.";
            }
            setResult(message);
        } else {
            setError("Произошла ошибка при заполнении базы данных. Пожалуйста, проверьте консоль для получения дополнительной информации.");
        }
        setLoading(false);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Заполнение базы данных</CardTitle>
                    <CardDescription>
                        Нажмите кнопку ниже, чтобы заполнить вашу базу данных Firestore
                        начальными данными для букетов и подарков. Это действие безопасно
                        повторять; данные не будут дублироваться.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {authLoading ? (
                        <p className="text-center text-muted-foreground">Проверка авторизации...</p>
                    ) : user ? (
                        <div className="flex flex-col items-center gap-4">
                            <Button onClick={handleSeed} disabled={loading} className="w-full">
                                {loading ? "Заполнение..." : "Заполнить базу данных"}
                            </Button>
                            {result && <p className="text-green-600 text-sm text-center">{result}</p>}
                            {error && <p className="text-destructive text-sm text-center">{error}</p>}
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-destructive mb-4">Пожалуйста, войдите в систему, чтобы заполнить базу данных.</p>
                             <Button asChild>
                                <Link href="/">Перейти на главную для входа</Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </main>
    )
}
