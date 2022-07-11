import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

import PageContainer from './../components/PageContainer';
import PostCommitment from '../components/Agenda/PostCommitment';

import { UserContext } from './../contexts/UserContext';

import * as requestCommitmentApi from './../services/api/commitment';

function Agenda(){
  const [ date, setDate ] = useState(dayjs().format('YYYY-MM-DD')); 
  const [ openModal, setOpenModal ] = useState(false);
  const { user } = useContext(UserContext);

  const config = {
    headers: { Authorization: `Bearer ${user.token}`}
  }

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
      console.log(filterCommitment);
    })
    promise.catch((e) => {
      console.log(e.message);
    })
  },[date]);

  return (
    <PageContainer> 
      <Content>
        <h1>Olá, {user.username}! Tem algum agendamento para hoje?</h1>
        <Calendar 
          onClickDay={(value, event) => setDate(dayjs(value).format('YYYY-MM-DD'))}
          />
        <p onClick={() => setOpenModal(true)}>Adicionar um novo compromisso</p>
        <PostCommitment isOpen={openModal} setOpenModal={setOpenModal}/>
      </Content>
    </PageContainer>
  );
}

export default Agenda;

const Content = styled.span`
`

