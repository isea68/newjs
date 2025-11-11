// crud.js
const STORAGE_KEY = 'userTravelEdits';
let edits = [];

export function loadEdits() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { edits = JSON.parse(stored); } catch (e) { edits = []; }
  }
  return edits;
}

export function saveEdits() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
}

export function applyEdits(serverData) {
  let data = [...serverData];
  const deleted = new Set(edits.filter(e => e.action === 'delete').map(e => e.id));
  data = data.filter(d => !deleted.has(d.id));
  edits.forEach(edit => {
    if (edit.action === 'add') data.push(edit.data);
    else if (edit.action === 'update') {
      const i = data.findIndex(d => d.id === edit.id);
      if (i !== -1) data[i] = { ...data[i], ...edit.data };
    }
  });
  return data;
}

export function addItem(item) {
  const maxId = Math.max(...edits.filter(e => e.action === 'add').map(e => e.data.id || 0), 0);
  item.id = maxId + 1;
  edits.push({ action: 'add', data: item });
  saveEdits();
}

// 삭제 기능 추가
export function deleteItem(id) {
  edits = edits.filter(e => !(e.action === 'delete' && e.id === id));
  edits.push({ action: 'delete', id });
  saveEdits();
}