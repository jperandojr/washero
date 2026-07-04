import { createPost } from "../actions";
import PostForm from "../PostForm";

export const metadata = { title: "New post — WASHERO Admin" };

export default function NewPostPage() {
  return (
    <>
      <div className="dash-head">
        <div>
          <h1>New post</h1>
        </div>
      </div>
      <PostForm action={createPost} />
    </>
  );
}
