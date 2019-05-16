import express from 'express';
import https from 'https';
import { resolve } from 'path';
import cors from 'cors';

const fetchData = (callback, params = null, page = null) => {
  const endpoint = 'https://reqres.in/api/users/';
  const url = `${endpoint}${params && params.id ? params.id : ''}${page ? '?page=' + page : ''}`;
  https.get(url, response => {
    let body = '';
    response.setEncoding('utf8');
    response.on('data', data => {
      body += data;
    });
    response.on('end', () => {
      body = JSON.parse(body);
      callback(body);
    });
  });
}; 

const app = express();

app.use(cors());
app.use(express.static(__dirname +'./../client-build/'));

app.get('/api/users', ({ query }, response) => {
  const { page = 1 } = query; 
  fetchData(
    result => response.json(result),
    null,
    page
  );
});

app.get('/api/users/:id', ({ params }, response) => {
  const { id } = params;
  fetchData(
    result => response.json(result),
    { id },
    null
  );
});

app.get('*', (_, response) => 
  response.sendFile(resolve('client-build/index.html'))
);

app.listen(5000, () => console.log('Listening on port 5000'));
