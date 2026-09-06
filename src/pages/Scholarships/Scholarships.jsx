import React, { useState } from 'react';

const scholarshipLeads = [
  [
    'National Scholarship Portal',
    'Government scheme',
    'Central and state scholarship discovery portal.',
    'Verify current schemes, eligibility and dates on the official portal.'
  ],
  [
    'INSPIRE Scholarship',
    'Merit / Science',
    'Science-focused undergraduate scholarship route.',
    'Check the current INSPIRE eligibility and application cycle.'
  ],
  [
    'Institution Scholarships',
    'Merit / Need-based',
    'Many colleges publish their own fee waivers and scholarships.',
    'Check the specific institution’s current scholarship page.'
  ],
  [
    'State Scholarships',
    'Government scheme',
    'State governments may offer scholarships for eligible residents.',
    'Check your state education/social welfare portal.'
  ]
];

export default function Scholarships() {
  const [level, setLevel] = useState('Undergraduate');
  const [need, setNeed] = useState('Any funding need');
  const [field, setField] = useState('Any field');
  const [activeNeed, setActiveNeed] = useState('Any funding need');

  const handleFind = () => {
    setActiveNeed(need);
  };

  const filteredScholarships = scholarshipLeads.filter(
    (x) =>
      activeNeed === 'Any funding need' ||
      x[1].toLowerCase().includes(activeNeed.split('-')[0].toLowerCase()) ||
      x[1].includes('Government')
  );

  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">FUNDING</div>
          <h1>Scholarship Finder</h1>
          <p>
            Use this as a planning workspace. Scholarship eligibility and deadlines can change, so verify every application with the official provider.
          </p>
        </div>

        <section className="panel">
          <div className="filters" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
            <select
              id="level"
              className="field"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Undergraduate</option>
              <option>Postgraduate</option>
            </select>
            <select
              id="need"
              className="field"
              value={need}
              onChange={(e) => setNeed(e.target.value)}
            >
              <option>Any funding need</option>
              <option>Need-based</option>
              <option>Merit-based</option>
              <option>Government scheme</option>
            </select>
            <select
              id="field"
              className="field"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <option>Any field</option>
              <option>Engineering</option>
              <option>Medical</option>
              <option>Science</option>
              <option>Management</option>
              <option>Law</option>
              <option>Arts / Commerce</option>
            </select>
          </div>
          <button
            type="button"
            className="btn"
            style={{ marginTop: '12px' }}
            onClick={handleFind}
          >
            Find Funding Options
          </button>
        </section>

        <div id="scholarships" style={{ marginTop: '18px' }}>
          <div className="card-list">
            {filteredScholarships.map((x, i) => (
              <article key={i} className="college-card">
                <div>
                  <div className="rank">{x[1]}</div>
                  <h2>{x[0]}</h2>
                  <p className="meta">{x[2]}</p>
                  <p className="muted">{x[3]}</p>
                </div>
                <span className="score-pill">Planning lead</span>
              </article>
            ))}
          </div>
          <div className="notice" style={{ marginTop: '15px' }}>
            NIPATH does not guarantee scholarship eligibility. Always confirm the current rules, dates and application instructions with the official provider.
          </div>
        </div>
      </div>
    </main>
  );
}
