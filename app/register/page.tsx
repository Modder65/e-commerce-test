import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <main className="flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-r from-sky-300 via-sky-500 to-sky-700">
      <div>
        <RegisterForm />
      </div>
    </main>
  );
}