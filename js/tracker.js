(function(){
  var key = 'np_analytics';
  var d   = new Date().toISOString().split('T')[0];
  var p   = location.pathname + location.search;
  try {
    var db = JSON.parse(localStorage.getItem(key) || '{}');
    if (!db.days)      db.days      = {};
    if (!db.pages)     db.pages     = {};
    if (!db.countries) db.countries = {};
    if (!db.days[d])   db.days[d]   = { total: 0, pages: {}, hours: {} };

    // total + per-page for today
    db.days[d].total++;
    db.days[d].pages[p] = (db.days[d].pages[p] || 0) + 1;

    // hourly breakdown
    var h = new Date().getHours();
    db.days[d].hours[h] = (db.days[d].hours[h] || 0) + 1;

    // all-time page views
    db.pages[p] = (db.pages[p] || 0) + 1;

    // estimated country from browser locale
    var lang = (navigator.language || 'en').split('-')[1] || 'US';
    db.countries[lang] = (db.countries[lang] || 0) + 1;

    localStorage.setItem(key, JSON.stringify(db));
  } catch(e) {}
})();
