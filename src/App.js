import { useState, useEffect } from 'react';
// import styled from 'styled-components';
import './App.css';
import Input from './Input';
import InputPlusDate from './InputPlusDate';
import List from './List';


function App() {
  useEffect(() => {
    if(window.localStorage.getItem('todoLists')) {
      const strageList = JSON.parse(window.localStorage.getItem('todoLists'));
      setTodoLists(strageList);
      const nomalListsLength = todoLists.filter((todoList) => (todoList.day === 'none')).length;
      const dateListsLength = todoLists.filter((todoList) => (todoList.day !== 'none')).length;
      setListLength({normalList: nomalListsLength, dateList: dateListsLength});
    }
  }, []);

  const [ todoLists, setTodoLists ] = useState(() => (
    JSON.parse(window.localStorage.getItem('todoLists')) || []
  ));
  const [ radioValue, setRadioValue ] = useState('date');
  const [ listLength, setListLength ] = useState({});

  const createTodoLists = (todo) => {
    const newTodoLists = [...todoLists, todo];
    setTodoLists(newTodoLists);
    
    const newNomalListsLength = newTodoLists.filter((todoList) => (todoList.day === 'none')).length;
    const newDateListsLength = newTodoLists.filter((todoList) => (todoList.day !== 'none')).length;
    setListLength({normalList: newNomalListsLength, dateList: newDateListsLength});

    window.localStorage.setItem('todoLists', JSON.stringify(newTodoLists));
  }

  const deleteTodoLists = (id) => {
    const _todoLists = [...todoLists];
    const newTodoLists = _todoLists.filter((_todo) => (_todo.id !== id));
    setTodoLists(newTodoLists);

    const newNomalListsLength = newTodoLists.filter((todoList) => (todoList.day === 'none')).length;
    const newDateListsLength = newTodoLists.filter((todoList) => (todoList.day !== 'none')).length;
    setListLength({normalList: newNomalListsLength, dateList: newDateListsLength});

    window.localStorage.setItem('todoLists', JSON.stringify(newTodoLists));
  }
  const inputChange = (e) => {
    setRadioValue(e.target.value);
  }

  return (
    <div className="App">
      <h1>Schedule Note</h1>
      <div className="InputContainer">
        <label>
          <input 
            type="radio" 
            value="date" 
            checked={ radioValue === "date"} 
            onChange={inputChange}
          />
          日付あり
        </label>
        <label>
          <input 
            type="radio" 
            value="none" 
            checked={ radioValue === "none"} 
            onChange={inputChange}
          />
          日付なし
        </label>
        { radioValue === 'date' 
          ? <InputPlusDate createTodoLists={createTodoLists}/>
          : <Input createTodoLists={createTodoLists}/>
        }
      </div>
      <List todoLists={todoLists} deleteTodoLists={deleteTodoLists}  listLength={listLength}/>
      
    </div>
  );
}

export default App;
