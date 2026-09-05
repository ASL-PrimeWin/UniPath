function nav(){
  return `<header class="navbar">
    <a class="logo" href="index.html" aria-label="NIPATH home"><img src="nipath-logo.png" alt="NIPATH - Find Your Right Path"></a>
    <nav class="nav-links">
      <a href="index.html">Home</a>
      <a href="colleges.html">Colleges</a>
      <a href="rankings.html">NIRF Rankings</a>
      <a href="exams.html">Exams</a>
      <a href="find.html">Find My College</a>
      <a href="dashboard.html">Dashboard</a>
    </nav>
    <div class="nav-actions">
      <a class="btn login-btn" href="dashboard.html">Login / Sign Up</a>
      <a class="btn premium-nav-btn" href="premium.html">Get Premium</a>
    </div>
  </header>`;
}

function foot(){
  return `<footer><div class="container footer-inner">
    <div><div class="footer-logo">NIPATH</div><div>Find your right path.</div></div>
    <div>© 2026 UniPath · Student-first college discovery</div>
  </div></footer>`;
}

document.addEventListener('DOMContentLoaded',()=>{
  const navRoot=document.getElementById('site-nav');
  const footerRoot=document.getElementById('site-footer');
  if(navRoot) navRoot.innerHTML=nav();
  if(footerRoot) footerRoot.innerHTML=foot();
  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    if(a.getAttribute('href')===current) a.classList.add('active');
  });
});
