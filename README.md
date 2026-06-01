# IT-ALUMNI Platform 🚀

A modern web application connecting IT professionals, alumni, and industry experts to build meaningful professional networks and career opportunities.

---

## 📋 Overview

IT-ALUMNI is a dynamic platform designed to foster connections within the IT community. It provides a centralized hub where professionals can:

- **Network** with fellow IT professionals and alumni
- **Discover Jobs** tailored to IT skills and experience
- **Share Knowledge** through testimonials and community insights
- **Build Careers** by connecting with industry leaders and opportunities

---

## ✨ Features

### 🏠 Home Page
- Curated dashboard with highlights
- Testimonials from the community
- Quick navigation to key sections

### 💼 Jobs Portal
- Browse IT job opportunities
- Filter by:
  - Technology stack
  - Location
  - Experience level
- Sort by relevance, recency, or salary
- Responsive design for mobile and desktop

### 🤝 Networking
- Connect with other IT professionals
- Browse member profiles
- Find mentors and collaborators
- Community-driven engagement

### 📱 Mobile-First Design
- Fully responsive interface
- Optimized mobile experience
- Touch-friendly navigation

---

## 🛠️ Tech Stack

- **Frontend Framework**: TypeScript + Vite
- **Styling**: CSS with responsive design patterns
- **Architecture**: Component-based with centralized page management
- **Package Manager**: npm

### Key Dependencies
- TypeScript ~6.0.2
- Vite ^8.0.12

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hectordev4/Projecte-IT-ALUMNI.git
   cd Projecte-IT-ALUMNI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (or your configured Vite port)

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview the production build**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```
Projecte-IT-ALUMNI/
├── src/
│   ├── main.ts              # Application entry point
│   ├── components/          # Reusable UI components
│   │   ├── Card.ts
│   │   ├── TestimonialCard.ts
│   │   └── ...
│   ├── pages/               # Page components
│   │   ├── Home.ts
│   │   ├── Jobs.ts
│   │   ├── Networking.ts
│   │   └── ...
│   ├── managers/            # Business logic managers
│   │   └── pageManager.ts   # Centralized routing engine
│   ├── services/            # API & data services
│   │   ├── jobsService.ts
│   │   ├── networkingService.ts
│   │   └── ...
│   └── types/               # TypeScript type definitions
├── styles/
│   ├── style.css            # Global styles
│   ├── home.css
│   ├── jobs.css
│   ├── networking.css
│   └── components/          # Component-specific styles
├── public/                  # Static assets
├── index.html               # HTML entry point
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies
└── vite.config.ts          # Vite configuration (if applicable)
```

---

## 🎯 Core Concepts

### Page Manager
The `PageManager` is the centralized routing engine that handles:
- Page initialization and lifecycle
- Dynamic route navigation
- Component mounting/unmounting
- State management across pages

### Component Architecture
- **Reusable Components**: Card, TestimonialCard, and more
- **Service Layer**: Handles data fetching and business logic
- **Page Layer**: Orchestrates components and user interactions

---

## 📖 Usage Examples

### Running in Development
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```
Output files will be in the `dist/` directory.

### Type Checking
```bash
tsc
```

---

## 🔄 Development Workflow

1. Create components in `src/components/`
2. Add page logic in `src/pages/`
3. Implement services in `src/services/`
4. Define types in `src/types/`
5. Style with CSS in the `styles/` directory
6. Test locally with `npm run dev`
7. Build and preview with `npm run build && npm run preview`

---

## 📱 Responsive Design

The platform is built with a mobile-first approach:
- **Mobile Views**: Optimized for small screens with touch-friendly interfaces
- **Desktop Views**: Enhanced layouts for larger screens with additional features
- **Breakpoints**: Strategic CSS media queries ensure smooth transitions

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Make your changes
3. Commit with clear messages
4. Push to your branch
5. Open a pull request

---

## 📝 License

This project is part of the IT-ALUMNI initiative. For license details, see the LICENSE file.

---

## 👥 Community & Support

- **Questions?** Open an issue on GitHub
- **Feature Requests?** We'd love to hear your ideas
- **Want to Network?** Join our community on the platform!

---

## 🎉 Acknowledgments

Built with ❤️ by the IT-ALUMNI community team.

---

**Happy Networking! 🚀**
