import Link from "next/link";

export default function PageForm({ action, defaultValues = {} }) {
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
        <input type="text" name="slug" defaultValue={defaultValues.slug || ""} placeholder="about-us" />
      </div>
      <div className="field">
        <label>Content</label>
        <textarea
          name="content"
          rows={12}
          defaultValue={defaultValues.content || ""}
          placeholder="Page content (HTML or Markdown)"
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
        <Link href="/admin/pages" className="btn btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
