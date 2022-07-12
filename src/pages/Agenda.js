import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

import PageContainer from './../components/PageContainer';
import PostCommitment from '../components/Agenda/PostCommitment';
import Card from './../components/Agenda/Card';

import { UserContext } from './../contexts/UserContext';

import * as requestCommitmentApi from './../services/api/commitment';

function Agenda(){
  const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD')); 
  const [ openModal, setOpenModal ] = useState(false);
  const [ commitments, setCommitments ] = useState([]);
  const { user } = useContext(UserContext);

  const config = {
    headers: { Authorization: `Bearer ${user.token}`}
  }

  setInterval(() => {
    commitments.forEach((commitment) => {
      if( commitment.alarmHour == `${dayjs().format('HH:mm')}:00`){
        alert('Ta na hora hein meu xapa');
      }
    })
  }, 60000);

  useEffect(() => {
    const dateArray = date.split('-');
    const day = dateArray[2];
    const month = dateArray[1];
    const year = dateArray[0];
    
    const promise = requestCommitmentApi.listCommitments(day, config);
    promise.then((response) => {
      const { data } = response;
      const filterCommitment = data.filter((commitment) => {
        return day == commitment.day && month == commitment.month && year == commitment.year;
      })
      setCommitments(filterCommitment);
    })
    promise.catch((e) => {
      console.log(e.message);
    })
  },[date]);

  return (
    <>
    <Header>Agenda</Header>
    <PageContainer>
      <Title>Olá, {user.username}! Tem algum compromisso hoje?</Title> 
      <Content>
        <Create>
          <Calendar 
            onClickDay={(value, event) => setDate(dayjs(value).format('YYYY-MM-DD'))}
            />
          <p onClick={() => setOpenModal(true)}>Adicionar um novo compromisso</p>
          <PostCommitment isOpen={openModal} setOpenModal={setOpenModal}/>
        </Create>
        <List>
          <h1>{dayjs(date).format('DD MMMM YYYY')}</h1>
          { commitments.length !== 0 ?
            commitments.map((commitment) => {
              const { id, type, place, startHour, finishHour, alarmHour, year, month, day } = commitment;
              return (
                <Card 
                  key={id}
                  id={id}
                  type={type.toUpperCase()} 
                  place={place} 
                  startHour={startHour.substring(0, 5)} 
                  finishHour={finishHour.substring(0, 5)} 
                  alarmHour={alarmHour.substring(0, 5)}
                  year={year}
                  month={month}
                  day={day}
                  />
              );
            })
            :
            <>
              <p>Não há nenhum compromisso</p>
              <p>neste dia!</p>
            </>
          }
        </List>
      </Content>
    </PageContainer>
    </>
  );
}

export default Agenda;

const Header = styled.header`
  background-color: #000000;
  height: 100px;
  color: #FFFFFF;
  font-weight: 700;
  font-size: 50px;
  padding: 20px;
  padding-left: 120px;
`

const Title = styled.h1`
  font-size: 23px;
  font-weight: 500;
  margin-bottom: 30px;
`

const Content = styled.span`
  display: flex;
  justify-content: center;
`

const Create = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    margin-top: 30px;
    border: 1px solid #000000;
    border-radius: 20px;
    padding: 10px;
    background-color: #000000;
    color: #FFFFFF;
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 30px;
  h1 {
    font-size: 30px;
    margin-bottom: 15px;
  }
`



