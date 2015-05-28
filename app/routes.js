var Todo = require('./models/todo');

function getTodos(res){
	Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
};

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res){

		// use mongoose to get all todos in the database
		getTodos(res);
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res)
	{

		// create a todo, information comes from AJAX request from Angular
		Todo.create(
		{
			text : req.body.text,
			flag: false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			getTodos(res);
		});
	});

	app.put('/api/todos', function(req, res)
	{
		Todo.findOne({ _id: req.body._id }, function (err, doc){
  			doc.flag = (req.body.flag);
  			doc.save();
  		});
			// get and return all the todos after you create another
	});


    var deleteCallback =function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	}
	// delete a todo
	app.delete('/api/todos/:todo_id', deleteCallback );

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};