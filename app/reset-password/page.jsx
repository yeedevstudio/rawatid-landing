import ResetPasswordForm from "@/module/reset-password";

export const metadata = {
  title: "Atur Ulang Password | Rawat.id",
  description: "Buat password baru untuk akun Rawat.id Anda.",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({ searchParams }) {
  const params = await searchParams;
  // Token dikirim lewat tautan di email reset password: /reset-password?token=...
  const token = params?.token ?? params?.t ?? "";

  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-8 md:p-10">
        <ResetPasswordForm token={Array.isArray(token) ? token[0] : token} />
      </div>
    </div>
  );
}
