"use client";

import { UserCard } from "@/app/(protected)/admin/components/user-card";
import { Spinner } from "@/components/spinner";
import { db } from "@/firebase/firebase-config";
import { formatDistanceToNowStrict } from "date-fns";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUsersFromFirestore = async () => {
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(usersCollection);

      const users = querySnapshot.docs.map((doc) => {
        const user = doc.data();
        return {
          id: doc.id,
          displayName: user.displayName,
          email: user.email,
          isVerified: user.isVerified,
          lastLogin: user.lastLogin,
          photoUrl: user.photoUrl,
        };
      });

      setUsers(users);
      setIsLoading(false);
    };

    getUsersFromFirestore();
  }, []);

  return (
    <div className="py-8 space-y-4">
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      )}
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.displayName}
          email={user.email}
          lastLogin={formatDistanceToNowStrict(user.lastLogin.seconds * 1000)}
          isVerified={user.isVerified}
          photoUrl={user.photoUrl}
        />
      ))}
    </div>
  );
};

export default UsersPage;
