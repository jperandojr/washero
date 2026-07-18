"use client";

import { useEffect, useRef, useState } from "react";
import { createOrder } from "@/app/actions/orders";

export default function BookingForm({
  whatsappNumber = "639000000000",
  messengerUsername = "washero",
}) {
  const formRef = useRef(null);
  const successRef = useRef(null);
  const dateRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [chat, setChat] = useState(null); // null | "whatsapp" | "messenger"

  function toggleChat(app) {
    setChat((current) => (current === app ? null : app));
  }

  useEffect(() => {
    if (dateRef.current) {
      dateRef.current.min = new Date().toISOString().split("T")[0];
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = formRef.current;
    const required = form.querySelectorAll("[required]");
    let ok = true;
    required.forEach((f) => {
      if (!f.value.trim()) {
        f.style.borderColor = "#e0567a";
        ok = false;
      } else {
        f.style.borderColor = "";
      }
    });
    if (!ok) return;

    setSubmitting(true);
    setError("");
    const result = await createOrder(new FormData(form));
    setSubmitting(false);

    if (!result.ok) {
      setError("Something went wrong submitting your request. Please try again.");
      return;
    }
    setSubmitted(true);
  }

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitted]);

  return (
    <div className="booking reveal">
      <div className="booking-aside">
        <span className="eyebrow">Book in under a minute</span>
        <h2>Schedule your pickup</h2>
        <p>
          Tell us where and when. Our hero handles the rest — no bags, no
          prep, no hassle.
        </p>
        <ul className="aside-list">
          <li>
            <span className="tick">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>{" "}
            Free doorstep pickup
          </li>
          <li>
            <span className="tick">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>{" "}
            Back within 24 hours
          </li>
          <li>
            <span className="tick">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>{" "}
            Pay after delivery
          </li>
        </ul>

        <div className="chat-invite">
          <p className="chat-invite-label">Prefer to chat first?</p>
          <div className="chat-buttons">
            <button
              type="button"
              className={`chat-btn whatsapp ${chat === "whatsapp" ? "active" : ""}`}
              onClick={() => toggleChat("whatsapp")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              WhatsApp
            </button>
            <button
              type="button"
              className={`chat-btn messenger ${chat === "messenger" ? "active" : ""}`}
              onClick={() => toggleChat("messenger")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.913 1.454 5.512 3.726 7.21V22l3.405-1.869c.909.252 1.871.388 2.869.388 5.523 0 10-4.145 10-9.26C22 6.146 17.523 2 12 2Zm1.008 12.461-2.546-2.716-4.97 2.716 5.467-5.804 2.609 2.716 4.906-2.716-5.466 5.804Z" />
              </svg>
              Messenger
            </button>
          </div>
        </div>
      </div>

      {chat && (
        <div className={`chat-widget ${chat}`} role="dialog" aria-label="Chat with WASHERO">
          <div className="chat-head">
            <span className="chat-avatar">W</span>
            <div className="chat-head-copy">
              <b>WASHERO</b>
              <small>
                {chat === "whatsapp" ? "Typically replies in minutes" : "We're here to help"}
              </small>
            </div>
            <button
              type="button"
              className="chat-close"
              aria-label="Close chat"
              onClick={() => setChat(null)}
            >
              ✕
            </button>
          </div>
          <div className="chat-body">
            <div className="chat-bubble">
              Hi! 👋 Need help with your laundry pickup in Iloilo City? Chat
              with us — we&apos;ll sort you out in minutes.
            </div>
          </div>
          <a
            className="chat-cta"
            href={
              chat === "whatsapp"
                ? `https://wa.me/${whatsappNumber}?text=Hi%20WASHERO!%20I%27d%20like%20to%20schedule%20a%20laundry%20pickup.`
                : `https://m.me/${messengerUsername}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Continue in {chat === "whatsapp" ? "WhatsApp" : "Messenger"}
          </a>
        </div>
      )}

      <div className="booking-form">
        {!submitted && (
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="form-title">Your pickup details</div>
            <div className="form-sub">We&apos;ll text you to confirm your time slot.</div>
            <div className="fgrid">
              <div className="field">
                <label>
                  Full name <span className="req">*</span>
                </label>
                <input type="text" name="name" placeholder="Juan Dela Cruz" required />
              </div>
              <div className="field">
                <label>
                  Phone number <span className="req">*</span>
                </label>
                <input type="tel" name="phone" placeholder="+63 900 000 0000" required />
              </div>
            </div>
            <div className="fgrid">
              <div className="field">
                <label>Email</label>
                <input type="email" name="email" placeholder="juan@email.com" />
              </div>
              <div className="field">
                <label>
                  Service <span className="req">*</span>
                </label>
                <select name="service" required defaultValue="">
                  <option value="">Choose a service…</option>
                  <option>Wash &amp; Fold</option>
                  <option>Dry Cleaning</option>
                  <option>Ironing &amp; Press</option>
                  <option>Bedding &amp; Comforters</option>
                  <option>Not sure yet</option>
                </select>
              </div>
            </div>
            <div className="field full">
              <label>
                Pickup address <span className="req">*</span>
              </label>
              <input type="text" name="address" placeholder="House no., street, barangay / area" required />
            </div>
            <div className="fgrid">
              <div className="field">
                <label>
                  Pickup date <span className="req">*</span>
                </label>
                <input ref={dateRef} type="date" name="date" id="dateInput" required />
              </div>
              <div className="field">
                <label>
                  Preferred time <span className="req">*</span>
                </label>
                <select name="time" required defaultValue="">
                  <option value="">Choose a slot…</option>
                  <option>9:00 – 11:00 AM</option>
                  <option>11:00 AM – 1:00 PM</option>
                  <option>1:00 – 3:00 PM</option>
                  <option>3:00 – 5:00 PM</option>
                  <option>5:00 – 7:00 PM</option>
                </select>
              </div>
            </div>
            <div className="fgrid">
              <div className="field">
                <label>Approx. load</label>
                <select name="load" defaultValue="">
                  <option value="">Optional</option>
                  <option>Small (1 basket)</option>
                  <option>Medium (2–3 baskets)</option>
                  <option>Large (4+ baskets)</option>
                </select>
              </div>
            </div>
            <div className="field full">
              <label>Notes for your hero</label>
              <textarea name="notes" placeholder="Gate code, delicate items, detergent preference…" />
            </div>
            <div className="form-foot">
              <span className="form-note">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--violet)" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                No payment now — pay after delivery.
              </span>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? "Scheduling…" : "Schedule my pickup"}
              </button>
            </div>
            {error && (
              <p style={{ color: "#e0567a", fontSize: ".85rem", marginTop: "12px" }}>{error}</p>
            )}
          </form>
        )}

        {submitted && (
          <div className="success show" ref={successRef}>
            <div className="badge-ok">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3>Your hero is on the way! 🦸</h3>
            <p>
              Thanks — we&apos;ve got your pickup request. We&apos;ll text you
              shortly to confirm your time slot. Sit back, laundry day is
              handled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
