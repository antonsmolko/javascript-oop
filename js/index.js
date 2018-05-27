import View from './view.js';
import Model from './model.js';
import Presenter from './presenter.js';

const model = new Model();
const presenter = new Presenter();
const view = new View(presenter);

presenter.init(model, view);