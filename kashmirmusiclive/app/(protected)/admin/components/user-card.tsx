import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeCheck, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserCardProps {
  name: string;
  email: string;
  lastLogin: string;
  isVerified: boolean;
  photoUrl: string;
}

export const UserCard = ({
  name,
  email,
  lastLogin,
  isVerified,
  photoUrl,
}: UserCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={photoUrl} />
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
      <CardFooter>
        <Clock className="w-4 h-4 mr-2" /> Last Login: {lastLogin} ago
      </CardFooter>
    </Card>
  );
};
