# 🏗️ Cam Balkon Antalya Website

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-black.svg)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Modern, professional, and user-friendly website for a cam balkon (glass balcony) company.

![Website Preview](![image](https://github.com/user-attachments/assets/8841c35c-244a-44c5-b795-6b25675170a4))

## 📚 Table of Contents

- [🚀 Features](#-features)
- [⚙️ Technologies](#️-technologies)
- [🛠️ Installation](#️-installation)
- [👩‍💻 Development](#-development)
- [📋 Project Structure](#-project-structure)
- [🔒 Admin Panel](#-admin-panel)
- [🌐 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📧 Contact](#-contact)

## 🚀 Features

- ✨ Modern and responsive design
- 📱 Mobile-first user interface
- 🎨 Customizable theme system
- 🖼️ Dynamic gallery and portfolio management
- 📝 Blog and content management system
- 📊 Comprehensive admin panel
- 🔍 SEO optimization
- 🌍 Multi-language support (TR/EN)
- 💬 WhatsApp integration
- 📈 Google Analytics integration
- ♿ Accessibility enhancements

## ⚙️ Technologies

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **State Management:** React Context
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Routing:** React Router
- **HTTP Client:** Axios
- **Icons:** Lucide Icons
- **Cloudinary:** Image and video management
- **Firebase:** Authentication and data storage

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/antalya-balcony-builder-site.git

# Navigate to the project directory
cd antalya-balcony-builder-site

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 👩‍💻 Development

### Environment Variables

Create a \`.env\` file:

```env
VITE_API_URL=your_api_url
VITE_WHATSAPP_NUMBER=your_whatsapp_number
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
VITE_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Commands

```bash
# Development server
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

## 📋 Project Structure

```
src/
├── components/     # UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
├── admin/         # Admin panel components
├── data/          # Static data
└── types/         # TypeScript types
```

## 🔒 Admin Panel

The admin panel includes the following features:

- 📊 Dashboard and analytics
- 🖼️ Gallery management
- 📝 Content management
- 💬 Message management
- ⚙️ Site settings
- 👥 User management

### Custom Domain Configuration

1. Create a CNAME record in your DNS provider.
2. Go to the "Domains" section in Lovable.
3. Add and configure your domain.

For detailed information: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'feat: add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

### Contributors

*   [Müşerref Selçuk Özdemir](https://github.com/SelcukOzdemir23)
*   [Ahmet Yıldız](https://github.com/AhmtYldz0772)

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

