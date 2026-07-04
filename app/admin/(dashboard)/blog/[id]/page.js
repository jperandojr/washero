import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { updatePost } from "../actions";
import PostForm from "../PostForm";

export const metadata = { title: "Edit post — WASHERO Admin" };

export default async function EditPostPage({ params }) {
  const { id } = await params;
  const { data: post } = await supabaseAdmin().from("blog_posts").select("*").eq("id", id).single();
  if (!post) notFound();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Edit post</h1>
        </div>
      </div>
      <PostForm action={updatePost.bind(null, id)} defaultValues={post} />
    </>
  );
}
