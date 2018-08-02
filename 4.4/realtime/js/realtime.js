const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
  const datas = JSON.parse(event.data);

  if (isFirst) {
    datas.forEach(data => {
      let keys = [];
      for (let key in data) {
        keys.push(key);
      }
      realtime.addData([Number(data[keys[1]])], data[keys[0]]);
    });

    isFirst = false;
  } else {
    realtime.removeData();

    let keys = [];
    for (let key in datas) {
      keys.push(key);
    }
    realtime.addData([Number(datas[keys[1]])], datas[keys[0]]);
  }
});
