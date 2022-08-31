import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const StyledLi = styled.li`
  color: #333;
  list-style: none;

`;

const InputButton = styled.button`
  display: inline-block;
  padding: 0px 8px;
  border-radius: 9999px;
  font-weight: 500;
  margin-left: 5px;
  background-color: darksalmon;
  color: white;

  :active {
    color: darksalmon;
    background-color: white;
   }
`;

const StyledSpan = styled.span`
  margin-left: 10px;
`;

const DateInput = styled.ul`
  text-align: left;
  padding: 7px;
  border-radius: 8px;
  border: ${({listLength}) => listLength.dateList === 0 ? '': '2px solid blue'};
`;
const NomalInput = styled.ul`
  text-align: left;
  padding: 7px;
  border-radius: 8px;
  border: ${({listLength}) => listLength.normalList === 0 ? '': '2px solid yellow'};
`;

const List = ({todoLists, deleteTodoLists, listLength}) => {

  const dateTodoLists = todoLists.filter((todoList) => (todoList.day !== 'none'));
  const nomalTodoLists = todoLists.filter((todoList) => (todoList.day === 'none'));

  const complete = (id) => {
    deleteTodoLists(id);
  }

  return (
    <StyledDiv>
      <NomalInput listLength={listLength}>
        {nomalTodoLists
          // .filter((todoList) => (todoList.day === 'none'))
          .map((todoList) => {
            return(
              <StyledLi key={todoList.id} >
                {todoList.content}
                <InputButton onClick={() => complete(todoList.id)}>完了</InputButton>
              </StyledLi>
            )
        })}
      </NomalInput>
      <DateInput listLength={listLength}>
        {dateTodoLists
          // .filter((todoList) => (todoList.day !== 'none'))
          .sort((first, second) => (
            new Date(`${first.day.year}/${first.day.month}/${first.day.date}`) - 
            new Date(`${second.day.year}/${second.day.month}/${second.day.date}`)))
          .map((todoList) => {
            return(
              <StyledLi key={todoList.id} >
                {/* {todoList.day !== 'none' &&
                  `${todoList.day.year}年 ${todoList.day.month}月 ${todoList.day.date}日`} */}
                {`${todoList.day.year}年 ${todoList.day.month}月 ${todoList.day.date}日`}
                <StyledSpan>{todoList.content}</StyledSpan>
                <InputButton onClick={() => complete(todoList.id)}>完了</InputButton>
              </StyledLi>
            )
        })}
      </DateInput>
    </StyledDiv>
  );
}

export default List;