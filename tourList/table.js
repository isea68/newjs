// table.js
export function renderTable(data, onRowClick) {
  const tbody = document.querySelector('#resultsTable tbody');
  const noResults = document.getElementById('noResults');
  if (!tbody || !noResults) return;

  tbody.innerHTML = '';

  if (!data || data.length === 0) {
    noResults.textContent = '검색 결과가 없습니다.';
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    tr.innerHTML = `
      <td>${item.date}</td>
      <td>${item.region}</td>
      <td>${item.tourist_spot}</td>
      <td>${item.people}명</td>
      <td>${item.introduction}</td>
      <td>${item.transportation}</td>
      <td>${item.weather}</td>
      <td>${item.spending.toLocaleString()}원</td>
      <td>${item.purpose}</td>
      <td>${item.stay_time}시간</td>
    `;
    tr.addEventListener('click', () => {
      document.querySelectorAll('#resultsTable tbody tr').forEach(r => r.classList.remove('selected'));
      tr.classList.add('selected');
      if (onRowClick) onRowClick(item.id);
    });
    tbody.appendChild(tr);
  });
}

export function updateTotalCount(count) {
  const el = document.getElementById('totalCount');
  if (el) el.textContent = count;
}