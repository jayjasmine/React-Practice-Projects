import React from 'react'
import Todo from './Todo'

export default function TodoList({todosListProp, toggleTodo}) {
  //
  return (
    todosListProp.map(todo => {
      return (
        //key helps react only render the items in the array that has changed otherwise it will re-render them all
        <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
      )  
    })
  )
}
