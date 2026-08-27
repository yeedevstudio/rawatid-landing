import ForgotPasswordForm from "@/module/forgot-password";

export const metadata = {
  title: "Lupa Password | Rawat.id",
  description:
    "Atur ulang password akun Rawat.id Anda. Masukkan email terdaftar untuk menerima tautan reset password.",
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 md:p-10">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
