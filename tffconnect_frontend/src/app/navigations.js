export const navigations = [
  { name: 'Ana Sayfa', path: '/dashboard', icon: 'home' },
  { name: 'Favorilediklerim', path: '/favorites', icon: 'favorite' },
  { label: 'TFF GÜNCEL', type: 'label' },
  {
    name: 'Session/Auth',
    icon: 'security',
    children: [
      { name: 'Hakem Ekle', iconText: 'HE', path: "/material/AddReferees" },
      { name: 'Hakemleri Listele ve Sil', iconText: 'HL', path: "/material/ListReferees" },
      { name: 'Lig Durumu', path: "" },
      { name: 'Projeler', path: "" },
      { name: 'Hakemler-Maçlar', path: '/data/referee_games' },
      { name: 'Proje Ekle', iconText: 'PE', path: '/material/addproject' },
      { name: 'Proje Listele', iconText: 'PL', path: '/material/listproject' },
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
