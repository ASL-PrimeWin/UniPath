import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { COLLEGES, FREE_DATASET_STATS } from '../../data/data.js';
import CollegeCard from '../../components/CollegeCard/CollegeCard.jsx';

export default function Colleges() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [q, setQ] = useState(initialQuery);
  const [category, setCategory] = useState('');
  const [program, setProgram] = useState('');
  const [fee, setFee] = useState('');

  // Active filter state
  const [activeFilters, setActiveFilters] = useState({
    q: initialQuery,
    category: '',
    program: '',
    fee: ''
  });

  // Categories list
  const cats = useMemo(() => {
    return [...new Set(COLLEGES.map((c) => c.category))].sort();
  }, []);

  // Program types list
  const progs = useMemo(() => {
    return [...new Set(COLLEGES.flatMap((c) => c.programs.map((p) => p.programme)).filter(Boolean))].sort();
  }, []);

  useEffect(() => {
    const qParam = searchParams.get('q') || '';
    setQ(qParam);
    setActiveFilters((prev) => ({ ...prev, q: qParam }));
  }, [searchParams]);

  const handleApply = () => {
    setActiveFilters({
      q,
      category,
      program,
      fee
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  const filteredColleges = useMemo(() => {
    const query = activeFilters.q.toLowerCase().trim();
    const cat = activeFilters.category;
    const pr = activeFilters.program;
    const feeText = activeFilters.fee.toLowerCase().trim();

    return COLLEGES.filter((c) => {
      const text = [c.name, c.category, ...c.programs.flatMap((p) => Object.values(p))]
        .join(' ')
        .toLowerCase();

      return (
        (!query || text.includes(query)) &&
        (!cat || c.category === cat) &&
        (!pr || c.programs.some((p) => p.programme === pr)) &&
        (!feeText || c.programs.some((p) => p.fees?.toLowerCase().includes(feeText)))
      );
    });
  }, [activeFilters]);

  return (
    <main className="page">
      <div className="container">
        <div className="page-title">
          <div className="eyebrow">DISCOVER</div>
          <h1>College Search</h1>
          <p>
            Search the complete UniPath free-tier dataset by institution, course, eligibility, entrance route, category or fee text.
          </p>
        </div>

        <section className="panel">
          <div className="filters">
            <input
              id="q"
              className="field"
              placeholder="College, course, eligibility or exam"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <select
              id="category"
              className="field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All categories</option>
              {cats.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <select
              id="program"
              className="field"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
            >
              <option value="">All programme types</option>
              {progs.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <input
              id="fee"
              className="field"
              placeholder="Fee text, e.g. ₹5 lakh"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn" onClick={handleApply}>
              Apply Filters
            </button>
          </div>
        </section>

        <div className="results-head">
          <h2>Institutions</h2>
          <span id="count" className="muted">
            {filteredColleges.length.toLocaleString('en-IN')} institution records
          </span>
        </div>

        <div id="results" className="card-list">
          {filteredColleges.length > 0 ? (
            filteredColleges.map((c) => <CollegeCard key={c.id} college={c} />)
          ) : (
            <div className="empty">
              <h2>No records found</h2>
              <p>
                Try a broader search. The spreadsheet contains {FREE_DATASET_STATS.institutionRecords} institution records.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
