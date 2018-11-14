import peoples from './data.json';
import Error from '../../DefaultError';
const fs = require('fs');

exports.getPeoplesList = (req, res) => {
  res.json({
    ...peoples,
    status: 200
  });
};

exports.getPerson = ({ params: { id }}, res) => {
  res.json({
    person: peoples.list.find((item) => {
      return item.id === id;
    }),
    status: 200
  });
};

exports.options = (req, res) => {
  res.json({
    "status": "OK"
  });
};

exports.addPerson = (req, res) => {
  if (!req.body) return Error(res, "no Body", 500);
  let item = req.body;

  // это кастомная проверка, можешь убрать, типа что какой то ключ обязательный
  if (!item.name) return Error(res, "Name is requires!", 404);

  // псевдо генератор рандомных ИД ( спизженый на просотрах гитхаба)
  item.id = peoples.list.length;

  peoples.list.push(item);

  fs.writeFile('data.json', JSON.stringify(peoples), function(err) {
    if (err) throw err;
    console.log('complete add person');
  });

  return res.json({item});
};

exports.removePerson = (req, res) => {
  if (!('id' in req.body)) return Error(res, "Id is required", 404);

  let id = req.body.id;
  let indexOfItem = peoples.list.findIndex(i => i.id == id);

  // проверка на то что нельзя удалить то чего нету
  if (indexOfItem === -1) return Error(res, "No item with this ID", 404);

  peoples.list.slice(indexOfItem, 1);

  return res.json({"message": "removed"})
};

exports.updatePerson = (req, res) => {
  if (!('id' in req.body)) return Error(res, "Id is required", 404);

  let id = req.body.id;
  let indexOfItem = peoples.list.findIndex(i => i.id == id)
  if (indexOfItem === -1) return Error(res, "No item with this ID", 404)
  // место где можн оуказать обязательные поля, или можно как сделано в монге чисто ассайнить, чтобы никакие поля не терялись
  // if(!req.body.name) return Error(res, "Name is requires!", 404)
  let updatedItem = {...peoples.list[indexOfItem], ...req.body}
  peoples.list[indexOfItem] = updatedItem;
  return res.json(updatedItem)
};