import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollege, FREE_DATASET_STATS } from '../../data/data.js';
import TierCard from '../../components/TierCard/TierCard.jsx';

export default function Dashboard() {
  const [matches, setMatches] = useState([]);
  const [compareCount, setCompareCount] = useState(0);
  const [tiers, setTiers] = useState({});

  useEffect(() => {
    const rawMatches = JSON.parse(localStorage.getItem('unipathMatches') || '[]');
    const collegeList = rawMatches.map(getCollege).filter(Boolean);
    const compareList = JSON.parse(localStorage.getItem('unipathCompare') || '[]');
    const savedTiers = JSON.parse(localStorage.getItem('unipathTiers') || '{}');

    setMatches(collegeList);
    setCompareCount(compareList.length);
    setTiers(savedTiers);
  }, []);

  const groups = { dream: [], target: [], safe: [] };
  matches.forEach((x, i) => {
    const t = tiers[x.id] || (i < 2 ? 'dream' : i < 6 ? 'target' : 'safe');
    if (groups[t]) {
      groups[t].push(x);
    } else {
      groups.target.push(x);
    }
  });

  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">MY UNIPATH</div>
          <h1>Student Dashboard</h1>
          <p>Your saved matches and comparison workspace.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <strong id="mc">{matches.length}</strong>Saved matches
          </div>
          <div className="dashboard-card">
            <strong id="cc">{compareCount}</strong>Comparison slots
          </div>
          <div className="dashboard-card">
            <strong id="ic">{FREE_DATASET_STATS?.institutionRecords?.toLocaleString('en-IN') || '906'}</strong>Institution records
          </div>
          <div className="dashboard-card">
            <strong id="pc">{FREE_DATASET_STATS?.programRows?.toLocaleString('en-IN') || '2,661'}</strong>Programme entries
          </div>
        </div>

        <div className="two-col">
          <section className="panel" style={{ gridColumn: '1/-1' }}>
            <h2>My Plan</h2>
            <div id="planTiers" className="tier-grid">
              {Object.entries(groups).map(([k, a]) => (
                <TierCard key={k} tierKey={k} colleges={a} isDashboard={true} />
              ))}
            </div>
            <Link className="btn small" to="/shortlist" style={{ marginTop: '14px' }}>
              Manage Shortlist
            </Link>
          </section>

          <section className="panel">
            <h2>My Matches</h2>
            <div id="matches">
              {matches.length > 0 ? (
                <div className="card-list">
                  {matches.map((x) => (
                    <div key={x.id} className="college-card">
                      <div>
                        <div className="rank">{x.category}</div>
                        <h2>{x.name}</h2>
                        <div className="meta">{x.programs?.length || 0} programme entries</div>
                      </div>
                      <Link className="btn small" to={`/college?id=${encodeURIComponent(x.id)}`}>
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty">
                  <p>No matches yet.</p>
                  <Link className="btn small" to="/find">
                    Start quiz
                  </Link>
                </div>
              )}
            </div>
          </section>

          <aside className="panel">
            <h2>Premium Planning</h2>
            <p className="muted">
              Premium is designed for personalized shortlists, deadline tracking, scholarship matching, comparisons and an admission roadmap.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Link className="btn" to="/payment">
                Get Premium
              </Link>
              <Link className="btn outline" to="/find">
                Find My College
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
