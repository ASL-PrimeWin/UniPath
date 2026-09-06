import React from 'react';

export default function ExamCard({ exam }) {
  return (
    <article className="exam-card">
      <div className="exam-type">{exam.type?.toUpperCase()}</div>
      <h3>{exam.name}</h3>
      <p className="meta">
        <strong>Body:</strong> {exam.body}
      </p>
      <p className="meta">
        <strong>Mode:</strong> {exam.mode}
      </p>
      <p className="meta">
        Check the official notification for eligibility, dates and application instructions.
      </p>
    </article>
  );
}
