import React, {FC, useContext, useRef} from 'react';
import EventData from "../../types/EventData.ts";
import getSeparateDate from "../../utils/getSeparateDate.ts";
import {StyledButtonEditBlock, StyledEventEditBlock, StyledEventPage} from "./StyledEventPage.tsx";
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import EditFieldTextarea from "../../components/EditField/EditFieldTextarea.tsx";
import {StyledButtonEdit} from "./StyledButtonEdit.tsx";
import {useParams} from "react-router-dom";
import {EventsDataContext} from "../../context/EventsDataContext.tsx";
import getDateForEditField from "../../utils/getDateForEditField.ts";

const EventPage = () => {
  const {idx} = useParams();
  const {getOneEvent, eventsData} = useContext(EventsDataContext);
  const eventData = getOneEvent(Number(idx))
  const isNewEvent = eventsData.length.toString() === idx

  const refTitle = useRef<HTMLInputElement>(null)
  const refDate = useRef<HTMLInputElement>(null)
  const refDescription = useRef<HTMLTextAreaElement>(null)

  function onClickSave() {
    if (refTitle.current && refDate.current && refDescription.current) {
      console.log(refTitle.current.value, typeof refDate.current.value, refDescription.current.value)
    }
  }

  return (
    eventData
      ?
      <StyledEventPage>
        {isNewEvent ? <h1>Новое событие</h1> : <h1>Событие</h1>}
        <StyledEventEditBlock>
          <EditFieldInput title="Название" refInput={refTitle} defaultValue={eventData.title}/>
          <EditFieldInput title="Дата" refInput={refDate} type="date" defaultValue={getDateForEditField(eventData.date)}/>
          <EditFieldTextarea title="Описание" refInput={refDescription} defaultValue={eventData.description}/>
          <StyledButtonEditBlock>
            <StyledButtonEdit onClick={onClickSave}>Сохранить</StyledButtonEdit>
            <StyledButtonEdit>Удалить</StyledButtonEdit>
          </StyledButtonEditBlock>
        </StyledEventEditBlock>
      </StyledEventPage>
      :
      <h1>Событие не найдено</h1>
  );
};

export default EventPage;