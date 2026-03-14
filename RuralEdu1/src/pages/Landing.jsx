import { NavLink } from 'react-router-dom';

const features = [
  {
    icon: '📚',
    title: 'Structured Courses',
    desc: 'Browse video and PDF lessons organised into courses built for rural classrooms.',
  },
  {
    icon: '📈',
    title: 'Progress Tracking',
    desc: 'Students see exactly which lessons they have completed and their quiz scores.',
  },
  {
    icon: '⬇️',
    title: 'Offline Downloads',
    desc: 'Download videos and PDFs once and study anywhere — no internet required.',
  },
  {
    icon: '🏫',
    title: 'Multi-School Ready',
    desc: 'Teachers and students from different schools share the same platform seamlessly.',
  },
  {
    icon: '🔐',
    title: 'Secure Login',
    desc: 'Role-based access so teachers manage content and students focus on learning.',
  },
  {
    icon: '📝',
    title: 'Quizzes',
    desc: 'Built-in quizzes let teachers assess understanding directly after each lesson.',
  },
];

const platformStats = [
  { label: 'Active learners', value: '3,500+' },
  { label: 'Partner schools', value: '72' },
  { label: 'Learning resources', value: '1,200+' },
  { label: 'Average quiz score lift', value: '28%' },
];

const audienceHighlights = [
  {
    title: 'For students',
    points: [
      'Clear lesson pathways for faster daily revision.',
      'Offline-ready resources for home study without internet.',
      'Progress badges that motivate consistent learning.',
    ],
  },
  {
    title: 'For teachers',
    points: [
      'Simple class-level monitoring for each student.',
      'Built-in quiz and assignment support after every topic.',
      'Download analytics to plan personalized remedial sessions.',
    ],
  },
  {
    title: 'For school leaders',
    points: [
      'School-wide visibility into attendance and completion trends.',
      'Unified data that helps allocate teachers and materials better.',
      'Scalable setup across multiple grades and villages.',
    ],
  },
];

const testimonials = [
  {
    quote:
      'Before RuralEdu, students missed lessons whenever connectivity dropped. Now they continue learning with downloaded content.',
    name: 'Asha Devi',
    role: 'Teacher, Government Middle School',
  },
  {
    quote:
      'The dashboard helps me quickly spot who needs support. I can plan targeted revision classes every week.',
    name: 'Rohan Patil',
    role: 'Math Instructor, Cluster Resource Center',
  },
];

export default function Landing() {
  return (
    <div className="landing">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="landing-hero">
        <p className="eyebrow">RuralEdu Platform</p>
        <h1 className="landing-headline">Connected learning<br />for every village</h1>
        <p className="landing-subheadline">
          A simple, lightweight education platform built for schools in low-connectivity areas.
          Courses, lessons, quizzes, and progress tracking — all in one place.
        </p>
        <div className="landing-cta">
          <NavLink className="button primary landing-btn" to="/register">
            Get started free
          </NavLink>
          <NavLink className="button secondary landing-btn" to="/login">
            Log in
          </NavLink>
        </div>
        <div className="hero-stats">
          {platformStats.map((stat) => (
            <div className="hero-stat-card" key={stat.label}>
              <p className="hero-stat-value">{stat.value}</p>
              <p className="hero-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="landing-features">
        <p className="eyebrow landing-eyebrow-centered">What&apos;s included</p>
        <h2 className="landing-section-title">Everything a rural school needs</h2>
        <div className="feature-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="muted">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section className="landing-steps">
        <p className="eyebrow landing-eyebrow-centered">How it works</p>
        <h2 className="landing-section-title">Up and running in minutes</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-num">1</span>
            <h3>Create an account</h3>
            <p className="muted">Sign up as a student or teacher — no credit card needed.</p>
          </div>
          <div className="step-card">
            <span className="step-num">2</span>
            <h3>Browse courses</h3>
            <p className="muted">Explore video and PDF lessons organised by subject and grade.</p>
          </div>
          <div className="step-card">
            <span className="step-num">3</span>
            <h3>Learn &amp; track progress</h3>
            <p className="muted">Complete lessons, take quizzes, and watch your progress grow.</p>
          </div>
        </div>
      </section>

      {/* ── Audience details ──────────────────────────────── */}
      <section className="landing-audience">
        <p className="eyebrow landing-eyebrow-centered">Designed for everyone</p>
        <h2 className="landing-section-title">A platform each stakeholder can use easily</h2>
        <div className="audience-grid">
          {audienceHighlights.map((segment) => (
            <article className="audience-card" key={segment.title}>
              <h3>{segment.title}</h3>
              <ul>
                {segment.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
      <section className="landing-testimonials">
        <p className="eyebrow landing-eyebrow-centered">Stories from the field</p>
        <h2 className="landing-section-title">Trusted by schools in low-connectivity regions</h2>
        <div className="testimonials-grid">
          {testimonials.map((story) => (
            <blockquote className="testimonial-card" key={story.name}>
              <p>&ldquo;{story.quote}&rdquo;</p>
              <footer>
                <strong>{story.name}</strong>
                <span>{story.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────── */}
      <section className="landing-bottom-cta">
        <h2>Ready to start learning?</h2>
        <p className="muted landing-bottom-desc">
          Free to use. Works on any device. Built for rural communities.
        </p>
        <div className="landing-cta">
          <NavLink className="button primary landing-btn" to="/register">
            Create a free account
          </NavLink>
          <NavLink className="button secondary landing-btn" to="/login">
            I already have an account
          </NavLink>
        </div>
      </section>
    </div>
  );
}
