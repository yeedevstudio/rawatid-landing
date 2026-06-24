import SignupForm from "@/module/signup";

export const metadata = {
  title: "Daftar Akun Baru | Rawat.id",
  description: "Buat akun Rawat.id untuk mengakses fitur kesehatan lengkap.",
};

export default function SignupPage() {
  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 md:p-10">
        <SignupForm />
      </div>
    </div>
  );
}
