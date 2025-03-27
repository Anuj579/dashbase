# DashBase — Admin Dashboard

A responsive Admin Dashboard built with **Next.js**, **React**, and **Tailwind CSS**, featuring:

- ✅ Pagination
- ✅ Searching
- ✅ Sorting (by Name)
- ✅ Sidebar Navigation
- ✅ Authentication (Login & Signup)
- ✅ Responsive UI
- ✅ Dark Mode with ShadCN

Live demo: [[https://dashbase-drab.vercel.app/](https://dashbase-drab.vercel.app/)]

---

## 🔧 Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: React + Tailwind CSS + ShadCN UI
- **Auth**: Custom login & signup
- **Icons**: Lucide React

---

## 🚀 Features

- Fully functional **login/signup authentication**
- **Protected route** – redirects if user is not logged in
- **Pagination** – only 5 users per page
- **Search** – by name, email, role, or status
- **Sorting** – click name column to toggle ascending/descending
- **Responsive sidebar** – collapses into drawer on mobile
- **Dark mode** – using ShadCN theme

---

## 📁 Folder Structure

```
/app
  /auth (login & signup pages)
  /dashboard (main page)

/components
  Navbar.jsx
  Sidebar.jsx
  DataTable.jsx

/context
  UserContext.jsx
```

---

## 📦 Installation & Running Locally

```bash
git clone https://github.com/Anuj579/dashbase.git
cd dashbase
npm install
npm run dev
```

---

## 🧑‍💻 Author

**Anuj** — [@anujbuilds](https://instagram.com/anujbuilds)
