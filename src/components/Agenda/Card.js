import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTrash, FaPen, FaRegAddressBook } from "react-icons/fa";

import { UserContext } from '../../contexts/UserContext';

import * as requestCommitmentApi from './../../services/api/commitment';
import * as requestParticipantsApi from './../../services/api/participants';

import EditCommitment from './EditCommitment';

import './../../assets/css/calendar.css';

function Card({id, type, place, startHour, finishHour, alarmHour, year, month, day}){
    const [ modal, setModal ] = useState();
    const [ participants, setParticipants ] = useState([]);
    const { user } = useContext(UserContext);

  const config = {
    headers: {Authorization: `Bearer ${user.token}`}
  }

  function deleteCommitment(id){
    if(window.confirm(`Realmente gostaria de deletar o compromisso: ${type}?`)){
      const promise = requestCommitmentApi.deleteCommitment(id, config);
      promise.then(() => {
        console.log('Delete Sucess');
      })
      promise.catch((e) => {
        console.log(e.message);
      })
    }
  }

  useEffect(() => {
    const promise = requestParticipantsApi.listParticipants(id, config);
    promise.then((response) => {
      const { data } = response;
      setParticipants(data);
    })
    promise.catch((e) => {
      console.log(e.message);
    });
  }, []);

  return(
      <Commitment>
        <h2>{type}</h2>
        <p><strong>Lugar</strong>: {place}</p>
        <p><strong>Horário</strong>: {startHour} - {finishHour}</p>
        <p><strong>Alarme</strong>: {alarmHour}</p>
        <Delete><FaTrash onClick={() => deleteCommitment(id)} /></Delete>
        <Edit><FaPen onClick={() => setModal(true)} /></Edit>
        <Participant><FaRegAddressBook /></Participant>
        <EditCommitment 
          id={id}
          isOpen={modal}
          setOpenModal={setModal}
          type={type}
          place={place}
          startHour={startHour}
          finishHour={finishHour}
          alarmHour={alarmHour}
          date={`${year}-${month}-${day}`}
          />
        <p><strong>Participantes</strong>:</p>
        { participants.length !== 0 ?
          participants.map((participant) => {
            const { name, email } = participant;
            return (
              <p>Nome: {name} Email: {email}</p>
            )
          })
          :
          <p>Não há participantes ainda</p>
        }
      </Commitment>
  );
}

export default Card;

const Commitment = styled.div`
  position: relative;
  margin-bottom: 20px;
  border-bottom: 1px solid #000000;
  padding: 10px;
  h2 {
    font-size: 20px;
    font-weight: 700;
  }
  p {
    font-weight: 500;
    strong {
      font-weight: 600;
    }
  }
`

const Delete = styled.span`
  position: absolute;
  top: 12px;
  right: 0;
`

const Edit = styled.span`
  position: absolute;
  top: 12px;
  right: 30px;
`

const Participant = styled.span`
  position: absolute;
  top: 12px;
  right: 60px;
`