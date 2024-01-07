import { UserCard } from "@/app/(protected)/components/users-card";
import React from "react";

const UsersPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 mt-4">
      <UserCard
        name="Muhammad Tabish Khanday"
        email="mtabishkhanday@gmail.com"
        lastLogin="2 days ago"
        isVerified={true}
      />
      <UserCard
        name="Kashmir Music Live"
        email="kashmirmusiclive@gmail.com"
        lastLogin="2 hours ago"
        isVerified={false}
      />
    </div>
  );
};

export default UsersPage;
