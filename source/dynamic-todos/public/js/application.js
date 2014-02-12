$(document).ready(function() {
  var todoTemplate = $.trim($('#todo_template').html());

  function bindEvents() {
      $('.toolbox form').on('submit', function(event) {
        event.preventDefault();
        todoData = $(this).serialize();
        $.ajax({
          type: this.method,
          url: this.action,
          data: todoData
        }).done( function(serverResponse) {
          $('.display-todos').append(serverResponse);
        })
      });

      $('.display-todos').on('click', '.delete', function(event) {
        event.preventDefault();
        $this = $(this)
        var url = $this.data('url')
        $.ajax({
          type: 'delete',
          url: url
        }).done(function() {
          $this.closest('.single-todo').remove();
        }).fail(function(){
          alert("can't delete")
        })

      })

      $('.display-todos').on('click', '.complete', function(event) {
        event.preventDefault();
        $this = $(this)
        var url = $this.data('url')
        $.ajax({
          type: 'put',
          url: url
        }).fail(function(){
          alert("can't delete")
        })

      })
    }

  //Create functions to add, remove and complete todos

  function buildTodo(todoName) {
    // Creates an jQueryDOMElement from the todoTemplate.
    var $todo = $(todoTemplate);
    // Modifies it's text to use the passed in todoName.
    $todo.find('h2').text(todoName);
    // Returns the jQueryDOMElement to be used elsewhere.
    return $todo;
  }

  bindEvents();
});
