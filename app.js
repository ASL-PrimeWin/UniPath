function nav(){
  const current=(location.pathname.split('/').pop()||'index.html');
  return `<header class="navbar">
    <div class="nav-wrap">
      <a class="logo" href="index.html" aria-label="UniPath home"><img src="nipath-logo.png" alt="UniPath"></a>
      <nav class="nav-links" aria-label="Primary navigation">
        <a href="index.html">Home</a>
        <a href="colleges.html">Colleges</a>
        <a href="rankings.html">NIRF Rankings</a>
        <a href="find.html">Find My College</a>
        <a href="compare.html">Compare</a>
        <a href="shortlist.html">Shortlist</a>
        <a href="roadmap.html">Roadmap</a>
        <a href="scholarships.html">Scholarships</a>
      </nav>
      <div class="nav-actions">
        <a class="btn outline nav-login" href="register.html">Login / Sign Up</a>
      </div>
      <button class="mobile-menu" aria-label="Open menu" onclick="document.body.classList.toggle('menu-open')">☰</button>
    </div>
  </header>`;
}
function foot(){return `<footer><div class="container footer-inner"><div><div class="footer-logo">UniPath</div><div class="muted">Find Your Right Path.</div></div><div class="muted">© 2026 UniPath · Student-first college discovery</div></div></footer>`;}
document.addEventListener('DOMContentLoaded',()=>{
  const n=document.getElementById('site-nav'),f=document.getElementById('site-footer');
  if(n)n.innerHTML=nav(); if(f)f.innerHTML=foot();
  const cur=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{if(a.getAttribute('href')===cur)a.classList.add('active')});
});
