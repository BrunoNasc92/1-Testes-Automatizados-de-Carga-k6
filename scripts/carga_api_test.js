import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 500,
  duration: '5m',
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% das requisições devem durar menos de 500ms
    http_req_failed: ['rate<0.01'],   // menos de 1% de falhas
  },
};

export default function () {
  const res = http.get('https://mockapi.io'); 

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
