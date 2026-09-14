// Konstanta Kalkulator TDEE, dipakai oleh form/hasil dan halaman riwayat.

export const TDEE_RESULT_KEY = "tdee_result";
export const TDEE_PENDING_LOGIN_KEY = "tdee_pending_login";
export const TDEE_CALCULATOR_URL = "/alat-kesehatan/kalkulator-tdee";
export const TDEE_HISTORY_URL = "/alat-kesehatan/kalkulator-tdee/riwayat-tdee";

export const TDEE_INFO_SECTIONS = [
  {
    title: (
      <>
        Apa itu TDEE (<i>Total Daily Energy Expenditure</i>)
      </>
    ),
    paragraphs: [
      "TDEE (Total Daily Energy Expenditure) adalah perkiraan berapa banyak kalori yang dibakar per hari dengan mempertimbangkan berdasarkan aktivitas fisik yang dilakukan harian.",
      <>
        Hasil dari perhitungan tersebut akan didapatkan angka berupa jumlah kkal yang digunakan sebagai total kebutuhan
        harian kalori atau TDEE (<i>Total Daily Energy Expenditure</i>).
      </>,
      "Jika tujuannya untuk mempertahankan berat badan, disarankan untuk mengkonsumsi makanan dengan total kalori harian di sekitaran angka tersebut.",
      "Namun jika tujuannya untuk menurunkan berat badan, disarankan untuk memiliki asumsi kalori harian lebih rendah dari angka tersebut, dan jika tujuan untuk menambah berat badan, makan disarankan untuk memiliki asupan kalori harian diatas angka tersebut.",
    ],
  },
  {
    title: "Standar Pengukuran Internasional",
    paragraphs: [
      <>
        Untuk menentukan total kebutuhan kalori harian, ahli gizi biasanya melakukan perhitungan untuk mendapatkan nilai
        TDEE (<i>Total Daily Energy Expenditure</i>).
      </>,
      "Standar ini pertama kali diperkenalkan oleh M.D. Mifflin and S.T. St. Jeor pada tahun 1990. Kemudian metode ini diadopsi oleh organisasi seperti Academy of Nutrition and Dietetics sebagai standar berbasis bukti untuk memprediksi pengeluaran energi.",
    ],
  },
];
