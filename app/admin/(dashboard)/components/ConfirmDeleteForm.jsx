"use client";

export default function ConfirmDeleteForm({ action, id, confirmText = "Delete this item?" }) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit">Delete</button>
    </form>
  );
}
