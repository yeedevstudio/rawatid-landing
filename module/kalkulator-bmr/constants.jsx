// Konstanta Kalkulator BMR, dipakai oleh form/hasil dan halaman riwayat.

export const BMR_RESULT_KEY = "bmr_result";
export const BMR_PENDING_LOGIN_KEY = "bmr_pending_login";
export const BMR_CALCULATOR_URL = "/alat-kesehatan/kalkulator-bmr";
export const BMR_HISTORY_URL = "/alat-kesehatan/kalkulator-bmr/riwayat-bmr";

export const BMR_INFO_SECTIONS = [
  {
    title: (
      <>
        Apa itu BMR (<i>Basal Metabolic Rate</i>)
      </>
    ),
    paragraphs: [
      <>
        <i>Basal Metabolic Rate</i> (BMR) adalah jumlah minimum kalori yang dibakar tubuh saat istirahat untuk
        mempertahankan fungsi-fungsi penting tubuh seperti bernapas, memompa darah, memelihara suhu tubuh dan produksi
        sel.
      </>,
      <>
        Hasil dari perhitungan <i>Basal Metabolic Rate</i> akan didapatkan angka berupa jumlah kkal, angka ini jumlah
        kalori yang dibutuhkan oleh tubuh saat istirahat untuk mempertahankan fungsi-fungsi penting tubuh.
      </>,
      <>
        Jumlah kalori hasil dari perhitungan <i>Basal Metabolic Rate</i> juga digunakan sebagai salah satu nilai untuk
        menghitung jumlah kalori harian yang dibutuhkan tubuh untuk beraktivitas, yaitu dengan mengalikan nilai BMR
        dengan nilai aktivitas fisik harian (PAL/Physical Activity Level).
      </>,
    ],
  },
  {
    title: "Standar Pengukuran Internasional",
    paragraphs: [
      <>
        Untuk menghitung <i>Basal Metabolic Rate</i> (BMR), organisasi-organisasi kesehatan dunia menyarankan untuk
        menggunakan rumus Mifflin-St Jeor.
      </>,
      "Rumus ini diperkenalkan pada tahun 1990 dan saat ini direkomendasikan oleh banyak organisasi kesehatan karena dianggap sebagai standar yang paling akurat untuk gaya hidup manusia modern.",
    ],
  },
];
