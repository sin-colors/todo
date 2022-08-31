import { useState, useEffect } from "react";
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 70%;
  padding: 5px 10px;
  border-radius: 6px;
  color: black;
`;

const InputButton = styled.button`
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

const SelectDiv = styled.div`
  text-align: left;
  margin: 5px 0px;
`;

const InputContainer = styled.div`
  width: 90%;
  text-align: left;
`;

const InputPlusDate = ({createTodoLists}) => {
  const [ selected, setSelected ] = useState({year:'----', month:'--', date:'--'});
  const [ chars, setChars ] = useState('');
  const [ D_LISTS, setD_LISTS ] = useState([]);
  const [ M_LISTS, setM_LISTS ] = useState([]);


  useEffect(() => {
    const monthLists = [];
    for(let i = 1; i < 13; i++) {
      monthLists.push(i);
    }
    const mList = monthLists.map((month) => (
      <option key={`month_${month}`} value={month}>{month}</option>
    ));
    setM_LISTS(mList);
    
      
    const dateLists = [];
    for(let j = 1; j < 32; j++) {
      dateLists.push(j);
    }
    const dList = dateLists.map((date) => (
        <option key={`date_${date}`} value={date}>{date}</option>
    ));
    setD_LISTS(dList);

    const today = new Date();
    setSelected({year: today.getFullYear(), month: today.getMonth() + 1, date: today.getDate()});

  }, [])
  
  const addTodo = () => {
    const newTodoList = {
      id: Math.floor(Math.random() * 1e5),
      content: chars,
      day: selected
    };
    createTodoLists(newTodoList);
    setChars('');
  }

  return(
    <InputContainer>
      <SelectDiv>
        <select 
          id="select-year"
          name="year" 
          value={selected.year} 
          onChange={(e) => setSelected({...selected, year: e.target.value})}
        >
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <label htmlFor="select-year">年</label>

        <select 
          id="select-month"
          name="month" 
          value={selected.month} 
          onChange={(e) => setSelected({...selected, month: e.target.value})}
        >
          {M_LISTS}
        </select>
        <label htmlFor="select-month">月</label>

        <select 
          id="select-date"
          name="date"
          value={selected.date} 
          onChange={(e) => setSelected({...selected, date: e.target.value})}
        >
          {D_LISTS}
        </select>
        <label htmlFor="select-date">日</label>
      </SelectDiv>
      <StyledInput type="text" value={chars} onChange={(e) => setChars(e.target.value)} />
      <InputButton onClick={addTodo} >追加</InputButton>
    </InputContainer>
  );
}

export default InputPlusDate;