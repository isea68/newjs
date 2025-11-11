// delete.js
let selectedId = null;

export function initDelete(onDelete) {
  const wrapper = document.querySelector('.add-btn-wrapper');
  if (!wrapper) {
    console.error('add-btn-wrapper not found!');
    return { setSelectedId: () => {} };
  }

  const deleteBtn = document.createElement('button');
  deleteBtn.id = 'deleteBtn';
  deleteBtn.textContent = '삭제';
  deleteBtn.className = 'add-btn';
  deleteBtn.style.background = '#ef4444';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.disabled = true;
  wrapper.appendChild(deleteBtn);

  deleteBtn.addEventListener('click', () => {
    if (!selectedId || !confirm('정말 삭제하시겠습니까?')) return;
    onDelete(selectedId);
    selectedId = null;
    deleteBtn.disabled = true;
    document.querySelectorAll('#resultsTable tbody tr').forEach(tr => tr.classList.remove('selected'));
  });

  return {
    setSelectedId: (id) => {
      selectedId = id;
      deleteBtn.disabled = false;
    }
  };
}