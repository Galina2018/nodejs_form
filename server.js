const express = require('express');

const webserver = express();
webserver.use(express.urlencoded({ extended: true }));
const port = 7381;

function removeHtml(data) {
  if (!data) return data;
  data
    .replaceAll('&', '')
    .replaceAll('"', '')
    .replaceAll("'", '')
    .replaceAll('<', '')
    .replaceAll('>', '');
  return data;
}

const congregateForm = (fio, errors) => {
  return `
            ${errors.name || errors.age ? 'есть ошибки, исправьте!' : ''}
            <form action="/form" method="POST">
            ${errors.name || ''}<br />
            Ваше имя (кириллица): <input type="text" name="name" 
            value="${removeHtml(fio.name)}"></input><br /><br />
            ${errors.age || ''}<br />
            Ваш возраст: <input type="text" name="age" 
            value="${removeHtml(fio.age)}"></input><br /><br />
            <button type="submit">отправить</button>
            </form>`;
};

webserver.get('/form', (req, res) => {
  res.send(congregateForm({ name: '', age: '' }, {}));
});

webserver.post('/form', (req, res) => {
  const errors = {};
  let flagError = false;
  let name = req.body.name;
  let age = req.body.age;
  if (!name || !name.match(/^[А-Яа-я]+-?[А-Яа-я]*$/)) {
    errors.name = 'Некорректное имя';
    flagError = true;
  }
  if (!age || !age.match(/^\d+$/) || age > 150) {
    errors.age = 'Некорректный возраст';
    flagError = true;
  }
  if (!flagError) res.redirect(301, `/page?name=${name}&age=${age}`);
  else res.send(congregateForm(req.body, errors));
});

webserver.get('/page', (req, res) => {
  let name = req.query.name;
  let age = req.query.age;
  res.send(`Приветствую, ${removeHtml(name)}! Ваш возраст ${removeHtml(age)}`);
});

webserver.listen(port, () => {
  console.log('server running on port ' + port);
});
