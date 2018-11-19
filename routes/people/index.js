import peoples from './data.json';
import Error from '../../DefaultError';

let allUsers = peoples.list;

exports.getPeoplesList = (req, res) => {
  return res.json({
    peoples,
    status: 200
  });
};

exports.getPerson = ({ params: { id }}, res) => {
  return res.json({
    person: allUsers.find((item) => {
      return item.id === id;
    }),
    status: 200
  });
};

exports.options = (req, res) =>
  res.json({
    status: 200
  });

exports.addPerson = (req, res) => {
  if (!req.body) return Error(res, "no Body", 500);
  let item = req.body;

  // это кастомная проверка, можешь убрать, типа что какой то ключ обязательный
  if (!item.name) return Error(res, "Name is requires!", 404);

  if (allUsers.find(({ id }) => (id == item.id))) {
    return res.json({
      reason: "User already exist, please use POST method"
    });
  }

  // псевдо генератор рандомных ИД ( спизженый на просотрах гитхаба)
  item.id = allUsers.length;

  allUsers.push(item);

  return res.json({
    person: item,
    status: 200
  });
};

exports.removePerson = (req, res) => {
  if (!('id' in req.body)) return Error(res, "Id is required", 404);

  let id = req.body.id;
  let indexOfItem = allUsers.findIndex(i => i.id == id);

  // проверка на то что нельзя удалить то чего нету
  if (indexOfItem === -1) return Error(res, "No item with this ID", 404);

  allUsers.slice(indexOfItem, 1);

  return res.json({
    message: "removed",
    status: 200
  });
};

exports.updatePerson = (req, res) => {
  if (!('id' in req.body)) return Error(res, "Id is required", 404);

  let id = req.body.id;
  let indexOfItem = allUsers.findIndex(i => i.id == id)
  if (indexOfItem === -1) return Error(res, "No item with this ID", 404)
  // место где можн оуказать обязательные поля, или можно как сделано в монге чисто ассайнить, чтобы никакие поля не терялись
  // if(!req.body.name) return Error(res, "Name is requires!", 404)
  let updatedItem = {...allUsers[indexOfItem], ...req.body}
  allUsers[indexOfItem] = updatedItem;

  return res.json({
    person: updatedItem,
    status: 200
  });
};