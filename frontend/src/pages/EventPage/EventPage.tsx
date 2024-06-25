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
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";
import addEvent from "../../api/addEvent.ts";
import updateEvent from "../../api/updateEvent.ts";

const EventPage = () => {
  const {idx} = useParams();
  const {errorToast, successToast, warningToast} = useConfiguredToast()
  const {getOneEvent, setOneEvent, eventsData} = useContext(EventsDataContext);
  const eventData = getOneEvent(Number(idx))
  const isNewEvent = eventsData.length.toString() === idx

  const refTitle = useRef<HTMLInputElement>(null)
  const refDate = useRef<HTMLInputElement>(null)
  const refDescription = useRef<HTMLTextAreaElement>(null)

  async function onClickSave() {
    if (refTitle.current && refDate.current && refDescription.current) {
      const title = refTitle.current.value;
      const date = refDate.current.valueAsDate;
      const description = refDescription.current.value;
      if (!title || !date || !description) {
        return errorToast('Пустые поля!')
      }
      if (isNewEvent) {
        const rs = await addEvent({title, date: getDateForEditField(date), description})
        if (rs.status !== 'success') {
          return errorToast(`${rs.content}`, 'Попробуйте снова!')
        }

        setOneEvent({title, date, description, until: 0, id: rs.content.id}, Number(idx))
        successToast('Событие успешно добавлено!')
      } else if (eventData) {
        if (title === eventData.title && date.valueOf() === eventData.date.valueOf() && description === eventData.description) {
          return warningToast('Поля не были изменены!')
        }
        const rs = await updateEvent({title, date: getDateForEditField(date), description, id: eventData.id})
        if (rs.status !== 'success') {
          return errorToast(`${rs.content}`, 'Попробуйте снова!')
        }
        setOneEvent({...eventData, title, date, description}, Number(idx))
        successToast('Событие успешно изменено!')
      }
    }
  }

  return (
    eventData
      ?
      <StyledEventPage>
        {isNewEvent ? <h1>Новое событие</h1> : <h1>Событие</h1>}
        <StyledEventEditBlock>
          <EditFieldInput title="Название" refInput={refTitle} defaultValue={eventData.title}/>
          <EditFieldInput title="Дата" refInput={refDate} type="date"
                          defaultValue={getDateForEditField(eventData.date)}/>
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