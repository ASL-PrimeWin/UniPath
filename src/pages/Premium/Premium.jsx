import React from 'react';
import { Link } from 'react-router-dom';

export default function Premium() {
  const scrollToPlans = (e) => {
    e.preventDefault();
    const plansElem = document.getElementById('plans');
    if (plansElem) {
      plansElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="premium-page">
      <section className="premium-hero">
        <div className="container">
          <div className="eyebrow">✦ UNIPATH PREMIUM</div>
          <h1>
            Research less.<br />
            <span>Plan smarter.</span>
          </h1>
          <p>
            Premium turns your college search into a personalized admission workspace, with smarter shortlists, deadline planning, scholarship matching and an admission roadmap.
          </p>
          <div style={{ marginTop: '22px' }}>
            <a className="btn" href="#plans" onClick={scrollToPlans}>
              View Plans
            </a>{' '}
            <Link className="btn outline" to="/find">
              Try Find My College
            </Link>
          </div>
        </div>
      </section>

      <section className="section white" id="plans">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">SIMPLE PLANS</div>
            <h2>Free gives you the data. Premium gives you the plan.</h2>
          </div>
          <div className="pricing-grid">
            <article className="price-card">
              <span className="premium-badge">FREE</span>
              <h3>Explore</h3>
              <div className="price">
                ₹0 <small>forever</small>
              </div>
              <p className="muted">Everything you need to research colleges independently.</p>
              <ul className="price-list">
                <li>✓ College search</li>
                <li>✓ Programme & eligibility details</li>
                <li>✓ Entrance exam information</li>
                <li>✓ NIRF category browsing</li>
                <li>✓ College comparison</li>
                <li>✓ Find My College matching</li>
              </ul>
              <Link className="btn outline" to="/colleges">
                Explore Colleges
              </Link>
            </article>

            <article className="price-card featured">
              <span className="premium-badge">PREMIUM</span>
              <h3>Plan</h3>
              <div className="price">
                Personalized <small>workspace</small>
              </div>
              <p style={{ color: '#d3e0ef' }}>
                Built around your goals, budget, exams and application timeline.
              </p>
              <ul className="price-list">
                <li>✓ Personalized college shortlist</li>
                <li>✓ Application deadline tracker</li>
                <li>✓ Scholarship matching</li>
                <li>✓ Advanced college comparison</li>
                <li>✓ Application planning</li>
                <li>✓ Personalized admission roadmap</li>
              </ul>
              <Link className="btn light" to="/payment">
                Get Premium
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">WHY PREMIUM</div>
            <h2>Less spreadsheet archaeology.</h2>
            <p>UniPath is designed to turn scattered college information into decisions you can actually act on.</p>
          </div>
          <div className="feature-row">
            <div className="info-card">
              <h3>🎯 Better Shortlists</h3>
              <p>Recommendations based on your course, entrance route, study mode and priorities.</p>
            </div>
            <div className="info-card">
              <h3>⏰ Stay on Time</h3>
              <p>Keep application dates and tasks visible instead of discovering deadlines at midnight.</p>
            </div>
            <div className="info-card">
              <h3>🧭 Clear Roadmap</h3>
              <p>Move from discovery to comparison, applications and final decisions in one workspace.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
