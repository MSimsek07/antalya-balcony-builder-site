# 🏗️ Cam Balkon Antalya Website

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-black.svg)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Modern, profesyonel ve kullanıcı dostu bir cam balkon şirketi web sitesi.

![Website Preview](public/placeholder.svg)

## 📚 İçindekiler

- [🚀 Özellikler](#-özellikler)
- [⚙️ Teknolojiler](#️-teknolojiler)
- [🛠️ Kurulum](#️-kurulum)
- [👩‍💻 Geliştirme](#-geliştirme)
- [📋 Proje Yapısı](#-proje-yapısı)
- [🔒 Admin Paneli](#-admin-paneli)
- [🌐 Deployment](#-deployment)
- [📄 Lisans](#-lisans)

## 🚀 Özellikler

- ✨ Modern ve duyarlı tasarım
- 📱 Mobil öncelikli kullanıcı arayüzü
- 🎨 Özelleştirilebilir tema sistemi
- 🖼️ Dinamik galeri ve portföy yönetimi
- 📝 Blog ve içerik yönetim sistemi
- 📊 Kapsamlı admin paneli
- 🔍 SEO optimizasyonu
- 🌍 Çoklu dil desteği (TR/EN)
- 💬 WhatsApp entegrasyonu
- 📈 Google Analytics entegrasyonu

## ⚙️ Teknolojiler

- **Frontend Framework:** React 18
- **Dil:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context
- **Form Management:** React Hook Form
- **Validasyon:** Zod
- **Routing:** React Router
- **HTTP Client:** Axios
- **Icons:** Lucide Icons

## 🛠️ Kurulum

```bash
# Depoyu klonlayın
git clone https://github.com/yourusername/antalya-balcony-builder-site.git

# Proje dizinine gidin
cd antalya-balcony-builder-site

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## 👩‍💻 Geliştirme

### Ortam Değişkenleri

\`.env\` dosyasını oluşturun:

```env
VITE_API_URL=your_api_url
VITE_WHATSAPP_NUMBER=your_whatsapp_number
```

### Komutlar

```bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint

# Type checking
npm run typecheck
```

## 📋 Proje Yapısı

```
src/
├── components/     # UI bileşenleri
├── hooks/         # Custom React hooks
├── lib/           # Yardımcı fonksiyonlar
├── pages/         # Sayfa bileşenleri
└── admin/         # Admin panel bileşenleri
```

## 🔒 Admin Paneli

Admin paneli şu özelliklere sahiptir:

- 📊 Dashboard ve analitikler
- 🖼️ Galeri yönetimi
- 📝 İçerik yönetimi
- 💬 Mesaj yönetimi
- ⚙️ Site ayarları
- 👥 Kullanıcı yönetimi

## 🌐 Deployment

Bu proje [Lovable](https://lovable.dev) platformunda barındırılmaktadır.

### Özel Alan Adı Yapılandırması

1. DNS sağlayıcınızda bir CNAME kaydı oluşturun
2. Lovable'da "Domains" bölümüne gidin
3. Alan adınızı ekleyin ve yapılandırın

Detaylı bilgi için: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şunları yapın:

1. Bu depoyu fork edin
2. Yeni bir özellik dalı oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: add amazing feature'`)
4. Dalınıza push yapın (`git push origin feature/amazing-feature`)
5. Bir Pull Request açın

## 📧 İletişim

- Website: [cambalkonantalya.com](https://cambalkonantalya.com)
- Email: [info@cambalkonantalya.com](mailto:info@cambalkonantalya.com)
- WhatsApp: [+90 555 555 55 55](https://wa.me/905454043462)

---

# .env file
