const express = require('express');
const { log } = require('nodemon/lib/utils');
const { compileQueryParser } = require('express/lib/utils');
const { TodoRepository } = require('../repositories/todo.repository');
const { NotFoundError } = require('../utils/errors');
const { TodoRecord } = require('../records/todo.record');

const homeRouter = express.Router();

homeRouter
  .get('/favicon.ico', (req, res, next) => {
    try {
      res.status(200);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      res.render('todos/list-all', {
        todos: await TodoRepository.findAll('todos'),
        closedTodos: await TodoRepository.findAll('closedtodos'),
      });
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      res.render('todos/list-all', {
        todos: await TodoRepository.findAll('todos'),
        closedTodos: await TodoRepository.findAll('closedtodos'),
      });
    } catch (err) {
      next(err);
    }
  })
  .post('/edit/:id', async (req, res, next) => {
    try {
      const todo = await TodoRepository.find(req.params.id, 'todos')
        ? await TodoRepository.find(req.params.id, 'todos')
        : await TodoRepository.find(req.params.id, 'closedtodos');
      if (!todo) {
        throw new NotFoundError();
      }

      res.render('todos/one', {
        todo,
      });
    } catch (err) {
      next(err);
    }
  })
  .post('/create', async (req, res, next) => {
    try {
      const todo = req.body;

      await TodoRepository.insert(new TodoRecord(todo), 'todos');
      res.render('todos/list-all', {
        todos: await TodoRepository.findAll(),
        closedTodos: await TodoRepository.findAll('closedtodos'),
      });
    } catch (err) {
      next(err);
    }
  })
  .post('/:id', async (req, res, next) => {
    try {
      const status = Object.keys(req.body).toString();
      const todo = await TodoRepository.find(req.params.id, 'todos')
        ? await TodoRepository.find(req.params.id, 'todos')
        : await TodoRepository.find(req.params.id, 'closedtodos');
      if (!todo) {
        throw new NotFoundError();
      }
      if (status === 'close') {
        await TodoRepository.insert(todo, 'closedtodos');
        await TodoRepository.delete(todo, 'todos');
      } else if (status === 'open') {
        await TodoRepository.insert(todo, 'todos');
        await TodoRepository.delete(todo, 'closedtodos');
      }
      res.render('todos/list-all', {
        todos: await TodoRepository.findAll('todos'),
        closedTodos: await TodoRepository.findAll('closedtodos'),
      });
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const status = await Object.keys(req.body)
        .toString();
      const todo = await TodoRepository.find(req.params.id, 'todos')
        ? await TodoRepository.find(req.params.id, 'todos')
        : await TodoRepository.find(req.params.id, 'closedtodos');
      if (!todo) {
        throw new NotFoundError();
      }
      if (status === 'deleteOpened') {
        await TodoRepository.delete(todo, 'todos');
      } else if (status === 'deleteClosed') {
        await TodoRepository.delete(todo, 'closedtodos');
      }
      res.render('todos/list-all', {
        todos: await TodoRepository.findAll(),
        closedTodos: await TodoRepository.findAll('closedtodos'),
      });
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const status = req.body;
      const todo = await TodoRepository.find(req.params.id, 'todos')
        ? await TodoRepository.find(req.params.id, 'todos')
        : await TodoRepository.find(req.params.id, 'closedtodos');
      todo.title = status.title;
      if (!todo) {
        throw new NotFoundError();
      }
      if (!todo.title) {
        throw new NotFoundError();
      }

      const dataBase = await TodoRepository.find(req.params.id, 'todos') ? 'todos' : 'closedtodos';
      await TodoRepository.update(todo, dataBase);
      res.render('todos/list-all', {
        todos: await TodoRepository.findAll('todos'),
        closedTodos: await TodoRepository.findAll('closedtodos'),
      });
    } catch (err) {
      next(err);
    }
  });

module.exports = { homeRouter };
