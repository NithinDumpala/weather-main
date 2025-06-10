<!-- script2.js -->
// Uses window.dailyForecast set by script.js
function populateForecast() {
  const body = document.getElementById('forecast-table-body');
  const daily = window.dailyForecast;
  if (!daily) return;

  body.innerHTML = '';
  for (let i = 0; i < daily.time.length; i++) {
    const date = daily.time[i];
    const maxT = daily.temperature_2m_max[i];
    const minT = daily.temperature_2m_min[i];
    const row = `<tr>
      <td>${date}</td>
      <td>${maxT.toFixed(1)}</td>
      <td>--</td>
      <td>--</td>
    </tr>`;
    body.insertAdjacentHTML('beforeend', row);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Delay to ensure window.dailyForecast is set
  setTimeout(populateForecast, 1000);
});
