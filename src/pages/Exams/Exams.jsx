import React from 'react';
import { EXAMS } from '../../data/data.js';
import ExamCard from '../../components/ExamCard/ExamCard.jsx';

export default function Exams() {
  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">PLAN AHEAD</div>
          <h1>Entrance Exams</h1>
          <p>Major exams students may encounter during college admissions.</p>
        </div>

        <div className="exam-grid" id="exams">
          {EXAMS.map((e) => (
            <ExamCard key={e.name} exam={e} />
          ))}
        </div>

        <br />
        <div className="notice">
          No invented exam dates here. Add dates only after verifying the official notification for the relevant admission cycle.
        </div>
      </div>
    </main>
  );
}
