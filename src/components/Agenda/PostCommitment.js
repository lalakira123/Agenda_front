import styled from 'styled-components';
import Modal from 'react-modal';
import { useContext, useState } from 'react';

import * as requestCommitmentApi from './../../services/api/commitment';

import { UserContext } from '../../contexts/UserContext';

import Input from './Input';

function PostCommitment({isOpen, setOpenModal}){
  const [ commitment, setCommitment ] = useState(
    {type:"", place:"", startHour:"", finishHour:"", alarmHour:"", date:""}
  );
  const { user } = useContext(UserContext);

  const config = {
    headers: {Authorization: `Bearer ${user.token}`}
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      flexDirection: "column",
      justifyContent: "space-evenly",
      background: "#BEBEBE",
      transform: "translate(-50%, -50%)",
    }
  };

  function postCommitment(e){
    e.preventDefault();
    const promise = requestCommitmentApi.postCommitment(commitment, config);
    promise.then(() => {
        setOpenModal(false);
        setCommitment({type:"", place:"", startHour:"", finishHour:"", alarmHour:"", date:""});
    })
    promise.catch((e) => {
        console.log(e.message);
    })
  }

  return(
    <Modal isOpen={isOpen} style={customStyles}>
      <Div>
        <p>Novo Compromisso</p>
        <p onClick={() => setOpenModal(false)}>fechar</p>
      </Div>
      <form onSubmit={postCommitment}>
        <Input 
          placeholder='Compromisso'
          property={'type'} 
          type={'text'} 
          value={commitment.type}
          setState={setCommitment}
          state={commitment}
          />
        <Input 
          placeholder='Lugar'
          property={'place'} 
          type={'text'} 
          value={commitment.place}
          setState={setCommitment}
          state={commitment}
          />
        <Input 
          placeholder='Inicio (HH:MM)'
          property={'startHour'} 
          type={'text'} 
          value={commitment.startHour}
          setState={setCommitment}
          state={commitment}
          />
        <Input 
          placeholder='Término (HH:MM)'
          property={'finishHour'} 
          type={'text'} 
          value={commitment.finishHour}
          setState={setCommitment}
          state={commitment}
          />
        <Input 
          placeholder='Alarme (HH:MM)'
          property={'alarmHour'} 
          type={'text'} 
          value={commitment.alarmHour}
          setState={setCommitment}
          state={commitment}
          />
        <Input 
          placeholder='Data (YYYY-MM-DD)'
          property={'date'} 
          type={'text'} 
          value={commitment.date}
          setState={setCommitment}
          state={commitment}
          />
        <button type='submit'>Criar</button>
      </form>
    </Modal>
  );
}

export default PostCommitment;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
`