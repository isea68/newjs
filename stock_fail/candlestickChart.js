// candlestickChart.js
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM 로드 완료');

  // 1. Chart.js 본체 로드 확인
  if (typeof Chart === 'undefined') {
    console.error('Chart.js가 로드되지 않았습니다.');
    document.body.insertAdjacentHTML('beforeend', '<p class="error">Chart.js 라이브러리 로드 실패</p>');
    return;
  }

  // 2. financial 차트 타입 등록 확인
  if (!Chart.registry.getChartType('candlestick')) {
    console.error('chartjs-chart-financial이 로드되지 않았습니다.');
    document.body.insertAdjacentHTML('beforeend', '<p class="error">캔들스틱 라이브러리 로드 실패</p>');
    return;
  }

  // 3. 데이터 확인
  if (!window.stockData || window.stockData.length === 0) {
    console.error('주가 데이터 없음');
    document.querySelector('.chart-container').innerHTML = '<p class="error">주가 데이터 없음</p>';
    return;
  }

  const canvas = document.getElementById('candlestickChart');
  if (!canvas) {
    console.error('캔버스 없음');
    return;
  }

  // 4. 캔들 데이터 변환 (타입 보장)
  const chartData = window.stockData.map(item => {
    const o = Number(item.open);
    const h = Number(item.high);
    const l = Number(item.low);
    const c = Number(item.close);

    if (isNaN(o) || isNaN(h) || isNaN(l) || isNaN(c)) {
      console.warn('잘못된 숫자 데이터:', item);
      return null;
    }

    return {
      x: `${item.stock_name}\n(${item.ticker})`,
      o, h, l, c
    };
  }).filter(Boolean);

  if (chartData.length === 0) {
    console.error('유효한 캔들 데이터 없음');
    return;
  }

  console.log('캔들 데이터 준비 완료:', chartData);

  // 5. 차트 생성
  new Chart(canvas.getContext('2d'), {
    type: 'candlestick',
    data: {
      datasets: [{
        label: '주가',
        data: chartData,
        color: { up: '#10B981', down: '#EF4444', unchanged: '#9CA3AF' },
        borderColor: { up: '#059669', down: '#DC2626', unchanged: '#6B7280' },
        borderWidth: 1.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: () => '2025년 11월 1일',
            label: (ctx) => {
              const p = ctx.raw;
              const change = p.c - p.o;
              const pct = p.o ? ((change / p.o) * 100).toFixed(2) : '0.00';
              const sign = change >= 0 ? '+' : '';
              return [
                `시가: ${p.o.toLocaleString()}원`,
                `고가: ${p.h.toLocaleString()}원`,
                `저가: ${p.l.toLocaleString()}원`,
                `종가: ${p.c.toLocaleString()}원`,
                `등락: ${sign}${change.toLocaleString()}원 (${pct}%)`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          type: 'category',
          title: { display: true, text: '종목', font: { size: 14, weight: 'bold' } },
          grid: { display: false },
          ticks: { font: { size: 11 }, maxRotation: 0 }
        },
        y: {
          title: { display: true, text: '주가 (KRW)', font: { size: 14, weight: 'bold' } },
          ticks: { callback: v => v.toLocaleString() + '원' }
        }
      }
    }
  });

  console.log('캔들스틱 차트가 성공적으로 그려졌습니다!');
});