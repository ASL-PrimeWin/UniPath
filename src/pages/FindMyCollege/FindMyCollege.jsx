import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { COLLEGES } from '../../data/data.js';

const questions = [
  {
    key: 'field',
    title: 'What do you want to study?',
    help: 'Pick the broadest area that matches your current goal.',
    options: [
      ['Engineering & Technology', 'engineering'],
      ['Computer & Data', 'computer'],
      ['Medicine & Health', 'medical'],
      ['Science & Research', 'science'],
      ['Business & Management', 'business'],
      ['Law', 'law'],
      ['Architecture & Design', 'design'],
      ['Agriculture', 'agriculture'],
      ['Arts, Commerce & Humanities', 'arts'],
      ['Skill & Vocational', 'skill'],
      ['Not sure yet', 'any']
    ]
  },
  {
    key: 'program',
    title: 'Which programme are you looking for?',
    help: 'We will match against the actual programme names in the dataset.',
    options: [
      ['B.Tech / B.E.', 'tech'],
      ['B.Sc / B.S.', 'science'],
      ['MBBS / BDS / Health', 'health'],
      ['BBA / BMS / Management', 'management'],
      ['Law / Integrated Law', 'law'],
      ['B.Arch / Design', 'design'],
      ['B.A. / B.Com.', 'arts'],
      ['Agriculture / Allied', 'agri'],
      ['Any programme', 'any']
    ]
  },
  {
    key: 'exam',
    title: 'Which entrance route are you planning to use?',
    help: 'Choose the route you expect to apply through. We match keywords in the admission information.',
    options: [
      ['JEE Main / Advanced', 'jee'],
      ['NEET UG', 'neet'],
      ['CUET', 'cuet'],
      ['CLAT', 'clat'],
      ['NATA', 'nata'],
      ['CAT', 'cat'],
      ['No specific exam / Not sure', 'any']
    ]
  },
  {
    key: 'mode',
    title: 'How do you want to study?',
    help: 'This uses the mode information available in your free-tier data.',
    options: [
      ['Residential / On-campus', 'residential'],
      ['Day scholar', 'day'],
      ['Online / ODL', 'online'],
      ['I am flexible', 'any']
    ]
  },
  {
    key: 'duration',
    title: 'What course length do you prefer?',
    help: 'Some programmes are 3 years, others 4, 5 or more.',
    options: [
      ['About 3 years', '3'],
      ['About 4 years', '4'],
      ['5 years or longer', '5'],
      ['No preference', 'any']
    ]
  },
  {
    key: 'cost',
    title: 'How important is keeping fees lower?',
    help: 'Fee text is matched approximately where the spreadsheet provides a numeric range.',
    options: [
      ['Very important', 'low'],
      ['Somewhat important', 'mid'],
      ['Fees are not my main concern', 'high'],
      ['Flexible / not sure', 'any']
    ]
  },
  {
    key: 'priority',
    title: 'What should matter most in your shortlist?',
    help: 'This controls the weighting of your final recommendations.',
    options: [
      ['Strong course match', 'course'],
      ['Entrance route match', 'exam'],
      ['Affordable options', 'cost'],
      ['Study-mode match', 'mode'],
      ['Balanced overall match', 'balanced']
    ]
  }
];

function norm(s) {
  return String(s || '').toLowerCase();
}

function allText(c) {
  return norm([c.name, c.category, ...(c.programs || []).flatMap((p) => Object.values(p))].join(' '));
}

