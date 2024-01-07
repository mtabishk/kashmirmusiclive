import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  name: string;
  email: string;
  lastLogin: string;
  isVerified: boolean;
}

export const UserCard = ({
  name,
  email,
  lastLogin,
  isVerified,
}: UserCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/logo.jpg" />
              <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p>
                {name}
                {isVerified ? (
                  <BadgeCheck className="inline ml-2 text-muted-foreground" />
                ) : null}
              </p>
              <CardDescription>{email}</CardDescription>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardFooter>Last Login: {lastLogin}</CardFooter>
    </Card>
  );
};
