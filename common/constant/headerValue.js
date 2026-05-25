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
    title: "Interaktif",
    url: "/interaktif",
  },
  {
    title: "Alat Kesehatan Digital",
    url: "/alat-kesehatan",
  },
  {
    title: "Sistem Digital Faskes",
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
    groupTitle: "Sistem Digital Faskes",
    groupUrl: "/sistem-faskes",
    // Keep the Sistem Faskes subnav visible when users land on
    // RME-related pages that live outside `/sistem-faskes` (e.g. `/fitur`, `/register`).
    matchPrefixes: ["/sistem-faskes", "/fitur", "/register"],
    sections: [
      {
        sectionTitle: "Rekam Medis Elektronik",
        sectionUrl: "/sistem-faskes/rekam-medis-elektronik",
        matchPrefixes: [
          "/sistem-faskes/rekam-medis-elektronik",
          "/fitur",
          "/register",
        ],
        items: [
          {
            title: "Fitur RME",
            url: "/fitur",
          },
          {
            title: "Registrasi RME",
            url: "/register",
          },
          {
            title: "Uji Coba RME",
            url: "https://demo.rawat.id/",
          },
          {
            title: "Panduan Penggunaan RME",
            url: "https://panduan.rawat.id/",
          },
        ],
      },
    ],
  },
  {
    groupTitle: "Alat Kesehatan Digital",
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
    groupTitle: "Interaktif",
    groupUrl: "/interaktif",
    matchPrefixes: [
      "/interaktif",
      "/cacar-air",
      "/dbd",
      "/herpes-simplex",
      "/hepatitis",
      "/demam-tifoid",
    ],
    items: [
      { title: "Cacar Air vs Cacar Ular", url: "/interaktif/cacar-air" },
      { title: "Demam Berdarah Dengue (DBD)", url: "/interaktif/dbd" },
      { title: "Herpes Simplex", url: "/interaktif/herpes-simplex" },
      { title: "Hepatitis A", url: "/interaktif/hepatitis" },
      { title: "Poliomielitis", url: "/interaktif/poliomielitis" },
      { title: "Tipes (Demam Tifoid)", url: "/interaktif/demam-tifoid" },
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
