"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import { CalendarIcon, ChevronLeft, Trash } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import { AuthContext } from "@/providers/auth-context-provider";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase/firebase-config";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Progress } from "@/components/ui/progress";

export type CompletePost = {
  id: string;
  author: string;
  category: string;
  content: string;
  createdAt: Timestamp;
  date: Timestamp;
  imageUrl: string;
  published: boolean;
  title: string;
  uid: string;
  updatedAt: string;
};

interface PostFormProps {
  initialData: CompletePost | null;
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
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [file, setFile] = useState<File>();
  const [content, setContent] = useState<string>();

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
      if (!title || !category || !author || !date || !content || !imageUrl) {
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
        published: initialData?.published || false,
        uid: auth?.currentUser?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      if (initialData) {
        // edit data (for update post)
        const updatePostRef = doc(db, "posts", initialData.id);
        await updateDoc(updatePostRef, data);
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
      console.log(error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (e: any) => {
    e.preventDefault();
    e.persist();

    if (initialData) {
      const deletePostRef = doc(db, "posts", initialData.id);
      await deleteDoc(deletePostRef);

      toast({
        title: "Post is deleted.",
        duration: 1500,
      });

      router.push(`/admin/posts`);
    }
  };

  const onPublish = async (e: any) => {
    e.preventDefault();
    e.persist();

    if (initialData) {
      const updatePostRef = doc(db, "posts", initialData.id);
      const data = {
        published: true,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(updatePostRef, data);

      toast({
        title: "Post is published.",
        duration: 1500,
      });

      router.push(`/admin/posts`);
    }
  };

  const onUnpublish = async (e: any) => {
    e.preventDefault();
    e.persist();

    if (initialData) {
      const updatePostRef = doc(db, "posts", initialData.id);
      const data = {
        published: false,
        updatedAt: serverTimestamp(),
      };
      await updateDoc(updatePostRef, data);

      toast({
        title: "Post is unpublished.",
        duration: 1500,
      });

      router.push(`/admin/posts`);
    }
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setAuthor(initialData.author);
      setDate(new Date(initialData.date.seconds * 1000));
      setImageUrl(initialData.imageUrl);
      setContent(initialData.content);
    }
  }, [initialData]);

  const editorKey = initialData ? `editor-${initialData.id}` : "editor";

  const heading = initialData ? "Edit Post" : "Create Post";
  const buttonText = initialData ? "Update" : "Create";

  return (
    <div className="h-full py-4 mt-4 border rounded border-neutral-600 bg-neutral-800">
      <div className="flex flex-row items-center justify-between w-full px-4 pb-4 space-y-2">
        <Button onClick={() => router.back()}>
          <ChevronLeft />
        </Button>
        <h3 className="text-lg font-bold text-center">{heading}</h3>
        <div className="flex items-center justify-center space-x-2">
          {initialData && (
            <>
              <Button onClick={onDelete} variant="destructive">
                <Trash className="w-5 h-5" />
              </Button>
              {initialData.published ? (
                <Button onClick={onUnpublish}>UnPublish</Button>
              ) : (
                <Button onClick={onPublish}>Publish</Button>
              )}
            </>
          )}
          <Button onClick={onSubmit}>{buttonText}</Button>
        </div>
      </div>
      <Separator className="bg-primary/10" />
      <div className="flex flex-col items-center justify-center w-full mt-4 space-y-2">
        <SingleImageDropzone
          width={300}
          height={200}
          value={file || imageUrl}
          onChange={(file) => {
            setImageUploading(false);
            setFile(file);
            setImageUrl("");
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
            value={category}
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
          key={editorKey}
          initialContent={initialData?.content || content}
          onChange={(value) => setContent(value)}
          theme="light"
        />
      </div>
    </div>
  );
};
