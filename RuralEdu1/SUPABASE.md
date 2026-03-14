# Connecting RuralEdu to Supabase

Supabase gives you a hosted Postgres database, built-in Auth, row-level security, and a
real-time API — all for free on the starter plan.  Follow the steps below to swap the
existing Node/Express back-end for Supabase.

---

## 1 — Create a Supabase project

1. Go to <https://supabase.com> and sign up (or log in).
2. Click **New project**.
3. Fill in a name (e.g. `ruraledu`), choose a region close to your users, and set a strong
   database password.
4. Wait ~2 minutes for the project to be provisioned.

---

## 2 — Copy your project credentials

In the Supabase dashboard go to **Project Settings → API**.

You need two values:

| Variable | Where to find it |
|---|---|
| `VITE_SUPABASE_URL` | **Project URL** (looks like `https://xxxx.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | **anon / public** key under *Project API keys* |

Create (or edit) `.env.local` in the `RuralEdu1/` folder:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

> **Never commit this file.** It is already listed in `.gitignore`.

---

## 3 — Install the Supabase JS client

```bash
cd RuralEdu1
npm install @supabase/supabase-js
```

---

## 4 — Create the Supabase client

A scaffold file is already provided at `src/lib/supabase.js`.  It reads the two
environment variables and exports a ready-to-use client:

```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl      = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

Import it anywhere you need database or auth access:

```js
import { supabase } from '../lib/supabase';
```

---

## 5 — Set up the database tables

Open the **SQL Editor** in the Supabase dashboard and run the schema from
`../backend/database.sql`, **or** use the Supabase table editor to create the tables
manually.  The core tables are:

| Table | Purpose |
|---|---|
| `profiles` | Extends `auth.users` with `name`, `role`, `school` |
| `courses` | Course catalogue |
| `lessons` | Lessons belonging to a course |
| `student_progress` | Per-student lesson completion + quiz scores |

> Tip: Enable **Row Level Security (RLS)** on every table and add policies so students can
> only read/write their own progress rows.

---

## 6 — Replace Auth calls with Supabase Auth

### Sign up

```js
import { supabase } from '../lib/supabase';

const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { name, role, school },   // stored in auth.users.raw_user_meta_data
  },
});
```

### Log in

```js
const { data, error } = await supabase.auth.signInWithPassword({ email, password });
// data.session.access_token  — use as Bearer token if needed
// data.user                  — user object
```

### Log out

```js
await supabase.auth.signOut();
```

### Listen for auth changes (replaces localStorage polling)

Add this once in `AuthProvider.jsx`:

```js
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return () => subscription.unsubscribe();
}, []);
```

---

## 7 — Replace data calls with Supabase queries

### Fetch all courses

```js
const { data: courses, error } = await supabase
  .from('courses')
  .select('*');
```

### Fetch lessons for a course

```js
const { data: lessons, error } = await supabase
  .from('lessons')
  .select('*')
  .eq('course_id', courseId);
```

### Fetch student progress

```js
const { data: progress, error } = await supabase
  .from('student_progress')
  .select('*, lessons(title, course_id), courses(title)')
  .eq('student_id', userId);
```

---

## 8 — Environment variables in production

When you deploy (e.g. Vercel, Netlify, Render):

- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as **environment variables** in
  your hosting provider's dashboard.
- **Do not** put secret keys (service-role key) in the frontend — only use the anon key.

---

## Quick-start checklist

- [ ] Create Supabase project
- [ ] Copy URL + anon key to `.env.local`
- [ ] Run `npm install @supabase/supabase-js`
- [ ] Run database schema SQL in Supabase SQL editor
- [ ] Enable RLS on each table and add policies
- [ ] Update `AuthProvider.jsx` to use `supabase.auth`
- [ ] Update `CourseProvider.jsx` to query Supabase tables
- [ ] Update `useStudentProgress.js` to query Supabase tables
- [ ] Remove the Node/Express backend (optional — keep it if you prefer)
