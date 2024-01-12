"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export type Post = {
  id: string;
  title: string;
  category: string;
  date: Timestamp;
  published: boolean;
};

interface PostTableProps {
  posts: Post[];
}

export function PostTable({ posts }: PostTableProps) {
  const router = useRouter();

  return (
    <Table>
      <TableCaption>A list of your posts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>TITLE</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>DATE</TableHead>
          <TableHead>PUBLISHED</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow
            key={post.title}
            onClick={() => router.push(`/admin/posts/${post.id}`)}
          >
            <TableCell className="font-medium">
              {post.title.length > 50
                ? `${post.title.slice(0, 50)}...`
                : post.title}
            </TableCell>
            <TableCell>{post.category.toUpperCase()}</TableCell>
            <TableCell>{format(post.date.seconds * 1000, "PPP")}</TableCell>
            <TableCell className="uppercase">
              {post.published.toString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