function scoreCollege(c, answers) {
  const text = allText(c);
  const progs = c.programs || [];
  let score = 0;
  let max = 0;
  let reasons = [];

  const add = (points, ok, reason) => {
    max += points;
    if (ok) {
      score += points;
      reasons.push(reason);
    }
  };

  const f = answers.field;
  const fieldMap = {
    engineering: ['engineering', 'technology', 'technical'],
    computer: ['computer', 'data science', 'software', 'information technology', 'cse', 'electronic'],
    medical: ['medical', 'medicine', 'mbbs', 'bds', 'nursing', 'allied health', 'pharmacy', 'physiotherapy'],
    science: ['science', 'research', 'physics', 'chemistry', 'biology', 'mathematics'],
    business: ['management', 'business', 'bba', 'bms', 'commerce', 'finance'],
    law: ['law', 'll.b', 'llb'],
    design: ['architecture', 'design', 'b.arch', 'planning'],
    agriculture: ['agriculture', 'forestry', 'horticulture', 'veterinary', 'animal'],
    arts: ['arts', 'humanities', 'history', 'journalism', 'commerce', 'liberal arts'],
    skill: ['skill', 'vocational', 'b.voc', 'diploma']
  };
  if (f === 'any') add(14, true, 'Broad field flexible');
  else add(22, (fieldMap[f] || []).some((k) => text.includes(k)), 'Study area matches');

  const p = answers.program;
  const pMap = {
    tech: ['b.tech', 'b.e.', 'b.e/b.tech', 'engineering'],
    science: ['b.sc', 'b.s.', 'bs', 'b.sc. (hons.)'],
    health: ['mbbs', 'bds', 'nursing', 'b.pharm', 'pharmd', 'bpt', 'allied health', 'paramedical'],
    management: ['bba', 'bms', 'management', 'b.com'],
    law: ['law', 'll.b', 'llb'],
    design: ['b.arch', 'b.des', 'design'],
    arts: ['b.a.', 'ba ', 'b.com', 'b.com.'],
    agri: ['agriculture', 'b.sc agriculture', 'b.v.sc', 'forestry'],
    any: []
  };
  if (p === 'any') add(18, true, 'Programme flexible');
  else add(24, (pMap[p] || []).some((k) => text.includes(k)), 'Programme match');

  const e = answers.exam;
  const eMap = {
    jee: ['jee'],
    neet: ['neet'],
    cuet: ['cuet'],
    clat: ['clat'],
    nata: ['nata'],
    cat: ['cat']
  };
  if (e === 'any') add(14, true, 'Entrance route flexible');
  else add(22, (eMap[e] || []).some((k) => text.includes(k)), 'Entrance route listed');

  const m = answers.mode;
  let modeOk = false;
  if (m === 'any') modeOk = true;
  else if (m === 'residential') modeOk = progs.some((p) => /residential|on-campus/i.test(p.mode || '')) || c.hostel;
  else if (m === 'day') modeOk = progs.some((p) => /day scholar|day/i.test(p.mode || ''));
  else if (m === 'online') modeOk = progs.some((p) => /online|odl|distance|hybrid/i.test(p.mode || ''));
  add(12, modeOk, 'Study mode available');

  const d = answers.duration;
  let durOk = false;
  if (d === 'any') durOk = true;
  else durOk = progs.some((p) => String(p.duration || '').includes(d));
  add(8, durOk, 'Preferred duration found');

  const nums = progs
    .flatMap((p) => {
      let s = String(p.fees || '');
      let a = [...s.matchAll(/(?:₹\s*)?(\d+(?:\.\d+)?)\s*(lakh|lac|L)?/gi)].map((match) => {
        let n = parseFloat(match[1]);
        return /lakh|lac/i.test(match[2] || '') ? n * 100000 : n * 100000;
      });
      return a;
    })
    .filter((n) => n > 0 && n < 5000000);

  let costOk = true;
  if (answers.cost === 'low') costOk = nums.length ? Math.min(...nums) <= 500000 : true;
  if (answers.cost === 'mid') costOk = nums.length ? Math.min(...nums) <= 1500000 : true;
  if (answers.cost === 'high') costOk = true;
  add(8, costOk, answers.cost === 'low' ? 'Lower fee signal found' : 'Fee preference compatible');

  if (answers.priority === 'course') {
    score *= 1.12;
  } else if (answers.priority === 'exam') {
    score *= 1.10;
  } else if (answers.priority === 'cost') {
    score *= 1.08;
  } else if (answers.priority === 'mode') {
    score *= 1.08;
  }

  return { c, score, max: max * 1.12, reasons: [...new Set(reasons)] };
}

