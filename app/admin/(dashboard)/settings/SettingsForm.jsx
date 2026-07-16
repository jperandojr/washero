"use client";

import { useState, useTransition } from "react";
import { updateSettings } from "./actions";

export default function SettingsForm({ defaultValues }) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSaved(false);
    startTransition(async () => {
      await updateSettings(formData);
      setSaved(true);
    });
  }

  return (
    <form className="dash-form" onSubmit={handleSubmit} style={{ maxWidth: 560 }}>
      <div className="field">
        <label>Phone number (displayed)</label>
        <input
          type="text"
          name="phone_display"
          defaultValue={defaultValues.phone_display}
          placeholder="(033) 123-4567"
          required
        />
      </div>
      <div className="field">
        <label>
          Phone number (dial link){" "}
          <span style={{ fontWeight: 400, color: "var(--slate)" }}>e.g. +639171234567</span>
        </label>
        <input
          type="text"
          name="phone_href"
          defaultValue={defaultValues.phone_href}
          placeholder="+639171234567"
          required
        />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" name="email" defaultValue={defaultValues.email} required />
      </div>
      <div className="field">
        <label>Hours — weekdays</label>
        <input
          type="text"
          name="hours_weekday"
          defaultValue={defaultValues.hours_weekday}
          placeholder="Mon–Sat · 7 AM – 8 PM"
          required
        />
      </div>
      <div className="field">
        <label>Hours — Sunday</label>
        <input
          type="text"
          name="hours_sunday"
          defaultValue={defaultValues.hours_sunday}
          placeholder="Sun · 8 AM – 5 PM"
          required
        />
      </div>
      <div className="field">
        <label>
          WhatsApp number{" "}
          <span style={{ fontWeight: 400, color: "var(--slate)" }}>
            digits only, with country code — e.g. 639171234567
          </span>
        </label>
        <input
          type="text"
          name="whatsapp_number"
          defaultValue={defaultValues.whatsapp_number}
          placeholder="639171234567"
          required
        />
      </div>
      <div className="field">
        <label>Messenger username</label>
        <input
          type="text"
          name="messenger_username"
          defaultValue={defaultValues.messenger_username}
          placeholder="washero"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {saved && !pending && (
          <span style={{ color: "var(--slate)", fontSize: ".85rem" }}>Saved.</span>
        )}
      </div>
    </form>
  );
}
