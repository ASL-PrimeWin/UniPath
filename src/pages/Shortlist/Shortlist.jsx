import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollege } from '../../data/data.js';
import TierCard from '../../components/TierCard/TierCard.jsx';

export default function Shortlist() {
  const [matches, setMatches] = useState([]);
  const [tiers, setTiers] = useState({});

  const loadShortlist = () => {
    const rawMatches = JSON.parse(localStorage.getItem('unipathMatches') || '[]');
    const collegeList = rawMatches.map(getCollege).filter(Boolean);
    const savedTiers = JSON.parse(localStorage.getItem('unipathTiers') || '{}');
    setMatches(collegeList);
    setTiers(savedTiers);
  };

  useEffect(() => {
    loadShortlist();
  }, []);

  const handleSaveTier = (id, tier) => {
    const nextTiers = { ...tiers, [id]: tier };
    localStorage.setItem('unipathTiers', JSON.stringify(nextTiers));
    setTiers(nextTiers);
  };

  if (!matches.length) {
    return (
      <main className="page">
        <div className="container">
          <div className="page-title">
            <div className="eyebrow">DECIDE</div>
            <h1>My Shortlist</h1>
            <p>Turn your matches into a practical Dream, Target and Safe college plan.</p>
          </div>
          <div id="shortlist">
            <div className="empty">
              <h2>Your shortlist is empty</h2>
              <p>Complete Find My College first.</p>
              <Link className="btn" to="/find">
                Start Find My College
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const groups = { dream: [], target: [], safe: [] };
  matches.forEach((c, i) => {
    const t = tiers[c.id] || (i < 2 ? 'dream' : i < 6 ? 'target' : 'safe');
    if (groups[t]) {
      groups[t].push(c);
    } else {
      groups.target.push(c);
    }
  });

  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">DECIDE</div>
          <h1>My Shortlist</h1>
          <p>Turn your matches into a practical Dream, Target and Safe college plan.</p>
        </div>

        <div id="shortlist">
          <div className="tier-grid">
            {Object.entries(groups).map(([k, arr]) => (
              <TierCard key={k} tierKey={k} colleges={arr} isDashboard={false} />
            ))}
          </div>

          <section className="panel" style={{ marginTop: '18px' }}>
            <h2>Reclassify</h2>
            <p className="muted">Move any saved college between Dream, Target and Safe.</p>
            <div className="mini-list">
              {matches.map((c) => (
                <div key={c.id} className="mini-item">
                  <strong>{c.name}</strong>
                  <div>
                    <button
                      type="button"
                      className="filter-chip"
                      onClick={() => handleSaveTier(c.id, 'dream')}
                    >
                      Dream
                    </button>
                    <button
                      type="button"
                      className="filter-chip"
                      onClick={() => handleSaveTier(c.id, 'target')}
                    >
                      Target
                    </button>
                    <button
                      type="button"
                      className="filter-chip"
                      onClick={() => handleSaveTier(c.id, 'safe')}
                    >
                      Safe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
