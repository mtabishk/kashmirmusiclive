"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { AuthContext } from "@/providers/auth-context-provider";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/firebase-config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Progress } from "@/components/ui/progress";

interface PostFormProps {
  initialData: any | null;
}

const categories = [
  {
    name: "News",
    id: "news",
  },
  {
    name: "Reviews",
    id: "reviews",
  },
  {
    name: "Interviews",
    id: "interviews",
  },
  {
    name: "Features",
    id: "features",
  },
  {
    name: "Lists",
    id: "lists",
  },
  {
    name: "Podcasts",
    id: "podcasts",
  },
  {
    name: "About Us",
    id: "about-us",
  },
];

export const PostForm = ({ initialData }: PostFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useContext(AuthContext);

  const Editor = useMemo(
    () => dynamic(() => import("./editor"), { ssr: false }),
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File>();
  const [content, setContent] = useState<string>("");

  const [imageUploading, setImageUploading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const [progress, setProgress] = useState(0);

  const handleImageUpload = async () => {
    if (file) {
      setImageUploading(true);
      setProgress(13);
      const fileName = uuidv4();
      const storageRef = ref(storage, `/uploads/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(percent);
        },
        (err) => {
          console.log(err);
          toast({
            variant: "destructive",
            title: "Something went wrong",
            duration: 1500,
          });
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadUrl);
        }
      );
    } else {
      setImageUploading(false);
      toast({
        variant: "destructive",
        title: "Select a file first",
        duration: 1500,
      });
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    e.persist();
    try {
      setIsLoading(true);
      if (!title || !category || !author || !date || !file || !content) {
        toast({
          variant: "destructive",
          title: "Please fill all fields",
          duration: 1500,
        });
        return;
      }

      const data = {
        title: title,
        category: category,
        author: author,
        date: date,
        imageUrl: imageUrl,
        content: content,
        published: false,
        uid: auth?.currentUser?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (initialData) {
        // edit data (for update post)
      } else {
        // create data (for create post)
        const newPostRef = doc(collection(db, "posts"));
        await setDoc(newPostRef, data);
      }

      toast({
        title: "Success",
        duration: 1500,
      });

      router.refresh();
      router.push("/admin/posts");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const heading = initialData ? "Edit Post" : "Create Post";
  const buttonText = initialData ? "Update" : "Create";

  return (
    <div className="h-full py-4 mt-4 border rounded border-neutral-600 bg-neutral-800">
      <div className="flex flex-row items-center justify-between w-full px-4 pb-4 space-y-2">
        <Button onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
        <h3 className="text-lg font-bold text-center">{heading}</h3>
        <Button onClick={onSubmit}>{buttonText}</Button>
      </div>
      <Separator className="bg-primary/10" />
      <div className="flex flex-col items-center justify-center w-full mt-4 space-y-2">
        <SingleImageDropzone
          width={300}
          height={200}
          value={file}
          onChange={(file) => {
            setImageUploading(false);
            setFile(file);
          }}
        />
        {!imageUploading ? (
          <Button disabled={isLoading} onClick={handleImageUpload}>
            Upload Image
          </Button>
        ) : (
          <Progress value={progress} className="w-[300px]" />
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 mx-4 mt-4 lg:mt-8 md:grid-cols-2">
        <div>
          <Label htmlFor="title" className="ml-1 ">
            Title
          </Label>
          <Input
            id="title"
            className="mt-1"
            type="text"
            placeholder="Enter the title of the post"
            disabled={isLoading}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="category" className="ml-1">
            Category
          </Label>
          <Select
            onValueChange={(value) => setCategory(value)}
            disabled={isLoading}
          >
            <SelectTrigger className="mt-1 bg-background">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="author" className="ml-1 ">
            Author
          </Label>
          <Input
            id="author"
            className="mt-1"
            type="text"
            placeholder="Enter the author of the post"
            disabled={isLoading}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="date" className="ml-1 ">
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className="w-full pl-3 mt-1 font-normal text-left hover:bg-background"
                disabled={isLoading}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => setDate(date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mx-2 mt-4 mb-8 lg:mt-8">
        <Label htmlFor="title" className="ml-4 ">
          Content
        </Label>
        <Editor
          onChange={(value) => setContent(value)}
          initialContent={content}
          theme="dark"
        />
      </div>
    </div>
  );
};
