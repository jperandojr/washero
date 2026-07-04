"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "./actions";

const STATUSES = ["new", "in_progress", "completed", "cancelled"];
const STATUS_LABEL = {
  new: "New",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function StatusSelect({ id, status }) {
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  function handleChange(e) {
    const next = e.target.value;
    setValue(next);
    const formData = new FormData();
    formData.set("status", next);
    startTransition(async () => {
      await updateOrderStatus(id, formData);
    });
  }

  return (
    <select
      className={`status-select ${value}`}
      value={value}
      onChange={handleChange}
      disabled={pending}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABEL[s]}
        </option>
      ))}
    </select>
  );
}
