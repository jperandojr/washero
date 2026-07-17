"use client";

import { useState } from "react";
import { deleteAsset } from "./actions";

function formatSize(bytes) {
  if (!bytes) return "";
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export default function AssetCard({ asset }) {
  const [copied, setCopied] = useState(false);
  const isImage = asset.file_type.startsWith("image/");

  function handleDeleteSubmit(e) {
    if (!confirm(`Delete "${asset.title}"? This can't be undone.`)) {
      e.preventDefault();
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(asset.file_url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="asset-card">
      <a href={asset.file_url} target="_blank" rel="noopener noreferrer" className="asset-thumb">
        {isImage ? <img src={asset.file_url} alt={asset.title} /> : <span className="asset-file-icon">PDF</span>}
      </a>
      <div className="asset-info">
        <div className="asset-title" title={asset.title}>
          {asset.title}
        </div>
        <div className="asset-meta">
          {asset.category && <span className="badge-pill off">{asset.category}</span>}
          <span>{formatSize(asset.file_size)}</span>
        </div>
      </div>
      <div className="row-actions">
        <button type="button" className="copy" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy link"}
        </button>
        <form action={deleteAsset} onSubmit={handleDeleteSubmit}>
          <input type="hidden" name="id" value={asset.id} />
          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}
