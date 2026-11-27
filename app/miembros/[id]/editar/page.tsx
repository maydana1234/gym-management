import "../../../../components/organisms/members.css";
import EditarMiembroForm from "./EditarMiembroForm";

export default function EditarMiembroPage() {
  return (
    <main className="app-shell">
      <section className="members-screen">
        <EditarMiembroForm />
      </section>
    </main>
  );
}