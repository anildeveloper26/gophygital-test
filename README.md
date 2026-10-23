# School User Data Application

**React Test 01 – GoPhygital Pvt. Ltd.**

An application that manages school user details. Users sign in, the app works out whether they are an **admin** or a **student**, and then shows each role a different view.

---

## 1. Task

Build a user details application with separate modules. All user data comes from a static JSON dataset; there is no backend.

---

## 2. Data Model

Users are stored in a static JSON file: [`src/data/users.json`](src/data/users.json). There are two user types: **admin** and **student**.

### User fields

| Field      | Description                                    | Example                         |
|------------|------------------------------------------------|---------------------------------|
| `username` | Full name of the user                          | `Ravi Kumar`                    |
| `userType` | Role of the user: `admin` or `student`         | `student`                       |
| `password` | Password, stored encrypted (never plain text)  | `$2b$10$...` (bcrypt hash)      |
| `email`    | Email ID, also used to log in                  | `ravi.kumar@school.com`         |
| `language` | Preferred language                             | `English`, `German`, etc.       |
| `address`  | Residential address                            | `12 MG Road, Mumbai`            |
| `standard` | Class / grade                                  | `6th`, `7th`, `8th`, `9th`, `10th` |
| `subjects` | Array of subjects                              | `["Maths", "Science", "History"]` |

### Sample record

```json
{
  "id": 3,
  "username": "Ravi Kumar",
  "userType": "student",
  "password": "$2b$10$d6/5IHJAkO/b1JkcAgVtxuab/SMr63366jAHLUY3BNcev.lxxw.bK",
  "email": "ravi.kumar@school.com",
  "language": "English",
  "address": "12 MG Road, Mumbai",
  "standard": "8th",
  "subjects": ["Maths", "Science", "History"]
}
```

The dataset holds 2 admins and 8 students, spread across standards 6th–10th and a range of subjects.

---

## 3. Modules

### Module 1 – Login Page

Users sign in with **email** and **password**.

**Validations**

| Field    | Rule                                   | Error message                        |
|----------|----------------------------------------|--------------------------------------|
| Email    | Required, must be a valid email format | "Email is required" / "Please enter a valid email address" |
| Password | Must not be empty                      | "Password is required"               |

**Login flow**

1. The user enters email and password.
2. The form checks both fields before submitting.
3. The app looks up the email in the JSON dataset.
4. The entered password is checked against the stored encrypted password.
5. If the email or password is wrong, "Invalid email or password" is shown.
6. If both are correct, the user goes on to Module 2.

---

### Module 2 – Role-Based View

The logged-in user's email tells the app whether they are an **admin** or a **student**.

#### Admin view

The admin sees a list of **all students**.

| Name | Email ID | Subjects | Action |
|------|----------|----------|--------|
| Ravi Kumar | ravi.kumar@school.com | Maths, Science, History | **Details** button |

**Search**
- Search students **by name**.
- Search students **by subject**.
- The two searches can be combined. The list filters as you type, and "No students found" appears when nothing matches.

**Details popup**
- Each row has a **Details** button.
- Clicking it opens a **popup (modal)** with the student's full details: name, email, language, address, standard and subjects.
- The popup can be closed with the × button, by clicking outside it, or with the Esc key.
- The password is never shown.

#### Student view

The student sees **only their own details**, on the same page: name, email ID, language, address, standard and subjects. A student cannot see the student list or any other user's data.

---

## 4. Application Flow

```
                ┌──────────────┐
                │  Login Page  │
                └──────┬───────┘
                       │ valid email + password
                       ▼
              ┌─────────────────┐
              │ Identify role   │
              │ (by email)      │
              └───┬─────────┬───┘
          admin   │         │   student
                  ▼         ▼
     ┌──────────────────┐  ┌────────────────────┐
     │ Student list     │  │ Own details page   │
     │ + search (name / │  │ (name, email,      │
     │   subject)       │  │  language, address,│
     │ + Details popup  │  │  standard, subjects│
     └──────────────────┘  └────────────────────┘
```

---

## 5. Routes

| Route                        | Who      | Shows                                                    |
|------------------------------|----------|----------------------------------------------------------|
| `/`                          | anyone   | Redirects to `/login`, or to the user's home page if logged in |
| `/login`                     | guests   | Module 1 – Login page                                    |
| `/admin/students`            | admin    | Module 2 – student list with search                      |
| `/admin/students/:studentId` | admin    | Student list with that student's Details popup open      |
| `/student/profile`           | student  | Module 2 – the logged-in student's own details           |
| any other path               | anyone   | 404 page                                                 |

- **Protected routes:** guests opening an admin or student page are sent to `/login`, and after logging in they return to the page they asked for.
- **Role checks:** a student opening an admin route (or an admin opening the student route) is redirected to their own home page.
- **Search in the URL:** the admin's name/subject search is kept as `?name=…&subject=…`, so it survives a refresh and stays in place while a Details popup is open.
- **Shareable details:** `/admin/students/4` opens the list with that student's popup already showing; closing it returns to the list.

## 6. Additional Behaviour

- **Session:** the login stays active after a page refresh until **Logout** is clicked.
- **Logout:** ends the session and returns to the Login page.
- **Responsive layout:** works on desktop, tablet and mobile screens.

---

## 7. Test Credentials

| Role    | Email                    | Password      |
|---------|--------------------------|---------------|
| Admin   | `admin@school.com`       | `Admin@123`   |
| Student | `ravi.kumar@school.com`  | `Student@123` |

All admins share `Admin@123` and all students share `Student@123`. Any email from `src/data/users.json` works. The JSON file stores these passwords only as encrypted hashes.

---

## 8. Setup & Run

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

---

## 9. Project Structure

```
index.html                             HTML entry
vercel.json                            SPA fallback so deep links work when deployed
src/
  main.tsx                             mounts the app inside the router + auth provider
  App.tsx                              route table
  index.css                            global styles
  data/users.json                      static user dataset
  lib/auth.ts                          login, logout, session, student list
  context/AuthContext.tsx              current user + login/logout for components
  routes/
    paths.ts                           route paths and each role's home page
    guards.tsx                         protected / guest-only / redirect routes
  components/
    auth/Login.tsx                     Module 1, login form + validation
    dashboard/DashboardLayout.tsx      top bar + logout around logged-in pages
    dashboard/AdminView.tsx            student list + search (/admin/students)
    dashboard/StudentDetailsRoute.tsx  details popup route (/admin/students/:studentId)
    dashboard/UserDetailsModal.tsx     popup markup
    dashboard/StudentView.tsx          student's own details (/student/profile)
    dashboard/UserDetails.tsx          shared details layout
    NotFound.tsx                       404 page
```

---

## 10. Screenshots

_To be added: Login page, Admin student list, Details popup, Student details page._

---

## 11. Submission

- **Submitted to:** Shweta Doshi, HR Manager, GoPhygital Pvt. Ltd.
- **Candidate:** Anil Kumar Bobba
- **Deliverables:** source code repository link, live demo link, and this README.
