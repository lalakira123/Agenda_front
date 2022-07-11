import { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';

import * as requestCommitmentApi from './../../services/api/commitment';

function Card({id, type, place, startHour, finishHour, alarmHour}){
  const { user } = useContext(UserContext);

  const config = {
    headers: {Authorization: `Bearer ${user.token}`}
  }

  function deleteCommitment(id){
    if(window.confirm(`Realmente gostaria de deletar o compromisso: ${type}`)){
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
      <span onClick={() => deleteCommitment(id)}>Deletar</span>
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
  span {
    position: absolute;
    top: 12px;
    right: 0;
  }
`