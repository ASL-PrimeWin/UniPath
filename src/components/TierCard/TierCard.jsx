import React from 'react';
import { Link } from 'react-router-dom';

const tierConfig = {
  dream: { title: '🟣 Dream', desc: 'Reach options.' },
  target: { title: '🔵 Target', desc: 'Strong realistic options.' },
  safe: { title: '🟢 Safe', desc: 'Backup options worth applying to.' }
};

export default function TierCard({ tierKey, colleges = [], isDashboard = false }) {
  const config = tierConfig[tierKey] || { title: tierKey, desc: '' };

  if (isDashboard) {
    const list = colleges.slice(0, 4);
    return (
      <div className={`tier ${tierKey}`}>
        <h3>{config.title}</h3>
        <div className="mini-list">
          {list.length > 0 ? (
            list.map((x) => (
              <div key={x.id} className="mini-item">
                <strong>{x.name}</strong>
              </div>
            ))
          ) : (
            <span className="muted">Empty</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <section className={`tier ${tierKey}`}>
      <h3>{config.title}</h3>
      <p className="muted">{config.desc}</p>
      <div className="mini-list">
        {colleges.length > 0 ? (
          colleges.map((c) => (
            <div key={c.id} className="mini-item">
              <div>
                <strong>{c.name}</strong>
                <div className="muted">{c.category}</div>
              </div>
              <Link className="btn small outline" to={`/college?id=${encodeURIComponent(c.id)}`}>
                View
              </Link>
            </div>
          ))
        ) : (
          <div className="muted">No colleges here yet.</div>
        )}
      </div>
    </section>
  );
}
