import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getCollege } from '../../data/data.js';

export default function CollegeDetails() {
  const [searchParams] = useSearchParams();
  const collegeId = searchParams.get('id') || 'iit-madras-ug-programmes';
  const c = getCollege(collegeId);

  const handleCompare = (id) => {
    let a = JSON.parse(localStorage.getItem('unipathCompare') || '[]');
    if (!a.includes(id)) a.push(id);
    if (a.length > 2) a = a.slice(-2);
    localStorage.setItem('unipathCompare', JSON.stringify(a));
    alert('Added to comparison. Open Compare from the navigation.');
  };

  const handleSaveTier = (id, tier) => {
    let a = JSON.parse(localStorage.getItem('unipathMatches') || '[]');
    if (!a.includes(id)) a.unshift(id);
    localStorage.setItem('unipathMatches', JSON.stringify(a));
    let x = JSON.parse(localStorage.getItem('unipathTiers') || '{}');
    x[id] = tier;
    localStorage.setItem('unipathTiers', JSON.stringify(x));
    alert(`Saved to ${tier}. Open My Shortlist to manage it.`);
  };

  if (!c) {
    return (
      <main className="page">
        <div className="container" id="content">
          <div className="empty">
            <h2>Institution not found</h2>
            <Link className="btn" to="/colleges">
              Back to Search
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="container" id="content">
        <div className="detail-hero">
          <div className="eyebrow">FREE-TIER COLLEGE PROFILE</div>
          <h1>{c.name}</h1>
          <p>
            {c.category} · {c.programs.length} programme entries
          </p>
          <span className="tag">
            {c.hostel ? 'Residential option listed' : 'Mode varies by programme'}
          </span>
        </div>

        <div className="detail-grid">
          <div className="info-card">
            <h3>Profile Summary</h3>
            <div className="info-row">
              <span>Dataset category</span>
              <strong>{c.category}</strong>
            </div>
            <div className="info-row">
              <span>Programme entries</span>
              <strong>{c.programs.length}</strong>
            </div>
            <div className="info-row">
              <span>Main entrance route</span>
              <strong>{c.exam || 'See programme table'}</strong>
            </div>
          </div>

          <div className="info-card">
            <h3>Use this profile</h3>
            <p className="meta">
              The table below preserves the programme, course, eligibility, entrance, mode, duration and fee information supplied in the UniPath free-tier sheet.
            </p>
            <button className="btn small" onClick={() => handleCompare(c.id)}>
              Add to Compare
            </button>{' '}
            <button className="btn small outline" onClick={() => handleSaveTier(c.id, 'dream')}>
              Save as Dream
            </button>{' '}
            <button className="btn small outline" onClick={() => handleSaveTier(c.id, 'target')}>
              Target
            </button>{' '}
            <button className="btn small outline" onClick={() => handleSaveTier(c.id, 'safe')}>
              Safe
            </button>{' '}
            <Link className="btn small outline" to="/colleges">
              Back to Search
            </Link>
          </div>
        </div>

        <section className="panel" style={{ marginTop: '20px' }}>
          <div className="section-head">
            <div className="eyebrow">ALL FREE-TIER DETAILS</div>
            <h2>Programmes & admission information</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Programme</th>
                  <th>Courses offered</th>
                  <th>Eligibility</th>
                  <th>Entrance / Admission</th>
                  <th>Mode</th>
                  <th>Duration</th>
                  <th>Fees</th>
                </tr>
              </thead>
              <tbody>
                {c.programs.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <strong>{p.programme || '—'}</strong>
                    </td>
                    <td>{p.courses || '—'}</td>
                    <td>{p.eligibility || '—'}</td>
                    <td>{p.entrance || '—'}</td>
                    <td>{p.mode || '—'}</td>
                    <td>{p.duration || '—'}</td>
                    <td>{p.fees || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="notice" style={{ marginTop: '20px' }}>
          This page reproduces information from the uploaded UniPath free-tier dataset. Fees, eligibility and admission rules can change, so verify current details with the institution before applying.
        </div>
      </div>
    </main>
  );
}
