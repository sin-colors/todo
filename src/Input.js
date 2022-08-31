import styled from 'styled-components';
import { useState } from 'react';

const StyledInput = styled.input`
  width: 65%;
  padding: 5px 10px;
  border-radius: 6px;
  color: black;
`;

const StyledButton = styled.button`
  display: inline-block;
  padding: 0px 8px;
  border-radius: 9999px;
  font-weight: 500;
  margin-left: 8px;
  background-color: darksalmon;
  color: white;

   :active {
    color: darksalmon;
    background-color: white;
   }
`;

const Input = ({createTodoLists}) => {
  const [ chars, setChars ] = useState('');
  const addTodo = () => {
    const newTodoList = {
      id: Math.floor(Math.random() * 1e5),
      content: chars,
      day: 'none'
    };
    createTodoLists(newTodoList);
    setChars('');
  }
  return (
    <div>
      <StyledInput type="text" value={chars} onChange={(e) => setChars(e.target.value)} />
      <StyledButton onClick={addTodo} >追加</StyledButton>
    </div>
  );
}

export default Input;