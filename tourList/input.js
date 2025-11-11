// input.js
export function initInput(onAdd) {
  const addBtn = document.getElementById('addBtn');
  if (!addBtn) {
    console.error('addBtn not found!');
    return;
  }

  addBtn.addEventListener('click', () => {
    const dateVal = document.getElementById('inDate').value;
    if (!dateVal) return alert('날짜를 선택하세요.');

    const item = {
      date: dateVal,
      region: document.getElementById('inRegion').value.trim(),
      tourist_spot: document.getElementById('inSpot').value.trim(),
      people: Number(document.getElementById('inPeople').value) || 0,
      introduction: document.getElementById('inIntro').value.trim(),
      transportation: document.getElementById('inTrans').value.trim(),
      weather: document.getElementById('inWeather').value.trim(),
      spending: Number(document.getElementById('inSpending').value) || 0,
      purpose: document.getElementById('inPurpose').value.trim(),
      stay_time: Number(document.getElementById('inStay').value) || 0
    };

    if (!item.region || !item.tourist_spot) return alert('지역과 관광지는 필수입니다.');

    onAdd(item);
    document.querySelectorAll('.input-grid input, .input-grid textarea').forEach(el => el.value = '');
  });
}