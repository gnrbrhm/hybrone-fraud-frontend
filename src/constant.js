export const NAVIGATON = [
  // { label: "Takip", route: "tracked" },
  { label: 'Dashboard', route: '/dashboard/panel' },
  { label: 'Liste', route: '/list/panel' },
  // { label: "Harita", route: "/map" },
  //   { label: "Servisler", route: "/services" },
  { label: 'Mekanlar', route: '/premises' },
  { label: 'Ayarlar', route: '/settings' }
  // { label: "Çıkış", route: "/logout" },
]
export const HARDWARE_TYPES = [
  {
    value: 2,
    label: 'KAYIT CİHAZI',
    key: 'CAMERA',
    brands: [
      {
        value: 1,
        label: 'Dahua',
        models: [{ value: 1, label: 'VG-4C2-LRPU-A' }]
      }
    ]
  },
  {
    value: 1,
    label: 'HIRSIZ ALARM PANELİ',
    key: 'PANEL',
    brands: [
      {
        value: 2,
        label: 'Prosec',
        models: [{ value: 2, label: 'PRO-P83' }]
      }
    ]
  }
]
export const DEVICE_TYPES = [
  {
    value: 2,
    label: 'Kayıt Cihazı',
    key: 'camera',
    valid: false,
    route: '/camera'
  },
  {
    id: 3,
    label: 'Hırsız Alarm Paneli',
    key: 'PANEL',
    valid: true,
    route: '/panel'
  }
]
export const DASHBOARD_VARIABLES = {
  HAP: [
    {
      title: 'Genel Cihaz Durumu',
      state: {
        series: {
          total: { label: 'Toplam', value: 10 },
          online: { label: 'Online', value: 5 },
          offline: { label: 'Offline', value: 5 }
        },
        colors: ['#6FCF97', '#A0A0A0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Alarm Durumu',
      state: {
        series: {
          normal: { label: 'Normal', value: 4 },
          alarm: { label: 'Alarm', value: 10 }
        },
        colors: ['#6FCF97', '#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Kurulu/Çözülü Durumu',
      state: {
        series: {
          arm: { label: 'Kurulu', value: 10 },
          disarm: { label: 'Çözülü', value: 10 }
        },
        colors: ['#6FCF97', '#E04141', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Enerji Durumu',
      state: {
        series: {
          normal: { label: 'Normal', value: 10 },
          low_charge: { label: 'Enerji Yok', value: 10 }
        },
        colors: ['#007DB7', '#A0A0A0', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Batarya Durumu',
      state: {
        series: {
          normal: { label: 'Normal', value: 10 },
          low: { label: 'Zayıf', value: 10 }
        },
        colors: ['#6FCF97', '#F2994A', 'rgba(255,87,93,.77)']
      }
    },
    {
      title: 'Diğer Durumlar',
      state: {
        series: {
          normal: { label: 'Normal', value: 10 },
          sabotage: { label: 'Sabotaj', value: 10 },
          fault: { label: 'Hata', value: 10 }
        },
        colors: ['#6FCF97', '#E04141', '#9B51E0', 'rgba(255,87,93,.77)']
      }
    }
  ]
}
export const LIST_FILTER = [
  {
    label: 'ID/LOKASYON GİRİNİZ',
    type: 'input',
    placeholder: 'ID/LOKASYON GİRİNİZ',
    svg_icon: null,
    valid: true
  },
  {
    label: 'Cihaz Tipi',
    type: 'select',
    placeholder: null,
    svg_icon: null,
    valid: true
  },
  {
    label: 'ID/LOKASYON GİRİNİZ',
    type: 'input',
    placeholder: 'ID/LOKASYON GİRİNİZ',
    svg_icon: null,
    valid: true
  },
  {
    label: 'ID/LOKASYON GİRİNİZ',
    type: 'input',
    placeholder: 'ID/LOKASYON GİRİNİZ',
    svg_icon: null,
    valid: true
  }
]

export const DEVICE_STATUS = [
  { label: 'Sistem Kuruldu', value: '1' },
  { label: 'Sistem Çözüldü', value: '2' }
]
export const PREMISE_DEVICES = [
  {
    id: 1,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 2,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 3,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 5,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  },
  {
    id: 6,
    vendor: 'VGuard',
    model: 'VG-4C2P-NVR',
    inventory_no: 4083308,
    serial_no: 123456789,
    hardware_type: 'NVR'
  }
]
export const ACTIONS_FIELDS = {
  ACTIONS: [
    {
      cronic_fault: {
        options: [
          { label: 'YES', value: true },
          { label: 'NO', value: false }
        ],
        type: 'selectbox',
        label: 'Raporlanmasın (Kronik Hata)'
      },
      location_off: {
        options: [
          { label: 'YES', value: true },
          { label: 'NO', value: false }
        ],
        type: 'selectbox',
        label: 'Lokasyon Devre Dışı Bırakılsın mı?'
      }
    }
  ],
  SERVICE: [
    {
      state: {
        options: [
          { label: 'Genel Kontrol (Bakım)', value: 'general' },
          { label: 'Genel Arıza', value: 'general_fault' },
          { label: 'Batarya Hatası', value: 'battery_fault' },
          { label: 'İletişim Hatası', value: 'communication_fault' }
        ]
      }
    }
  ],
  REPORT: [
    {
      list: {
        options: [
          { label: 'Seçilen Cihazlar', value: 'selected' },
          { label: 'Tüm Cihazlar', value: 'all' }
        ]
      },
      type: {
        options: [
          // { label: "Verimlilik Raporu", value: "efficiency" },
          { label: 'Durum Raporu', value: 'status' }
          // { label: "Arızalı Cihazlar", value: "trouble" },
          // { label: "Alarm Alan Cihazlar", value: "alarmed" },
        ]
      },
      format: {
        options: [
          { label: 'Excel', value: 'excel' },
          { label: 'Csv', value: 'csv' },
          { label: 'Pdf', value: 'pdf' }
        ]
      }
    }
  ]
}

export const INDICATORS = [
  { communication: { status: false, label: 'İletişim' } },
  { energy: { status: false, label: 'Enerji Durumu' } },
  { battery: { status: false, label: 'Batarya Durumu' } },
  // { time: { status: false, label: "Tarih / Saat" } },
  {
    last_signal: {
      status: null,
      label: 'Son Sinyal',
      value: '23.11.2020 12:34'
    }
  }
]

export const SIGNALS_TYPES = [
  // { label: "Kur / Çöz", value: "arm_disarm" },
  // { label: "Zaman", value: "time" },
  // { label: "Enerji", value: "energy" },
  // { label: "İletişim", value: "communication" },
  // { label: "Alarm", value: "alarm" },
  // { label: "Hata", value: "trouble" },
  // { label: "Sabotaj", value: "sabotage" },
  // { label: "Batarya", value: "battery" },
  { label: 'Tüm Durumlar', value: 'all_state' },
  { label: 'Sistem Kuruldu', value: 'arm' },
  { label: 'Sistem Çözüldü', value: 'disarm' },
  { label: 'Alarm', value: 'alarm' },
  { label: 'Enerji Hatası', value: 'energy' },
  { label: 'Batarya Hatası', value: 'battery' },
  { label: 'Hata (Trouble)', value: 'trouble' },
  { label: 'Tarih/Saat Hatası', value: 'time_trouble' },
  { label: 'İletişim Hatası', value: 'communication' },
  { label: 'Sabotaj', value: 'sabotage' },
  { label: 'Sistem Durum', value: 'system_status' },
  { label: 'Bypass', value: 'bypass' }
]
export const PERSONAL_TITLES = [
  { key: 1, label: 'Bölge Sorumlusu' },
  { key: 2, label: 'Satış Sorumlusu' }
]