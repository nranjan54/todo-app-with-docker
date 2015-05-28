angular.module('todoService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Todos', function($http) {
        return {
            get : function() {
                return $http.get('/api/todos');
            },
            create : function(todoData) {
                return $http.post('/api/todos', todoData);
            },
            // for updating the value of tick mark 
            checking: function(ob){
                return $http.put('/api/todos', ob);
            },
            delete : function(id) {
                return $http.delete('/api/todos/' + id);
            }
        }
    });
