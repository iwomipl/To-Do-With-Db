const { ValidationError } = require('../utils/errors');

class TodoRecord {
  constructor(obj) {
    this.id = obj.id;
    this.title = obj.title;
    this._validate();
  }

  _validate() {
    if ((this.title.trim().length < 5)) {
      throw new ValidationError('Todo title should be at least 5 characters.');
    }
    if ((this.title.length > 150)) {
      throw new ValidationError('Todo title should be at most 150 characters.');
    }
  }
}
module.exports = {
  TodoRecord,
};
