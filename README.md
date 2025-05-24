# Assistive Technology Marketplace - React Frontend

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technical Specifications](#technical-specifications)
- [Accessibility Standards](#accessibility-standards)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Project Overview

The **Centralized Assistive Technology Marketplace for Kenya** is a React-based frontend application designed to create an inclusive e-commerce platform for persons with disabilities (PWDs). It serves as a one-stop marketplace for assistive products, incorporating comprehensive accessibility features.

**Core Objectives:**

- Provide accessible shopping experience for PWDs
- Aggregate assistive technology products from multiple vendors
- Offer price comparison and financing options
- Connect users with support services and community resources

---

## Key Features

### 1. User Interface

- **Responsive Design**: Mobile-first with PWA capabilities
- **Multi-Language Support**: English and Swahili
- **Customizable Views**: High-contrast mode, text resizing, simplified layouts
- **Multiple Access Methods**: Web, mobile app, and SMS/USSD

### 2. Product Management

- Detailed product catalog
- Advanced filtering (disability type, price, features)
- Image recognition & voice search
- Product comparison tools

### 3. Accessibility Features

- WCAG 2.1 AA compliance
- ARIA labeling and screen reader optimization
- Kenyan Sign Language (KSL) video support
- Voice navigation (English & Swahili)
- Text-to-speech functionality

### 4. AI Integration

- Voice assistant for hands-free navigation
- Computer vision for product identification
- Smart recommendation engine
- AI-powered chatbots with multi-modal support

### 5. Community & Support

- Discussion forums & peer channels
- Professional consultation booking
- Tutorials and training resources
- Repair & maintenance services directory

---

## Technical Specifications

- **Framework**: React 18+
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Styling**: Sass + CSS Modules
- **Accessibility**: React Aria, Reach UI
- **Internationalization**: i18next
- **API Client**: Axios
- **Testing**: Jest, React Testing Library, Cypress
- **Build Tool**: Vite

---

## Accessibility Standards

The application strictly follows:

- WCAG 2.1 AA guidelines
- Kenya's ICT Accessibility Standard (KS 2952-1:2022)
- ARIA authoring practices
- Mobile accessibility best practices

**Testing Tools:**

- NVDA & VoiceOver (screen readers)
- Keyboard navigation
- Color contrast analyzers
- Cognitive load evaluation tools

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-org/assistive-tech-marketplace.git
cd assistive-tech-marketplace
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

```bash
cp .env.example .env
# Populate .env with your environment variables
```

Start the development server:

```bash
npm run dev
```

---

## Project Structure

```
src/
├── assets/               # Static assets
├── components/           # Reusable UI components
│   ├── accessibility/    # Accessibility-specific components
│   ├── ai/               # AI integration components
│   ├── products/         # Product components
├── config/               # App configuration
├── contexts/             # React contexts
├── features/             # Redux slices and feature logic
├── hooks/                # Custom hooks
├── layouts/              # Page layouts
├── locales/              # i18n files
├── pages/                # App pages
├── services/             # API services
├── styles/               # Sass and global styles
├── types/                # TypeScript definitions
├── utils/                # Utility functions
├── App.tsx               # Main component
└── main.tsx              # Entry point
```

---

## Configuration

Set these environment variables in `.env`:

```env
VITE_API_BASE_URL=
VITE_GOOGLE_ANALYTICS_ID=
VITE_SENTRY_DSN=
VITE_MAPBOX_ACCESS_TOKEN=
VITE_AI_VOICE_SERVICE_URL=
```

---

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run accessibility` - Run accessibility audit
- `npm run analyze` - Analyze bundle size

---

## Testing

**Unit Tests**

```bash
npm test
```

**Component Tests**

```bash
npm run test:components
```

**Accessibility Tests**

```bash
npm run test:accessibility
```

**End-to-End Tests**

```bash
npm run test:e2e
```

---

## Deployment

Optimized for deployment to:

- **Vercel**
- **AWS Amplify**
- **Netlify**

Deployment requires:

- Production API endpoints
- CDN for assets
- Cache headers for PWA
- Monitoring setup (e.g., Sentry)

---

## Contributing

We welcome community contributions!

**Steps:**

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push branch: `git push origin feature/your-feature`
5. Open a Pull Request

**Accessibility Requirements:**

- Keyboard navigability
- Proper ARIA attributes
- High contrast mode support
- Screen reader announcements
- Focus management

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

_Special thanks to contributors._
