import { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaTrash, FaPen } from "react-icons/fa";

import { UserContext } from '../../contexts/UserContext';

import * as requestCommitmentApi from './../../services/api/commitment';
import EditCommitment from './EditCommitment';

function Card({id, type, place, startHour, finishHour, alarmHour, year, month, day}){
    const [ modal, setModal ] = useState();
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

  return(
    <Commitment>
      <h2>{type}</h2>
      <p>Lugar: {place}</p>
      <p>Horário: {startHour} - {finishHour}</p>
      <p>Alarme: {alarmHour}</p>
      <Delete><FaTrash onClick={() => deleteCommitment(id)} /></Delete>
      <Edit><FaPen onClick={() => setModal(true)} /></Edit>
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