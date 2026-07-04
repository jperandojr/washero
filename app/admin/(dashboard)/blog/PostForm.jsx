import Link from "next/link";

export default function PostForm({ action, defaultValues = {} }) {
  return (
    <form action={action} className="dash-form">
      <div className="field">
        <label>Title</label>
        <input type="text" name="title" defaultValue={defaultValues.title || ""} required />
      </div>
      <div className="field">
        <label>
          Slug{" "}
          <span style={{ fontWeight: 400, color: "var(--slate)" }}>
            (leave blank to auto-generate from title)
          </span>
        </label>
        <input type="text" name="slug" defaultValue={defaultValues.slug || ""} placeholder="how-to-fold-a-fitted-sheet" />
      </div>
      <div className="field">
        <label>Excerpt</label>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={defaultValues.excerpt || ""}
          placeholder="Short summary shown on the blog listing"
        />
      </div>
      <div className="field">
        <label>Content</label>
        <textarea
          name="content"
          rows={14}
          defaultValue={defaultValues.content || ""}
          placeholder="Post content (HTML or Markdown)"
        />
      </div>
      <div className="field check-field">
        <input type="checkbox" name="published" id="published" defaultChecked={!!defaultValues.published} />
        <label htmlFor="published">Published</label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link href="/admin/blog" className="btn btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
