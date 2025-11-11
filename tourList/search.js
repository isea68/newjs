// search.js
export function initSearch(travelData, onSearch) {
  const keys = ['date', 'region', 'tourist_spot', 'transportation', 'weather', 'purpose'];
  
  keys.forEach(key => {
    const select = document.getElementById(key);
    if (!select) return;
    select.innerHTML = '<option value="">전체</option>';
    const values = [...new Set(travelData.map(d => d[key]).filter(v => v))].sort();
    values.forEach(val => {
      const opt = document.createElement('option');
      opt.value = opt.textContent = val;
      select.appendChild(opt);
    });
  });

  const searchBtn = document.getElementById('searchBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const cond = {};
      keys.forEach(k => cond[k] = document.getElementById(k)?.value || '');
      const filtered = travelData.filter(item =>
        keys.every(k => !cond[k] || item[k] === cond[k])
      );
      onSearch(filtered);
    });
  }
}