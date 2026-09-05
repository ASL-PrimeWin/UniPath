function go(){const q=document.getElementById('search').value.trim();if(q)location.href='colleges.html?q='+encodeURIComponent(q);}
function quick(q){document.getElementById('search').value=q;go();}
