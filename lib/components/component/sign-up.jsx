"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [allergies, setAllergies] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [healthGoals, setHealthGoals] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User created:", user);

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        allergies: allergies,
        gender: gender,
        weight: weight,
        healthGoals: healthGoals,
      });

      router.push("/");
    } catch (error) {
      console.error("Error signing up:", error);
      const cleanErrorMessage = error.message.replace(/^(firebase:\s*)/i, "");
      setError(cleanErrorMessage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <header className="container mx-auto flex h-[60px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <ShoppingBasketIcon className="h-6 w-6" />
          <span className="font-bold">&apos;AI&apos;sle</span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            prefetch={false}
          >
            Go Back
          </Link>
        </div>
      </header>
      <main className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-12 md:px-6 md:py-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Sign Up for &apos;AI&apos;sle
          </h1>
          <p className="mt-4 max-w-[600px] text-muted-foreground md:text-xl">
            Create your account to start tracking your pantry.
          </p>
        </div>
        <Card className="w-3/5">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your information to get started.
            </CardDescription>
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
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any allergies"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Gender</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="weight">Weight (kgs)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter your weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="health-goals">Health Goals</Label>
              <Textarea
                id="health-goals"
                placeholder="Enter your health goals"
                value={healthGoals}
                onChange={(e) => setHealthGoals(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSignUp}
              className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Sign Up
            </Button>
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
      strokeLinejoin="round"
    >
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
