// const todolist = [
//     { title: "정보처리기사 취득", date: '2025/12/24' },
//     { title: "취업", date: '2026/2/27' },
//     { title: "SQLD", date: '2026/4/3' },
//     { title: "ADsP", date: '2026/3/20' },
//     { title: "빅데이터 분석기사", date: '2025/4/24' },
//     { title: "정보보안기사", date: '2026/5/8' },
//     { title: "여행", date: '2026/6/6' },
//     { title: "출간", date: '2026/12/31' },
//     { title: "사무실", date: '2028/12/31' },
//     { title: "시골한달살기(2회)", date: '2030/12/31' },
//   ];

// // export 키워드
// export {todolist}

// 수정된 store.js ---------------------------------

// 초기 데이터 (모든 날짜를 YYYY/MM/DD로 정규화)
// 초기 데이터 (빅데이터 분석기사 날짜를 2026/04/24로 수정)
const defaultList = [
    { title: "정보처리기사 취득", date: '2025/04/24' },
    { title: "취업", date: '2026/02/27' },
    { title: "SQLD", date: '2026/04/03' },
    { title: "ADsP", date: '2026/03/20' },
    { title: "빅데이터 분석기사", date: '2026/04/24' }, // 날짜 수정
    { title: "정보보안기사", date: '2026/05/08' },
    { title: "여행", date: '2026/06/06' },
    { title: "출간", date: '2026/12/31' },
    { title: "사무실", date: '2028/12/31' },
    { title: "시골한달살기(2회)", date: '2030/12/31' },
];

// 날짜 형식을 YYYY/MM/DD로 정규화하는 함수
function normalizeDate(dateStr) {
    try {
        const parts = dateStr.split('/');
        const year = parts[0];
        const month = parts[1].padStart(2, '0');
        const day = parts[2].padStart(2, '0');
        return `${year}/${month}/${day}`;
    } catch (error) {
        console.error('날짜 정규화 실패:', dateStr, error);
        return dateStr;
    }
}

// localStorage 초기화 및 정규화
function initializeTodoList() {
    let todoList = JSON.parse(localStorage.getItem('todolist')) || [];
    // 기존 데이터와 defaultList 동기화
    if (todoList.length === 0 || JSON.stringify(todoList) !== JSON.stringify(defaultList)) {
        todoList = defaultList.map(item => ({
            ...item,
            date: normalizeDate(item.date)
        }));
        localStorage.setItem('todolist', JSON.stringify(todoList));
        console.log('localStorage 초기화:', todoList);
    }
    return todoList;
}

// localStorage에서 todolist 불러오기
function getTodoList() {
    const todoList = JSON.parse(localStorage.getItem('todolist')) || [];
    console.log('getTodoList:', todoList);
    return todoList.length > 0 ? todoList : defaultList;
}

// localStorage에 todolist 저장
function setTodoList(list) {
    try {
        localStorage.setItem('todolist', JSON.stringify(list));
        console.log('setTodoList 저장 완료:', list);
    } catch (error) {
        console.error('localStorage 저장 실패:', error);
    }
}

// 초기화 실행
initializeTodoList();

export { getTodoList, setTodoList };