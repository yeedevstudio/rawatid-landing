export const headerValue = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "Tentang Kami",
    url: "/tentang-kami",
  },
  {
    title: "Lihat Fitur",
    url: "/fitur",
  },
  { title: "Blog", url: "/blog" },
  {
    title: "Demo",
    url: "https://demo.rawat.id",
  },
];

export const headerValueBlog = [
  {
    title: "Beranda",
    url: "/",
  },
  {
    title: "Informasi Kesehatan",
    url: "/informasi-kesehatan/informasi-obat",
  },
  {
    title: "Artikel",
    url: "/blog",
  },
  {
    title: "Alat Kesehatan",
    url: "/alat-kesehatan",
  },
  {
    title: "Sistem Faskes",
    url: "/sistem-faskes",
  },
];

export const blogSubnavGroups = [
  {
    groupTitle: "Informasi Kesehatan",
    groupUrl: "/informasi-kesehatan/informasi-obat",
    matchPrefixes: [
      "/informasi-kesehatan",
      "/informasi-kesehatan/informasi-obat",
      "/informasi-kesehatan/informasi-menu-diet",
      "/informasi-kesehatan/informasi-rs-dan-klinik",
    ],
    items: [
      { title: "Informasi Obat", url: "/informasi-kesehatan/informasi-obat" },
      {
        title: "Informasi Menu Diet",
        url: "/informasi-kesehatan/informasi-menu-diet",
      },
      {
        title: "Informasi RS dan Klinik",
        url: "/informasi-kesehatan/informasi-rs-dan-klinik",
      },
    ],
  },
  {
    groupTitle: "Sistem Faskes",
    groupUrl: "/sistem-faskes",
    matchPrefixes: ["/sistem-faskes"],
    sections: [
      {
        sectionTitle: "Rekam Medis Elektronik",
        sectionUrl: "/sistem-faskes/rekam-medis-elektronik",
        matchPrefixes: ["/sistem-faskes/rekam-medis-elektronik"],
        items: [
          {
            title: "Fitur RME",
            url: "/sistem-faskes/rekam-medis-elektronik/fitur-rme",
          },
          {
            title: "Registrasi RME",
            url: "/sistem-faskes/rekam-medis-elektronik/registrasi-rme",
          },
          {
            title: "Uji Coba RME",
            url: "/sistem-faskes/rekam-medis-elektronik/uji-coba-rme",
          },
          {
            title: "Panduan Penggunaan RME",
            url: "/sistem-faskes/rekam-medis-elektronik/panduan-penggunaan-rme",
          },
        ],
      },
    ],
  },
  {
    groupTitle: "Alat Kesehatan",
    groupUrl: "/alat-kesehatan/kalkulator-bmi",
    matchPrefixes: [
      "/alat-kesehatan",
      "/alat-kesehatan/kalkulator-bmi",
      "/alat-kesehatan/pengingat-minum-obat",
      "/alat-kesehatan/rencana-diet",
      "/alat-kesehatan/personal-health-record",
    ],
    items: [
      { title: "Kalkulator BMI", url: "/alat-kesehatan/kalkulator-bmi" },
      {
        title: "Pengingat Minum Obat",
        url: "/alat-kesehatan/pengingat-minum-obat",
      },
      { title: "Rencana Diet", url: "/alat-kesehatan/rencana-diet" },
      {
        title: "Personal Health Record",
        url: "/alat-kesehatan/personal-health-record",
      },
    ],
  },
  {
    groupTitle: "Artikel",
    groupUrl: "/blog",
    matchPrefixes: [
      "/blog",
      "/blog/semua",
      "/blog/kategori",
      "/blog/detail",
      "/blog/tag",
      "/blog/penulis",
      "/blog/cari",
    ],
    items: [
      { title: "Kesehatan", url: "/blog/kategori/kesehatan" },
      { title: "Tenaga Kesehatan", url: "/blog/kategori/tenaga-kesehatan" },
      {
        title: "Fasilitas Kesehatan",
        url: "/blog/kategori/fasilitas-kesehatan",
      },
      { title: "Bioteknologi", url: "/blog/kategori/bioteknologi" },
      {
        title: "Teknologi Kesehatan",
        url: "/blog/kategori/teknologi",
      },
      { title: "Informasi Umum", url: "/blog/kategori/informasi-umum" },
    ],
  },
];
