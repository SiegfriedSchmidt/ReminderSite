import React, {FC} from 'react';
import {StyledButtonEditBlock, StyledEventEdit, StyledEventEditBlock} from "./StyledEventEdit.tsx";
import EventData from "../../types/EventData.ts";
import EditFieldInput from "../EditField/EditFieldInput.tsx";
import EditFieldTextarea from "../EditField/EditFieldTextarea.tsx";
import getSeparateDate from "../../utils/getSeparateDate.ts";
import {StyledButtonEventEdit} from "./StyledButtonEventEdit.tsx";

interface EventEditProps {
  eventData: EventData;
}

const EventEdit: FC<EventEditProps> = ({eventData}) => {
  return (
    <StyledEventEdit>
      <h1>Событие</h1>
      <StyledEventEditBlock>
        <EditFieldInput title="Название" defaultValue={eventData.title}/>
        <EditFieldInput title="Дата" defaultValue={getSeparateDate(eventData.date).replace(' ', '.')}/>
        <EditFieldTextarea title="Описание" defaultValue={eventData.description}/>
        <StyledButtonEditBlock>
          <StyledButtonEventEdit>Сохранить</StyledButtonEventEdit>
          <StyledButtonEventEdit>Удалить</StyledButtonEventEdit>
        </StyledButtonEditBlock>
      </StyledEventEditBlock>
    </StyledEventEdit>
  );
};

export default EventEdit;