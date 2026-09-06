import React from 'react';
import { Link } from 'react-router-dom';

const roadmapSteps = [
  {
    step: '1',
    title: 'Choose your direction',
    desc: 'Use Find My College, compare options and create your Dream / Target / Safe shortlist.'
  },
  {
    step: '2',
    title: 'Map entrance exams',
    desc: 'Identify JEE, NEET, CUET, CLAT, NATA, CAT or the relevant institution-specific route.'
  },
  {
    step: '3',
    title: 'Track applications',
    desc: 'Record registration, correction, admit-card, exam and counselling milestones in one place.'
  },
  {
    step: '4',
    title: 'Compare final offers',
    desc: 'Compare fees, programme fit, location, rankings and your own priorities before deciding.'
  },
  {
    step: '5',
    title: 'Complete admission',
    desc: 'Verify eligibility, documents, fee deadlines and reporting instructions directly with the institution.'
  }
];

export default function Roadmap() {
  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">APPLY</div>
          <h1>Admission Roadmap</h1>
          <p>
            A simple path from Class 12 planning to applications. Dates should be verified against the official exam or institution site.
          </p>
        </div>

        <section className="panel">
          <div className="timeline">
            {roadmapSteps.map((item) => (
              <div key={item.step} className="timeline-item">
                <div className="timeline-dot">{item.step}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p className="muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="tool-grid">
            <Link className="tool-card" to="/find">
              <h3>🎯 Build shortlist</h3>
              <p>Get ranked college matches.</p>
            </Link>
            <Link className="tool-card" to="/exams">
              <h3>🗓️ Explore exams</h3>
              <p>See major entrance routes.</p>
            </Link>
            <Link className="tool-card" to="/compare">
              <h3>⚖️ Compare</h3>
              <p>Put your finalists side by side.</p>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
