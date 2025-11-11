// store.js - 서버에서 가져온 주가 데이터 (자동 생성)
// 경로: D:\workspace\Front1020\stock\store.js

console.log('store.js 로드 시작');

// 주가 데이터 (API_comm.html에서 생성)
const stockData = [
  {
    "id": 21,
    "date": "2025-11-01",
    "stock_name": "삼성전자",
    "ticker": "005930",
    "open": 78500,
    "close": 79000,
    "high": 79500,
    "low": 78000,
    "volume": 1200000,
    "market_cap": 500000000000,
    "sector": "전자"
  },
  {
    "id": 22,
    "date": "2025-11-01",
    "stock_name": "현대차",
    "ticker": "005380",
    "open": 210000,
    "close": 212000,
    "high": 215000,
    "low": 208000,
    "volume": 450000,
    "market_cap": 400000000000,
    "sector": "자동차"
  },
  {
    "id": 23,
    "date": "2025-11-01",
    "stock_name": "LG에너지솔루션",
    "ticker": "373220",
    "open": 420000,
    "close": 425000,
    "high": 428000,
    "low": 415000,
    "volume": 300000,
    "market_cap": 1000000000000,
    "sector": "배터리"
  }
];

// 전역 변수로 노출 (candlestickChart.js에서 사용)
window.stockData = stockData;

console.log('store.js 로드 완료. 데이터 개수:', window.stockData.length);