"use client";

import { useEffect, useRef, useState } from "react";

const DISTRICTS = [
  "City Proper",
  "Jaro",
  "La Paz",
  "Lapuz",
  "Mandurriao",
  "Molo",
  "Villa Arevalo",
];

const SERVICES = ["Wash & Fold", "Ironing & Press", "Dry Cleaning", "Bedding & Comforters"];

const NAMES = [
  "Angelica S.",
  "Bea M.",
  "Carlo P.",
  "Dennis T.",
  "Ella R.",
  "Francis G.",
  "Grace L.",
  "Harold D.",
  "Ivy C.",
  "Jerome A.",
  "Kristine V.",
  "Louie N.",
  "Marife B.",
  "Noel F.",
  "Odessa Q.",
  "Paolo H.",
  "Reign K.",
  "Sheila J.",
];

function buildOrderPool() {
  const shuffledNames = [...NAMES].sort(() => Math.random() - 0.5);
  return shuffledNames.map((name, i) => ({
    name,
    district: DISTRICTS[i % DISTRICTS.length],
    service: SERVICES[Math.floor(Math.random() * SERVICES.length)],
  }));
}

function randomAgo() {
  const roll = Math.random();
  if (roll < 0.35) return "Just now";
  if (roll < 0.75) {
    const mins = 1 + Math.floor(Math.random() * 45);
    return `${mins} minute${mins === 1 ? "" : "s"} ago`;
  }
  const hrs = 1 + Math.floor(Math.random() * 5);
  return `${hrs} hour${hrs === 1 ? "" : "s"} ago`;
}

export default function PurchaseProof() {
  const [entry, setEntry] = useState(null);
  const [visible, setVisible] = useState(false);
  const poolRef = useRef([]);
  const lastIndexRef = useRef(-1);

  useEffect(() => {
    poolRef.current = buildOrderPool();
    let showTimer;
    let hideTimer;

    function scheduleNext(delay) {
      showTimer = setTimeout(showOne, delay);
    }

    function showOne() {
      const pool = poolRef.current;
      let idx = Math.floor(Math.random() * pool.length);
      if (pool.length > 1) {
        while (idx === lastIndexRef.current) {
          idx = Math.floor(Math.random() * pool.length);
        }
      }
      lastIndexRef.current = idx;
      setEntry({ ...pool[idx], ago: randomAgo() });
      setVisible(true);

      hideTimer = setTimeout(() => {
        setVisible(false);
        scheduleNext(9000 + Math.random() * 8000);
      }, 5500);
    }

    scheduleNext(4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!entry) return null;

  return (
    <div className={`proof-toast ${visible ? "show" : ""}`} role="status" aria-live="polite">
      <span className="proof-avatar">{entry.name.charAt(0)}</span>
      <div className="proof-body">
        <p>
          <b>{entry.name}</b> in {entry.district} just booked{" "}
          <b>{entry.service}</b>
        </p>
        <span className="proof-time">{entry.ago}</span>
      </div>
      <button
        type="button"
        className="proof-close"
        aria-label="Dismiss"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  );
}