export default function FindMyCollege() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  const currentQ = questions[step];

  const handleChoose = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!answers[currentQ.key]) return;
    if (step < questions.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const ranked = COLLEGES.map((c) => scoreCollege(c, answers))
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);

    localStorage.setItem('unipathMatches', JSON.stringify(ranked.map((x) => x.c.id)));
    setResults(ranked);
    setShowResults(true);
  };

  const handleSaveMatch = (id, tier) => {
    let a = JSON.parse(localStorage.getItem('unipathMatches') || '[]');
    if (!a.includes(id)) a.push(id);
    localStorage.setItem('unipathMatches', JSON.stringify(a));
    let t = JSON.parse(localStorage.getItem('unipathTiers') || '{}');
    t[id] = tier;
    localStorage.setItem('unipathTiers', JSON.stringify(t));
    alert('Saved to your shortlist.');
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
    setResults([]);
  };

  const answeredCount = Object.keys(answers).length;
  const bestScore = results[0]?.score || 0;
  const bestMax = results[0]?.max || 1;
  const bestPct = Math.round((bestScore / bestMax) * 100);

  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">PERSONALIZED MATCHING</div>
          <h1>Find My College</h1>
          <p>
            Tell UniPath what you actually want. We score the full free-tier dataset against your requirements instead of making you guess which filters matter.
          </p>
        </div>

        <div className="quiz-shell">
          {!showResults ? (
            <section className="quiz panel">
              <div className="quiz-top">
                <span id="step" className="quiz-step">
                  Question {step + 1} of {questions.length}
                </span>
                <span id="status" className="muted">
                  {step === 0
                    ? 'Start with your study goal.'
                    : `${answeredCount} preference${answeredCount === 1 ? '' : 's'} saved`}
                </span>
              </div>
              <div className="progress">
                <div
                  id="bar"
                  style={{ width: `${(step / questions.length) * 100}%` }}
                ></div>
              </div>
              <div id="qbox">
                <h2 className="quiz-question">{currentQ.title}</h2>
                <p className="quiz-help">{currentQ.help}</p>
                <div className={`option-grid ${currentQ.options.length > 6 ? 'three' : ''}`}>
                  {currentQ.options.map((o) => (
                    <button
                      key={o[1]}
                      type="button"
                      className={`option ${answers[currentQ.key] === o[1] ? 'selected' : ''}`}
                      onClick={() => handleChoose(currentQ.key, o[1])}
                    >
                      <strong>{o[0]}</strong>
                    </button>
                  ))}
                </div>
                <div className="quiz-nav">
                  <button
                    type="button"
                    className="btn outline"
                    onClick={handleBack}
                    disabled={step === 0}
                  >
                    ← Back
                  </button>
                  <div className="right">
                    <button
                      type="button"
                      className="btn"
                      onClick={handleNext}
                      disabled={!answers[currentQ.key]}
                    >
                      {step === questions.length - 1 ? 'Find My Matches' : 'Next →'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div id="results" style={{ marginTop: '18px' }}>
              <section className="panel">
                <div className="eyebrow">YOUR PERSONALIZED SHORTLIST</div>
                <h2>
                  {results.length} strongest matches from {COLLEGES.length.toLocaleString('en-IN')} institutions
                </h2>
                <p className="muted">
                  These are ranked matches, not guaranteed admissions. Open each profile to inspect the exact programme and eligibility information from the dataset.
                </p>
                <div className="result-toolbar">
                  <strong>Best match: {bestPct}%</strong>
                  <div>
                    <button type="button" className="btn outline small" onClick={handleRestart}>
                      Retake Quiz
                    </button>{' '}
                    <Link className="btn small" to="/colleges">
                      Browse All Colleges
                    </Link>
                  </div>
                </div>
                <div className="match-grid">
                  {results.map((x) => {
                    let pct = Math.max(1, Math.min(99, Math.round((x.score / x.max) * 100)));
                    return (
                      <article key={x.c.id} className="match-card">
                        <div className="match-score">{pct}% match</div>
                        <h3>{x.c.name}</h3>
                        <div className="match-meta">
                          {x.c.category} · {x.c.programs?.length || 0} programme entries
                        </div>
                        <div className="match-reasons">
                          {x.reasons.slice(0, 4).map((r, i) => (
                            <span key={i} className="match-reason">
                              ✓ {r}
                            </span>
                          ))}
                        </div>
                        <div className="match-meta">
                          {x.c.programs
                            ?.slice(0, 2)
                            .map((p) => p.programme)
                            .filter(Boolean)
                            .join(' · ')}
                        </div>
                        <div style={{ marginTop: '14px' }}>
                          <Link
                            className="btn small"
                            to={`/college?id=${encodeURIComponent(x.c.id)}`}
                          >
                            View Details
                          </Link>{' '}
                          <button
                            type="button"
                            className="btn small outline"
                            onClick={() => handleSaveMatch(x.c.id, 'target')}
                          >
                            Save
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
