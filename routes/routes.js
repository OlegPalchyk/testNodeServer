import * as items from './items';
import * as peoplesApi from './people';

let routes = app => {
    app.route('/api')
        .get(items.getAll)
        .post(items.editItem)
        .put(items.addItem)
        .delete(items.removeItem);

    /* PEOPLE ROUTE
     * ===================  */

    app.route('/people')
        .options(peoplesApi.options)
        .get(peoplesApi.getPeoplesList)
        .post(peoplesApi.updatePerson)
        .put(peoplesApi.addPerson)
        .delete(peoplesApi.removePerson);

    app.route('/people/:id')
       .get(peoplesApi.getPerson);

    /* PEOPLE ROUTE
     * ===================  */

};

export default routes;