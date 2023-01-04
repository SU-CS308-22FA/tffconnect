export const navigations = [
  { name: 'Ana Sayfa', path: '/dashboard', icon: 'home' },
  { name: 'Favorilediklerim', path: '/favorites', icon: 'favorite' },
  { name: 'İnceleme Gerekiyor', path: '/data/reported_comments', icon: 'warning' },
  { label: 'TFF GÜNCEL', type: 'label' },
  {
    name: 'Güncel Veriler',
    icon: 'public',
    children: [
      { name: 'Lig Durumu', path: "" },
      { name: 'Hakem Ekle', iconText: 'HE', path: "/material/AddReferees" },
      { name: 'Hakemleri Listele ve Sil', iconText: 'HL', path: "/material/ListReferees" },
      { name: 'Hakemler-Maçlar', path: '/data/referee_games' },
      { name: 'Tüm Projeler', path: "/material/ProjectsDashboard" },
      { name: 'Proje Ekle', iconText: 'PE', path: '/material/addproject' },
      { name: 'Projelerimi Listele', iconText: 'PL', path: '/material/listproject' },
    ],
  },
  { label: 'OTURUM AÇ', type: 'label' },
  {
    name: 'Giriş Yap',
    icon: 'person',
    children: [
      { name: 'Oturum Aç', iconText: 'SI', path: '/session/signin' },
      { name: 'Kayıt Ol', iconText: 'SU', path: '/session/signup' },
    ],
  },
];
