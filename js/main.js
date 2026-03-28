document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});

const nichesGrid = document.getElementById('niches-grid');
const filterBar  = document.getElementById('filter-bar');
const footerNiches = document.getElementById('footer-niches');

DB.niches.forEach((niche, i) => {
  const count = DB.blogs.filter(b => b.niche === niche.id).length;
  nichesGrid.innerHTML += `
    <a href="niche.html?id=${niche.id}" class="niche-card" style="--delay:${i*0.08}s;--niche-color:${niche.color}">
      <div class="niche-card-icon">${niche.icon}</div>
      <div class="niche-card-name">${niche.name}</div>
      <div class="niche-card-desc">${niche.description}</div>
      <div class="niche-card-count">${count} article${count !== 1 ? 's' : ''}</div>
    </a>`;
  filterBar.innerHTML += `<button class="filter-btn" data-filter="${niche.id}">${niche.icon} ${niche.name}</button>`;
  footerNiches.innerHTML += `<a href="niche.html?id=${niche.id}">${niche.name}</a>`;
});

const blogsGrid = document.getElementById('blogs-grid');

function renderBlogs(filter = 'all') {
  blogsGrid.innerHTML = '';
  const list = filter === 'all' ? DB.blogs : DB.blogs.filter(b => b.niche === filter);
  if (!list.length) {
    blogsGrid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>No articles yet. <a href="admin/index.html">Add one →</a></p></div>`;
    return;
  }
  list.forEach((blog, i) => {
    const niche = DB.niches.find(n => n.id === blog.niche);
    blogsGrid.innerHTML += `
      <article class="blog-card" style="--delay:${i*0.08}s">
        <a href="blog.html?slug=${blog.slug}" class="card-img-wrap">
          <img src="${blog.image}" alt="${blog.title}" loading="lazy"/>
          <span class="card-niche-tag" style="background:${niche?.color||'#333'}">${niche?.icon||''} ${niche?.name||blog.niche}</span>
        </a>
        <div class="card-body">
          <div class="card-meta"><span>${blog.date}</span><span>${blog.read_time} read</span></div>
          <h3><a href="blog.html?slug=${blog.slug}">${blog.title}</a></h3>
          <p>${blog.meta_description}</p>
          <div class="card-tags">${blog.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        </div>
      </article>`;
  });
}

renderBlogs();

filterBar.addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderBlogs(btn.dataset.filter);
});

window.addEventListener('scroll', () => {
  document.getElementById('header').style.boxShadow =
    window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,0.5)' : 'none';
});
