import { redirect } from "next/navigation";

export const metadata = {
  alternates: {
    canonical: "https://www.rawat.id/sistem-faskes",
  },
};

export default function SistemFaskesPage() {
  redirect("/sistem-faskes/rekam-medis-elektronik");
}

