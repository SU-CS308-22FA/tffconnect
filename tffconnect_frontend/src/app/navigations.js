export const navigations = [

  { name: 'Ana Sayfa', path: '/dashboard/default', icon: 'home' },
  { label: 'TFF GÜNCEL', type: 'label' },
  {
    name: 'Güncel Veriler',
    icon: 'public',
    children: [
      { name: 'Lig Durumu', iconText: 'LD', path: "" },
      { name: 'Hakemler', iconText: 'H', path: "" },
      { name: 'Projeler', iconText: 'P', path: '/material/addproject' },
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
