## ⚠️ warning  
> **this project has been paused, is no longer active, and will not be maintained  in the future.**  
> **do not use in production. no updates or support will be provided.**

> i have since moved away from [next.js](https://nextjs.org) as the base building block for my applications and even for my company.  
> for marketing/public websites where seo and ssr is crucial, i recommend [astro](https://astro.build) with some sort of [cms](https://jamstack.org/headless-cms/).  
> for any webapps i recommend using [vite](https://vitejs.dev) + [react](https://react.dev) with [tanstack router](https://tanstack.com/router) and a [convex](https://convex.dev) backend, or [hono](https://hono.dev) with the [hono rpc client](https://hono.dev/docs/guides/rpc).


# a full-stack production-ready saas starter kit

![screenshot](public/images/landing_ss.png)

## features

- magic link auth: login with better-auth & resend, plus github oauth  
- protected access: protected routes and middleware  
- modern ui/ux: tailwind css, dark/light mode, and dashboards  
- type-safe development: typescript, drizzle orm, postgresql, zod validation  
- analytics: posthog integration  
- payments (upcoming): stripe, dodopayments, and billing options  

## tech stack

- framework: next.js  
- authentication: better-auth  
- database: postgresql  
- orm: drizzle  
- styling: tailwind css  
- email: resend  
- analytics: posthog  
- validation: zod  

## roadmap

### completed

- [x] magic link authentication with better-auth and resend  
- [x] github oauth integration  
- [x] protected routes  
- [x] user settings  
- [x] dark/light mode  
- [x] dashboard & sidebar (shadcn)  
- [x] t3 env integration  
- [x] zod validation  
- [x] drizzle + postgresql setup  
- [x] posthog analytics  
- [x] landing page  

### upcoming (cancelled)

- [ ] payments (stripe and dodopayments integration)  
- [ ] minor fixes here and there to improve ux & dx  
- [ ] ship v1  
- [ ] create full setup tutorial  

## contributing

1. fork the repository  
2. create a feature branch (`git checkout -b feature/yourfeature`)  
3. commit your changes (`git commit -m 'add yourfeature'`)  
4. push to the branch (`git push origin feature/yourfeature`)  
5. submit a pull request  

for issues or feature requests, create an issue in the github repository  
