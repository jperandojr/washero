import Link from "next/link";

export default function UserForm({ action, defaultValues = {}, isEdit = false }) {
  return (
    <form action={action} className="dash-form">
      <div className="field">
        <label>Name</label>
        <input type="text" name="name" defaultValue={defaultValues.name || ""} required />
      </div>
      <div className="field">
        <label>Email</label>
        <input type="email" name="email" defaultValue={defaultValues.email || ""} required />
      </div>
      <div className="field">
        <label>
          Password{" "}
          {isEdit && (
            <span style={{ fontWeight: 400, color: "var(--slate)" }}>
              (leave blank to keep the current password)
            </span>
          )}
        </label>
        <input
          type="password"
          name="password"
          placeholder={isEdit ? "••••••••" : "At least 8 characters"}
          minLength={8}
          required={!isEdit}
        />
      </div>
      <div className="field">
        <label>Role</label>
        <select name="role" defaultValue={defaultValues.role || "partner"}>
          <option value="admin">Admin — access to all settings</option>
          <option value="partner">Partner — dashboard and orders only</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <Link href="/admin/users" className="btn btn-ghost">
          Cancel
        </Link>
      </div>
    </form>
  );
}
