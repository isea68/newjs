// api.js
const API_URL = 'http://192.168.1.2:8080/travel-data1';

/**
 * 서버에서 여행 데이터를 가져옵니다.
 * @returns {Promise<Array>} 여행 데이터 배열
 */
export async function fetchTravelData() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // 필요시 CORS 설정 (서버에서 허용 필요)
      // credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('서버에서 배열 형식이 아닙니다.');
    }

    console.log('서버 데이터 로드 성공:', data.length, '건');
    return data;

  } catch (error) {
    console.error('데이터 로드 실패:', error);
    alert(`데이터를 불러오지 못했습니다.\n${error.message}\n서버를 확인하세요.`);
    return []; // 에러 시 빈 배열 반환
  }
}