const express = require('express');

const webserver = express();
const port = 7381;
const formOpen = '<form method="get" action="/form">';
const formClose = '</form>';
const btn = '<button type="submit">отправить</button>';
const inputFieldName =
  '<label for="name">Ваше имя: </label><input type="text" name="name" value="';
const inputFieldAge =
  '<label for="age">Ваш возраст: </label><input type="text" name="age" value="';
const inputFieldFinish = '" />';

webserver.get('/form', (req, res) => {
  let name = req.query.name;
  let age = req.query.age;
  let msgName = '';
  let msgAge = '';
  if (!!parseInt(name) || name == 'undefined')
    msgName = 'Введено некорректное имя';
  if (!parseInt(age) || parseInt(age) > 150)
    msgAge = 'Введено некорректное значение возраста';
  if (
    !parseInt(name) &&
    name !== 'undefined' &&
    !!parseInt(age) &&
    parseInt(age) < 150
  )
    res.send(`Приветствую, ${name}! Ваш возраст ${age}`);
  else
    res.send(
      `${formOpen}${inputFieldName}${name}${inputFieldFinish} ${btn} ${msgName}<br />${inputFieldAge}${age}${inputFieldFinish} ${btn} ${msgAge}${formClose}`
    );
});

webserver.listen(port, () => {
  console.log('server running on port ' + port);
});
