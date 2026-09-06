import React from 'react';
import { Link } from 'react-router-dom';

export default function CollegeCard({ college, onCompare }) {
  const handleCompare = () => {
    if (onCompare) {
      onCompare(college.id);
    } else {
      let a = JSON.parse(localStorage.getItem('unipathCompare') || '[]');
      if (!a.includes(college.id)) a.push(college.id);
      if (a.length > 2) a = a.slice(-2);
      localStorage.setItem('unipathCompare', JSON.stringify(a));
      alert('Added to comparison. Open Compare from the navigation.');
    }
  };

  const programsSummary = college.programs
    ? college.programs.map((p) => p.programme).filter(Boolean).slice(0, 4).join(' · ')
    : '';

  const entranceSummary = college.programs?.[0]?.entrance || 'Admission route listed in profile';

  return (
    <article className="college-card">
      <div>
        <div className="rank">{college.category}</div>
        <h2>{college.name}</h2>
        <div className="meta">
          {college.programs?.length || 0} programme entries · {programsSummary}
        </div>
        <div className="meta">{entranceSummary}</div>
        <div>
          <span className="tag">{college.category}</span>
          <span className="tag">
            {college.hostel ? 'Residential option listed' : 'Mode varies'}
          </span>
        </div>
      </div>
      <div className="card-actions">
        <Link className="btn small" to={`/college?id=${encodeURIComponent(college.id)}`}>
          View Details
        </Link>
        <button className="btn small outline" onClick={handleCompare}>
          Compare
        </button>
      </div>
    </article>
  );
}
