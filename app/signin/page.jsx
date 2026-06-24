import SigninForm from "@/module/signin";

export const metadata = {
  title: "Masuk | Rawat.id",
  description: "Masuk ke akun Rawat.id Anda.",
};

export default function SigninPage() {
  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 md:p-10">
        <SigninForm />
      </div>
    </div>
  );
}
