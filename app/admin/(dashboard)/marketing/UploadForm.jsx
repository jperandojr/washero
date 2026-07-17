"use client";

import { useRef, useState, useTransition } from "react";
import { uploadAsset } from "./actions";

export default function UploadForm() {
  const formRef = useRef(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setError("");
    startTransition(async () => {
      try {
        await uploadAsset(formData);
        formRef.current?.reset();
      } catch (err) {
        setError(err.message || "Upload failed.");
      }
    });
  }

  return (
    <form ref={formRef} className="dash-form" onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <div className="fgrid">
        <div className="field">
          <label>Title</label>
          <input type="text" name="title" placeholder="Instagram post — March promo" required />
        </div>
        <div className="field">
          <label>
            Category <span style={{ fontWeight: 400, color: "var(--slate)" }}>(optional)</span>
          </label>
          <input type="text" name="category" placeholder="Social media, Flyer, Photo…" />
        </div>
      </div>
      <div className="field">
        <label>File</label>
        <input type="file" name="file" accept="image/*,application/pdf" required />
      </div>
      {error && <p style={{ color: "#e0567a", fontSize: ".85rem", margin: "0 0 12px" }}>{error}</p>}
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Uploading…" : "Upload"}
        </button>
      </div>
    </form>
  );
}
