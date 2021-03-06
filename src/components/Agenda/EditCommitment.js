import styled from 'styled-components';
import Modal from 'react-modal';
import { useContext, useState } from 'react';
import { FaTimes } from "react-icons/fa";

import * as requestCommitmentApi from './../../services/api/commitment';

import { UserContext } from './../../contexts/UserContext';
import { UpdateContext } from './../../contexts/UpdateContext';

import Input from './Input';

function EditCommitment({id, isOpen, setOpenModal, type, place, startHour, finishHour, alarmHour, date}){
  const [ commitment, setCommitment ] = useState(
    {
      type, 
      place, 
      startHour: startHour.substring(0, 5), 
      finishHour: finishHour.substring(0, 5), 
      alarmHour: alarmHour.substring(0, 5), 
      date}
  );
  const { user } = useContext(UserContext);
  const { update, setUpdate } = useContext(UpdateContext);

  const config = {
    headers: {Authorization: `Bearer ${user.token}`}
  };

  const customStyles = {
    content: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      background: "#000000",
      top: '170px',
      right: 'auto',
      left: '40%',
      bottom: '12%'
    }
  };

  function editCommitment(e){
    e.preventDefault();
    const promise = requestCommitmentApi.editCommitment(id, commitment, config);
    promise.then(() => {
      setOpenModal(false);
      setUpdate(update+1);
    })
    promise.catch((e) => {
      console.log(e.message);
    })
  }

  return(
    <Modal isOpen={isOpen} style={customStyles}>
      <Div>
        <p>Editar Compromisso: {type}</p>
        <p onClick={() => setOpenModal(false)}><FaTimes/></p>
      </Div>
      <Form onSubmit={editCommitment}>
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
          placeholder='T??rmino (HH:MM)'
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
        <button type='submit'>Editar</button>
      </Form>
    </Modal>
  );
}

export default EditCommitment;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    color: #FFFFFF;
    font-weight: 700;
    margin-bottom: 20px;
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 200px;
    margin-top: 10px;
    border-radius: 50px;
    height: 50px;
    background-color: #000000;
    font-weight: 700;
    color: #FFFFFF;
    border: 2px solid #FFFFFF;
    font-size: 15px;
  }
`