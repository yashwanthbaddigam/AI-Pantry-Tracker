"use client"; 

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase"; 

export function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);

      if (mounted) {
        router.push("/landing"); 
      }
    } catch (error) {
      console.error("Error signing in:", error);
      const cleanErrorMessage = error.message.replace(/^(firebase:\s*)/i, '');
      setError(cleanErrorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="container mx-auto flex h-[60px] items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <ShoppingBasketIcon className="h-6 w-6" />
          <span className="font-bold">&apos;AI&apos;sle</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/signup"
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}>
            Sign Up
          </Link>
        </div>
      </header>
      <main className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Welcome to &apos;AI&apos;sle</h1>
          <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
            Your AI-powered kitchen assistant. Keep tabs on your pantry, plan meals, and create custom recipes that fit your allergies and calorie goals.
          </p>
        </div>
        <Card className="w-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>Enter your email and password to access your pantry.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <button
              onClick={handleSignIn}
              className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              Sign In
            </button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}

function ShoppingBasketIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
}
