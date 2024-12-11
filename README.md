# Startstack

A production-ready free SaaS starter kit built with Next.js, featuring authentication, organization management, payments, and analytics out of the box.

## 🚀 Features

- Magic Link Auth: login with better-auth & resend, plus GitHub OAuth.
- Role-Based Access: protected routes, middleware, and team roles.
- Multi-Organization Support: manage teams, settings, and user preferences.
- Modern UI/UX: tailwind css, dark/light mode, customizable dashboards.
- Type-Safe Development: typescript, drizzle orm, postgres, zod validation.
- Analytics Integration: track usage with posthog.
- Payment Integration (soon): stripe, paddle, and flexible billing.

## 📦 Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Authentication:** [Better-Auth](https://github.com/better-auth)
- **Database:** [PostgreSQL](https://www.postgresql.org)
- **ORM:** [Drizzle](https://orm.drizzle.team)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **Email:** [Resend](https://resend.com)
- **Analytics:** [PostHog](https://posthog.com)
- **Form Validation:** [Zod](https://zod.dev)
- **Environment Variables:** [T3 Env](https://env.t3.gg)

## 🚗 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/warisareshi/startstack.git
cd saas-starter
```

2. Install dependencies:

```bash
pnpm install
```

3. Copy the example environment file:

```bash
cp .env.example .env
```

4. Update the environment variables in `.env` with your:

- Database credentials
- Better-Auth configuration
- GitHub OAuth credentials
- Resend API key
- PostHog API key

5. Run database migrations:

```bash
pnpm drizzle:generate:dev
pnpm drizzle:migrate:dev
```

6. Start the development server:

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your application.

## 📝 Environment Variables (\* means optional)

```env
# Database
DATABASE_URL_DEVELOPMENT=
DATABASE_URL_PRODUCTION*=

# Authentication
BETTER_AUTH_SECRET=
GITHUB_CLIENT_ID*=
GITHUB_CLIENT_SECRET*=

# OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Email
RESEND_API_KEY=

# Analytics
POSTHOG_API_KEY=

#Essentials
NEXT_PUBLIC_APP_URL=
```

## 🛣️ Roadmap

### ✅ Implemented

- [x] Magic Link Authentication with better-auth and Resend
- [x] GitHub OAuth Integration
- [x] Protected Routes
- [x] Organization Management
  - [x] Multi-organization support
  - [x] Team invitations
  - [x] Organization settings
- [x] User Settings
- [x] Dark/Light Mode
- [x] Dashboard & Sidebar (shadcn)
- [x] T3 Env Integration
- [x] Zod Validation
- [x] Drizzle + PostgreSQL Setup
- [x] PostHog Analytics

### 🚧 Upcoming

- [ ] Stripe Integration
- [ ] Paddle Integration
- [ ] Admin Dashboard
- [ ] Better Design

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💫 Support

If you like this project, please give it a ⭐️!

For support, issues, or feature requests, create an issue on the GitHub repository.
