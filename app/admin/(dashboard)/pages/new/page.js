import { createPage } from "../actions";
import PageForm from "../PageForm";

export const metadata = { title: "New page — WASHERO Admin" };

export default function NewPagePage() {
  return (
    <>
      <div className="dash-head">
        <div>
          <h1>New page</h1>
        </div>
      </div>
      <PageForm action={createPage} />
    </>
  );
}
