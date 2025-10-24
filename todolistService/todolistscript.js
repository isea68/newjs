import { getTodoList, setTodoList } from './store.js';

// titleList, selectedTitles, completedTitles 초기화
let titleList = getTodoList();
let selectedTitles = JSON.parse(localStorage.getItem('selectedTitles')) || [];
let completedTitles = JSON.parse(localStorage.getItem('completedTitles')) || [];

console.log('초기 titleList:', titleList); // 디버깅
console.log('초기 completedTitles:', completedTitles); // 디버깅

// localStorage에 데이터 저장
function saveToLocalStorage() {
    try {
        setTodoList(titleList);
        localStorage.setItem('selectedTitles', JSON.stringify(selectedTitles));
        localStorage.setItem('completedTitles', JSON.stringify(completedTitles));
        console.log('localStorage 저장 완료:', { titleList, selectedTitles, completedTitles });
    } catch (error) {
        console.error('localStorage 저장 실패:', error);
        alert('데이터 저장에 실패했습니다.');
    }
}

function renderLists() {
    const titleDiv = document.getElementById("titleList");
    const selectedDiv = document.getElementById("selectedList");
    const completedDiv = document.getElementById("completedList");

    if (!titleDiv || !selectedDiv || !completedDiv) {
        console.error("DOM 요소를 찾을 수 없습니다:", { titleDiv, selectedDiv, completedDiv });
        return;
    }

    console.log("renderLists 호출, titleList:", titleList, "selectedTitles:", selectedTitles, "completedTitles:", completedTitles); // 디버�ING

    // 전체 목록 렌더링
    titleDiv.innerHTML = "";
    if (titleList.length === 0) {
        titleDiv.innerHTML = '<p>전체 목록이 비어 있습니다.</p>';
    } else {
        titleList.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "title-item";
            div.innerHTML = `<span>${item.title} (${item.date})</span>
                            <button onclick="window.selectTitle(${index})">선택</button>`;
            titleDiv.appendChild(div);
        });
    }

    // 선택된 목록 렌더링
    selectedDiv.innerHTML = "";
    if (selectedTitles.length === 0) {
        selectedDiv.innerHTML = '<p>선택된 목록이 비어 있습니다.</p>';
    } else {
        selectedTitles.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "title-item";
            div.innerHTML = `<span>${item.title} (${item.date})</span>
                            <button onclick="window.deselectTitle(${index})">해제</button>
                            <button onclick="window.completeTitle(${index})">완료</button>`;
            selectedDiv.appendChild(div);
        });
    }

    // 완료된 목록 렌더링
    completedDiv.innerHTML = "";
    if (completedTitles.length === 0) {
        completedDiv.innerHTML = '<p>완료된 목록이 비어 있습니다.</p>';
    } else {
        completedTitles.forEach((item, index) => {
            const div = document.createElement("div");
            div.className = "title-item";
            div.innerHTML = `<span>${item.title} (${item.date})</span>
                            <button onclick="window.undoCompleteTitle(${index})">해제</button>`;
            completedDiv.appendChild(div);
        });
    }
}

function selectTitle(index) {
    if (index < 0 || index >= titleList.length) {
        console.error(`잘못된 인덱스: ${index}`);
        return;
    }
    console.log(`선택: ${titleList[index].title}`);
    selectedTitles.push(titleList[index]);
    titleList.splice(index, 1);
    saveToLocalStorage();
    renderLists();
}

function deselectTitle(index) {
    if (index < 0 || index >= selectedTitles.length) {
        console.error(`잘못된 인덱스: ${index}`);
        return;
    }
    console.log(`해제: ${selectedTitles[index].title}`);
    titleList.push(selectedTitles[index]);
    selectedTitles.splice(index, 1);
    saveToLocalStorage();
    renderLists();
}

function undoCompleteTitle(index) {
    if (index < 0 || index >= completedTitles.length) {
        console.error(`잘못된 인덱스: ${index}`);
        return;
    }
    console.log(`완료 해제: ${completedTitles[index].title}`);
    selectedTitles.push(completedTitles[index]);
    completedTitles.splice(index, 1);
    saveToLocalStorage();
    renderLists();
}

function completeTitle(index) {
    if (index < 0 || index >= selectedTitles.length) {
        console.error(`잘못된 인덱스: ${index}`);
        return;
    }
    console.log(`완료: ${selectedTitles[index].title}`);
    completedTitles.push(selectedTitles[index]);
    selectedTitles.splice(index, 1);
    saveToLocalStorage();
    renderLists();
}

function addTitle() {
    const titleName = document.getElementById("titleInput").value.trim();
    const date = document.getElementById("dateInput").value.trim();
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;

    if (!titleName || !date || !dateRegex.test(date)) {
        alert("목록 이름과 날짜(YYYY/MM/DD 형식)를 올바르게 입력하세요.");
        return;
    }

    titleList.push({ title: titleName, date });
    saveToLocalStorage();
    document.getElementById("titleInput").value = "";
    document.getElementById("dateInput").value = "";
    renderLists();
}

function sortTitles() {
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
    if (titleList.some(item => !dateRegex.test(item.date))) {
        console.error('유효하지 않은 날짜 형식이 포함되어 있습니다:', titleList);
        alert('정렬할 수 없습니다. 모든 항목의 날짜가 YYYY/MM/DD 형식이어야 합니다.');
        return;
    }

    console.log('정렬 전:', titleList);
    titleList.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (isNaN(dateA) || isNaN(dateB)) {
            console.error('날짜 파싱 실패:', { dateA: a.date, dateB: b.date });
            return 0;
        }
        return dateA - dateB;
    });
    console.log('정렬 후:', titleList);
    saveToLocalStorage();
    renderLists();
}

// 전역 스코프에 함수 등록
window.selectTitle = selectTitle;
window.deselectTitle = deselectTitle;
window.addTitle = addTitle;
window.sortTitles = sortTitles;
window.completeTitle = completeTitle;
window.undoCompleteTitle = undoCompleteTitle;
console.log("window.undoCompleteTitle defined:", !!window.undoCompleteTitle); // 디버깅

// 이벤트 리스너 추가
document.querySelector('button[onclick="window.addTitle()"]')?.addEventListener('click', addTitle);

// 초기 렌더링
renderLists();