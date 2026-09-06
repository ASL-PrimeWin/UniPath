import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollege } from '../../data/data.js';

export default function Compare() {
  const [colleges, setColleges] = useState([]);

  const loadComparison = () => {
    const ids = JSON.parse(localStorage.getItem('unipathCompare') || '[]');
    const list = ids.map(getCollege).filter(Boolean);
    setColleges(list);
  };

  useEffect(() => {
    loadComparison();
  }, []);

  const handleClear = () => {
    localStorage.removeItem('unipathCompare');
    loadComparison();
  };

  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">DECIDE</div>
          <h1>Compare Colleges</h1>
          <p>Compare two institution records from the free-tier dataset.</p>
        </div>

        <div id="compare">
          {colleges.length < 2 ? (
            <div className="empty">
              <h2>Select two institutions</h2>
              <p>Use Compare from College Search or a college profile.</p>
              <Link className="btn" to="/colleges">
                Find Colleges
              </Link>
            </div>
          ) : (
            <>
              <div className="compare-grid">
                {colleges.map((c) => {
                  const entranceExamples =
                    [...new Set(c.programs?.map((p) => p.entrance).filter(Boolean))]
                      .slice(0, 3)
                      .join(' · ') || 'See profile';

                  const feeExamples =
                    [...new Set(c.programs?.map((p) => p.fees).filter(Boolean))]
                      .slice(0, 3)
                      .join(' · ') || 'See profile';

                  return (
                    <div key={c.id} className="compare-item">
                      <div className="rank">{c.category}</div>
                      <h2>{c.name}</h2>
                      <div className="info-row">
                        <span>Category</span>
                        <strong>{c.category}</strong>
                      </div>
                      <div className="info-row">
                        <span>Programme entries</span>
                        <strong>{c.programs?.length || 0}</strong>
                      </div>
                      <div className="info-row">
                        <span>Entrance examples</span>
                        <strong>{entranceExamples}</strong>
                      </div>
                      <div className="info-row">
                        <span>Fee examples</span>
                        <strong>{feeExamples}</strong>
                      </div>
                      <div className="info-row">
                        <span>Mode</span>
                        <strong>{c.hostel ? 'Residential listed' : 'Varies'}</strong>
                      </div>
                      <Link className="btn small" to={`/college?id=${encodeURIComponent(c.id)}`}>
                        Full Details
                      </Link>
                    </div>
                  );
                })}
              </div>
              <br />
              <button type="button" className="btn outline" onClick={handleClear}>
                Clear Comparison
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
