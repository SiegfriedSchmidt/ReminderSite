import React, {FC, useContext} from 'react';
import EventData from "../../types/EventData.ts";
import getSeparateDate from "../../utils/getSeparateDate.ts";
import {StyledButtonEditBlock, StyledEventEditBlock, StyledEventPage} from "./StyledEventPage.tsx";
import EditFieldInput from "../../components/EditField/EditFieldInput.tsx";
import EditFieldTextarea from "../../components/EditField/EditFieldTextarea.tsx";
import {StyledButtonEdit} from "./StyledButtonEdit.tsx";
import {useParams} from "react-router-dom";
import {EventsDataContext} from "../../context/EventsDataContext.tsx";

const EventPage = () => {
  const {idx} = useParams();
  const {getOneEvent} = useContext(EventsDataContext);
  const eventData = getOneEvent(Number(idx))

  return (
    eventData
      ?
      <StyledEventPage>
        <h1>Событие</h1>
        <StyledEventEditBlock>
          <EditFieldInput title="Название" defaultValue={eventData.title}/>
          <EditFieldInput title="Дата" defaultValue={getSeparateDate(eventData.date).replace(' ', '.')}/>
          <EditFieldTextarea title="Описание" defaultValue={eventData.description}/>
          <StyledButtonEditBlock>
            <StyledButtonEdit>Сохранить</StyledButtonEdit>
            <StyledButtonEdit>Удалить</StyledButtonEdit>
          </StyledButtonEditBlock>
        </StyledEventEditBlock>
      </StyledEventPage>
      :
      <h1>Событие не найдено</h1>
  );
};

export default EventPage;