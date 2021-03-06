import itemsArray from './data.json';
import Error from '../../DefaultError';

exports.getAll = (req, res) => {
  res.json(itemsArray);
};

exports.addItem = (req, res) => {
  // Чисто проверка что бы не пустое пришло Боди
  if (!req.body) return Error(res, "no Body", 500);
  let item = req.body;

  // это кастомная проверка, можешь убрать, типа что какой то ключ обязательный
  if (!item.name) return Error(res, "Name is requires!", 404);

  // псевдо генератор рандомных ИД ( спизженый на просотрах гитхаба)
  item.id = '_' + Math.random().toString(36).substr(2, 9);

  itemsArray.items.push(item);
  return res.json({item});
};

exports.removeItem = (req, res) => {
  if (!('id' in req.body)) return Error(res, "Id is required", 404);

  let id = req.body.id;
  let indexOfItem = itemsArray.items.findIndex(i => i.id == id);

  // проверка на то что нельзя удалить то чего нету
  if (indexOfItem === -1) return Error(res, "No item with this ID", 404);

  itemsArray.items.slice(indexOfItem, 1);

  return res.json({"message": "removed"})
};

exports.editItem = (req, res) => {
  if (!('id' in req.body)) return Error(res, "Id is required", 404);

  let id = req.body.id;
  let indexOfItem = itemsArray.items.findIndex(i => i.id == id)
  if (indexOfItem === -1) return Error(res, "No item with this ID", 404)
  // место где можн оуказать обязательные поля, или можно как сделано в монге чисто ассайнить, чтобы никакие поля не терялись
  // if(!req.body.name) return Error(res, "Name is requires!", 404)
  let updatedItem = {...itemsArray.items[indexOfItem], ...req.body}
  itemsArray.items[indexOfItem] = updatedItem;
  return res.json(updatedItem)
};