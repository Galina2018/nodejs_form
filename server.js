const express = require('express');

const webserver = express();
const port = 7381;

function removeHtml(data) {
  if (!data) return data;
  data
    .toString()
    .replaceAll('&', '')
    .replaceAll('"', '')
    .replaceAll("'", '')
    .replaceAll('<', '')
    .replaceAll('>', '');
  return data;
}

const congregateForm = (fio, errors) => {
  return `
            ${errors ? 'есть ошибки, исправьте!' : ''}
            <form action="/form2">
            ${errors?.name || ''}<br />
            Ваше имя (кириллица): <input type="text" name="name" 
            value="${removeHtml(fio.name)}"></input><br /><br />
            ${errors?.age || ''}<br />
            Ваш возраст: <input type="text" name="age" 
            value="${removeHtml(fio.age)}"></input><br /><br />
            <button type="submit">отправить</button>
            </form>`;
};
webserver.get('/form', (req, res) => {
  res.send(congregateForm({ name: '', age: '' }, null));
});
webserver.get('/form2', (req, res) => {
  const errors = {};
  let flagError = false;
  let name = req.query.name;
  let age = req.query.age;
  if (!name || !name.match(/^[А-Яа-я]+-?[А-Яа-я]*$/)) {
    errors.name = 'Некорректное имя';
    flagError = true;
  }
  if (!age || age > 150) {
    errors.age = 'Некорректный возраст';
    flagError = true;
  }
  if (!flagError)
    res.send(
      `Приветствую, ${removeHtml(name)}! Ваш возраст ${removeHtml(age)}`
    );
  else res.send(congregateForm(req.query, errors));
});

webserver.listen(port, () => {
  console.log('server running on port ' + port);
});
