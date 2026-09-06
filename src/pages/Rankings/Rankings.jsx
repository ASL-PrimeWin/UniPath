import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { COLLEGES, NIRF_CATEGORIES } from '../../data/data.js';

export default function Rankings() {
  const available = useMemo(() => {
    return [...new Set(COLLEGES.filter((c) => c.rank != null).map((c) => c.category))];
  }, []);

  const [selected, setSelected] = useState(() => {
    return available.includes('Engineering') ? 'Engineering' : available[0] || '';
  });

  const rankedColleges = useMemo(() => {
    return COLLEGES.filter((c) => c.category === selected && c.rank != null).sort((a, b) =>
      String(a.rank).localeCompare(String(b.rank), undefined, { numeric: true })
    );
  }, [selected]);

  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">RANKINGS & DATA</div>
          <h1>NIRF Categories</h1>
          <p>
            Browse NIRF-linked categories. Institutions without a verified rank in the local dataset are not shown in ranked lists.
          </p>
        </div>

        <div className="category-tabs" id="tabs">
          {NIRF_CATEGORIES.map((x) => {
            const isAvailable = available.includes(x);
            const isActive = x === selected;
            return (
              <button
                key={x}
                type="button"
                className={isActive ? 'active' : ''}
                style={{ opacity: isAvailable ? '1' : '0.4' }}
                disabled={!isAvailable}
                onClick={() => setSelected(x)}
              >
                {x}
              </button>
            );
          })}
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Institution</th>
                <th>Category</th>
                <th>Example entrance</th>
              </tr>
            </thead>
            <tbody id="body">
              {rankedColleges.length > 0 ? (
                rankedColleges.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>#{c.rank}</strong>
                    </td>
                    <td>
                      <Link to={`/college?id=${encodeURIComponent(c.id)}`}>
                        <strong>{c.name}</strong>
                      </Link>
                    </td>
                    <td>{c.category}</td>
                    <td>{c.programs?.[0]?.entrance || '—'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    No verified ranked institutions are available in this local dataset for this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <br />
        <div className="notice">
          Only verified rank fields stored in the local dataset are shown. Rank bands and current NIRF data should be checked against the official NIRF publication before an application decision.
        </div>
      </div>
    </main>
  );
}
