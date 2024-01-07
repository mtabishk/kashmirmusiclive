"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/providers/auth-context-provider";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (auth?.currentUser) {
      router.push("/admin/dashboard");
    }
  }, [auth?.currentUser, router]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (auth && auth?.signIn) {
        await auth.signIn(email, password);
        toast({
          title: "You are Logged in",
          duration: 1500,
        });
      }
    } catch (error: any) {
      console.error(error);
      const errorCode = error.code;
      if (errorCode === "auth/invalid-credential") {
        toast({
          variant: "destructive",
          title: "Invalid email or password",
          duration: 1500,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Something went wrong",
          duration: 1500,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full m-2 lg:w-[400px] p-10 border rounded border-neutral-600 bg-neutral-800">
        <div className="flex items-center justify-center">
          <Image
            className="rounded-full"
            alt="Logo"
            height="100"
            width="100"
            src="/logo.jpg"
          />
        </div>
        <h1 className="pt-4 text-xl font-bold text-center text-muted-foreground">
          Log in to your account
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col mt-8">
          <Label className="mx-1 mb-2 text-muted-foreground" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            className="mb-4"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            disabled={isLoading}
          />
          <Label className="mx-1 mb-2 text-muted-foreground" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            className="mb-4"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
