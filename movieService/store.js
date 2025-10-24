// 중앙 집중 방식으로 변수를 관리하기 위한 목적

// 영화의 제목을 저장하는 배열
const arr = ['무도실무관','극한직업무','부산행','뷰티인사이드','홈캠'];

// 이해를 돕기 위해서 다음 변수를 선언
export const title = "영화검색서비스"
const username = '김'
function abc() {
    return arr
}
// export 키워드는 외부에 자료를 넘기기 위한 목적
export {arr}
export {abc}