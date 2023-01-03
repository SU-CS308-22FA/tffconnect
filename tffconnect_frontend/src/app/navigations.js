export const navigations = [
  { name: 'Ana Sayfa', path: '/dashboard', icon: 'home' },
  { name: 'Favorilediklerim', path: '/favorites', icon: 'favorite' },
  { label: 'TFF GÜNCEL', type: 'label' },
  {
    name: 'Güncel Veriler',
    icon: 'public',
    children: [
      { name: 'Lig Durumu', path: "" },
      { name: 'Hakemler', path: "" },
      { name: 'Hakemler-Maçlar', path: '/data/referee_games' },
      { name: 'Tüm Projeler', path: "/material/ProjectsDashboard" },
      { name: 'Proje Ekle', iconText: 'PE', path: '/material/addproject' },
      { name: 'Projelerimi Listele', iconText: 'PL', path: '/material/listproject' },
      { name: 'Profilim', iconText: 'P', path: '/material/userprofile' },
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
