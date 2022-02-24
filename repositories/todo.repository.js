const { v4: uuid } = require('uuid');
const { log } = require('nodemon/lib/utils');
const { pool } = require('../utils/db');
const { TodoRecord } = require('../records/todo.record');

class TodoRepository {
  static _checkRecord(record) {
    if (!(record instanceof TodoRecord)) {
      throw new Error('Record must be an instance of TodoRecord');
    }
  }

  static async insert(record, sourceDb) {
    const source = sourceDb || 'todos';
    TodoRepository._checkRecord(record);
    record.id = record.id ?? uuid();
    await pool.execute(`INSERT INTO \`${source}\` VALUES(:id, :title)`, {
      id: record.id,
      title: record.title,
    });
    return record.id;
  }

  static async delete(record, sourceDb) {
    TodoRepository._checkRecord(record);

    if (!record.id) {
      throw new Error('Todo nas no ID.');
    }
    await pool.execute(`DELETE FROM \`${sourceDb}\` WHERE \`id\` = :id`, {
      id: record.id,
    });
  }

  static async find(id, sourceDb) {
    const [results] = await pool.execute(`SELECT * FROM \`${sourceDb}\` WHERE \`id\` = :id`, {
      id,
    });
    return results.length === 1 ? new TodoRecord(results[0]) : null;
  }

  static async findAll(sourceDb) {
    const source = sourceDb || 'todos';
    const [results] = await pool.execute(`SELECT * FROM \`${source}\``);
    return results.map((result) => new TodoRecord(result));
  }

  static async update(record, sourceDb) {
    TodoRepository._checkRecord(record);

    if (!record.id) {
      throw new Error('Todo nas no ID.');
    }
    // eslint-disable-next-line no-underscore-dangle
    record._validate();
    await pool.execute(`UPDATE \`${sourceDb}\` SET \`title\` = :title WHERE \`id\` = :id`, {
      id: record.id,
      title: record.title,
    });
  }
}

module.exports = {
  TodoRepository,
};
