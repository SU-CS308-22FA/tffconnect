export const navigations = [

  { name: 'Ana Sayfa', path: '/dashboard/default', icon: 'home' },
  { label: 'TFF GÜNCEL', type: 'label' },
  {
    name: 'Güncel Veriler',
    icon: 'public',
    children: [
      { name: 'Lig Durumu', iconText: 'LD', path: "" },
      { name: 'Hakemler', iconText: 'H', path: "" },
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
