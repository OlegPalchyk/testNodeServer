import * as items from './items/items';

let routes =  (app) =>{
    app.route('/api')
        .get(items.getAll)
        .post(items.editItem)
        .put(items.addItem)
        .delete(items.removeItem)

};
export default routes;