import { createUser } from "../actions";
import UserForm from "../UserForm";

export const metadata = { title: "New user — WASHERO Admin" };

export default function NewUserPage() {
  return (
    <>
      <div className="dash-head">
        <div>
          <h1>New user</h1>
        </div>
      </div>
      <UserForm action={createUser} />
    </>
  );
}
