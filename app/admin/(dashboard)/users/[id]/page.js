import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { updateUser } from "../actions";
import UserForm from "../UserForm";

export const metadata = { title: "Edit user — WASHERO Admin" };

export default async function EditUserPage({ params }) {
  const { id } = await params;
  const { data: user } = await supabaseAdmin().from("admin_users").select("*").eq("id", id).single();
  if (!user) notFound();

  return (
    <>
      <div className="dash-head">
        <div>
          <h1>Edit user</h1>
        </div>
      </div>
      <UserForm action={updateUser.bind(null, id)} defaultValues={user} isEdit />
    </>
  );
}
