import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FREE_DATASET_STATS } from '../../data/data.js';
import '../../styles/home.css';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchTerm.trim();
    navigate('/colleges' + (q ? `?q=${encodeURIComponent(q)}` : ''));
  };

  const quickSearch = (q) => {
    navigate(`/colleges?q=${encodeURIComponent(q)}`);
  };

  const institutionCount = FREE_DATASET_STATS?.institutionRecords
    ? FREE_DATASET_STATS.institutionRecords.toLocaleString('en-IN') + '+'
    : '900+';

  const programCount = FREE_DATASET_STATS?.programRows
    ? FREE_DATASET_STATS.programRows.toLocaleString('en-IN') + '+'
    : '2,600+';

  return (
    <div>
      <section className="home-hero">
        <div className="container home-hero-inner">
          <div className="home-copy">
            <div className="eyebrow">✦ YOUR FUTURE, OUR GUIDANCE</div>
            <h1>
              Find the Right College<br />
              <span>for Your Future</span>
            </h1>
            <p>
              Explore colleges, compare courses, check fees and rankings, and build your personalized admission plan.
            </p>
            <form className="home-search" onSubmit={handleSearch}>
              <input
                id="homeQ"
                aria-label="Search colleges"
                placeholder="Search colleges, courses or cities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
            <div className="home-chips">
              <button type="button" className="home-chip" onClick={() => quickSearch('B.Tech')}>
                B.Tech Colleges
              </button>
              <button type="button" className="home-chip" onClick={() => quickSearch('MBA')}>
                MBA Colleges
              </button>
              <button type="button" className="home-chip" onClick={() => quickSearch('Medical')}>
                Medical Colleges
              </button>
              <button type="button" className="home-chip" onClick={() => quickSearch('IIT')}>
                IIT Colleges
              </button>
            </div>
          </div>
          <div className="home-why">
            <h2>Why Choose NIPATH?</h2>
            <div className="home-why-item">
              <div className="home-icon">🎯</div>
              <div>
                <strong>Personalized Guidance</strong>
                <p>Recommendations based on your goals and requirements.</p>
              </div>
            </div>
            <div className="home-why-item">
              <div className="home-icon">📚</div>
              <div>
                <strong>Complete Information</strong>
                <p>Courses, eligibility, fees, exams and rankings together.</p>
              </div>
            </div>
            <div className="home-why-item">
              <div className="home-icon">⏰</div>
              <div>
                <strong>Stay Ahead</strong>
                <p>Keep your college research and admission planning organized.</p>
              </div>
            </div>
            <div className="home-why-item">
              <div className="home-icon">✓</div>
              <div>
                <strong>Student-first</strong>
                <p>A simpler route through the chaos of college research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="home-stats">
        <div className="home-stat">
          <strong id="statInstitutions">{institutionCount}</strong>
          Institution records
        </div>
        <div className="home-stat">
          <strong>15</strong>
          NIRF categories
        </div>
        <div className="home-stat">
          <strong id="statPrograms">{programCount}</strong>
          Programme entries
        </div>
        <div className="home-stat">
          <strong>4</strong>
          Planning stages
        </div>
      </div>

      <section className="home-section alt">
        <div className="container">
          <div className="home-head">
            <div className="eyebrow">FREE TOOLS</div>
            <h2>Everything you need to research colleges</h2>
            <p>Core college information and discovery tools are available without a Pro subscription.</p>
          </div>
          <div className="home-free-grid">
            <Link className="home-feature" to="/colleges">
              <div className="bigicon">🔎</div>
              <h3>College Search</h3>
              <p>Search institutions and programmes using the information in the NIPATH database.</p>
              <span className="free-label">FREE</span>
            </Link>
            <Link className="home-feature" to="/rankings">
              <div className="bigicon">🏆</div>
              <h3>NIRF Rankings</h3>
              <p>Browse NIRF categories and see institution rankings.</p>
              <span className="free-label">FREE</span>
            </Link>
            <Link className="home-feature" to="/exams">
              <div className="bigicon">🗓️</div>
              <h3>Entrance Exams</h3>
              <p>Explore major entrance exams and admission information.</p>
              <span className="free-label">FREE</span>
            </Link>
            <Link className="home-feature" to="/find">
              <div className="bigicon">🧭</div>
              <h3>Find My College</h3>
              <p>Answer real questions about your goals and get college matches.</p>
              <span className="free-label">FREE</span>
            </Link>
            <Link className="home-feature" to="/compare">
              <div className="bigicon">⚖️</div>
              <h3>Compare Colleges</h3>
              <p>Put colleges side by side and compare the information that matters.</p>
              <span className="free-label">FREE</span>
            </Link>
            <Link className="home-feature" to="/dashboard">
              <div className="bigicon">📋</div>
              <h3>My Dashboard</h3>
              <p>Keep your saved college research and planning activity together.</p>
              <span className="free-label">FREE</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section home-pro">
        <div className="container">
          <div className="home-head">
            <div className="eyebrow">NIPATH PRO</div>
            <h2>Turn college research into a complete plan</h2>
            <p>These advanced planning tools are intentionally separated from the free college-information tools.</p>
          </div>
          <div className="pro-grid">
            <Link className="pro-card" to="/shortlist">
              <span className="pro-label">PRO</span>
              <div className="bigicon">⭐</div>
              <h3>Smart Shortlist</h3>
              <p>Organize your choices into Dream, Target and Safe colleges.</p>
            </Link>
            <Link className="pro-card" to="/roadmap">
              <span className="pro-label">PRO</span>
              <div className="bigicon">🧭</div>
              <h3>Admission Roadmap</h3>
              <p>Build a structured path from Class 12 planning to college admission.</p>
            </Link>
            <Link className="pro-card" to="/scholarships">
              <span className="pro-label">PRO</span>
              <div className="bigicon">🎓</div>
              <h3>Scholarship Planning</h3>
              <p>Organize scholarship opportunities and track what you need to verify.</p>
            </Link>
            <Link className="pro-card" to="/dashboard">
              <span className="pro-label">PRO</span>
              <div className="bigicon">⏰</div>
              <h3>Deadline Tracker</h3>
              <p>Keep important application deadlines and tasks in one place.</p>
            </Link>
            <Link className="pro-card" to="/compare">
              <span className="pro-label">PRO</span>
              <div className="bigicon">📊</div>
              <h3>Advanced Comparison</h3>
              <p>Use your shortlist to make more informed college decisions.</p>
            </Link>
            <Link className="pro-card" to="/payment">
              <span className="pro-label">PRO</span>
              <div className="bigicon">✨</div>
              <h3>Pro Workspace</h3>
              <p>Unlock the full planning experience and keep your admission journey together.</p>
            </Link>
          </div>
          <div className="pro-cta">
            <Link className="btn" to="/payment">
              Get NIPATH Pro
            </Link>
            <div className="pro-note">
              Demo checkout only. Replace with a verified payment provider before accepting real payments.
            </div>
          </div>
        </div>
      </section>

      <section className="home-bottom">
        <div className="container home-bottom-box">
          <div>
            <h2>Start with the information. Build the plan when you're ready.</h2>
            <p>
              Use the free tools to explore colleges first. Pro features are clearly separated for students who want deeper admission planning.
            </p>
          </div>
          <Link className="btn" to="/find">
            Find My College
          </Link>
        </div>
      </section>
    </div>
  );
}
