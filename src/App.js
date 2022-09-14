///Hooks
//useState: Allows us to track the state in a FUNCTION component, classes have their own method.
//useRef: Allows us to reference elements inside our HTML
//useEffect: function that takes another function, so when something changes we use useEffect to carry forward next step
import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoList from "./TodoList";

//Set up local storage container
const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  //pass default state into useState, empty array is default. use state returns an array
  //in the below example, todos is all of the items in the useState Array,
  //setTodos is the function we will use to update the data
  const [currentTodoList, updateTodoListFunction] = useState([]);
  //use ref returns an object like a box 'box' that can hold a an element in its .current property
  //in this cese its the input element
  const todoNameRef = useRef();

  //
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //react.strictMode
    if (storedTodos)
      updateTodoListFunction((prevTodoList) => [
        ...prevTodoList,
        ...storedTodos,
      ]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentTodoList));
  }, [currentTodoList]);

  const toggleTodo = (id) => {
    //always create a copy to use and se tthe new state, dont directly change it
    const newTodos = [...currentTodoList];
    //create variable which is equal to the same id as the one passed into the function
    const todo = newTodos.find(
      //this function will return the todo key and value
      (todo) => todo.id === id
    );
    // console.log(newTodos)
    // console.log(todo)
    //todo now references the id of the todo object passed intot he copy of the current todolist (new todos)
    // todo.complete to the opposite of what it currently equals
    todo.complete = !todo.complete;
    // console.log(`updated` + JSON.stringify(todo))

    updateTodoListFunction(newTodos);
    // console.log(`todoes updated` + JSON.stringify(newTodos))
  };

  const handleAddTodo = (e) => {
    //set the input element's value by references the element stored in todoNameRef
    const inputValue = todoNameRef.current.value;
    //if name field is empty, end function with 'return' so we dont add empty todo
    if (inputValue === "") return;
    //call updateTodolistFunction as defined in the destructured array for useState([])
    //use arrow function to get previous state value
    updateTodoListFunction((prevTodoList) => {
      //return a new array, which includes all the items of the previous todolist
      //and a nother item with the new todolist values
      return [
        ...prevTodoList,
        { id: uuidv4(), name: inputValue, complete: false },
      ];
    });
    //clear input value
    todoNameRef.current.value = null;
  };

  const handleClearTodo = () => {
    const newTodos = [...currentTodoList];
    const incompleteTodos = currentTodoList.filter((todo) => !todo.complete);
    console.log(incompleteTodos);
     updateTodoListFunction(incompleteTodos);
  };

  return (
    <>
      <TodoList todosListProp={currentTodoList} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add todo</button>
      <button onClick={handleClearTodo}>Clear Complete</button>
      <div>
        {/* take caurrent to do list and filter incmplete, return the length of that array */}
        {currentTodoList.filter((todo) => !todo.complete).length} left to do
      </div>
    </>
  );
}

export default App;
