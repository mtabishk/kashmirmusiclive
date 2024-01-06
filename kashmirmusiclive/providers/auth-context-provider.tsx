"use client";
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { app } from "@/firebase/firebase-config";
import { updateUserTimestamp } from "../lib/firestore-database";

interface AuthContextProps {
  currentUser: User | null;
  updateUserProfile: (displayName: string, photoURL: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const auth: Auth = getAuth(app);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("currentUser");
      return storedUser ? JSON.parse(storedUser) : null;
    } else {
      return null;
    }
  });

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        await updateUserTimestamp(auth.currentUser!.uid);
      } catch (error) {
        throw error;
      }
    },
    [auth]
  );

  const signOut = useCallback(() => {
    return auth.signOut();
  }, [auth]);

  const updateUserProfile = useCallback(
    (displayName: string, photoURL: string) => {
      return updateProfile(auth.currentUser!, {
        displayName: displayName,
        photoURL: photoURL,
      });
    },
    [auth]
  );

  const sendVerificationEmail = useCallback(() => {
    return sendEmailVerification(auth.currentUser!);
  }, [auth]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      try {
        if (user) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("currentUser", JSON.stringify(user));
          }
          setCurrentUser(user);
        } else {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("currentUser");
          }
          setCurrentUser(null);
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      try {
        unsubscribe();
      } catch (error) {
        console.error(error);
      }
    };
  }, [auth]);

  const value = useMemo(
    () => ({
      currentUser,
      updateUserProfile,
      sendVerificationEmail,
      signIn,
      signOut,
    }),
    [currentUser, updateUserProfile, sendVerificationEmail, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
