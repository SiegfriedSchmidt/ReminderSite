import React, {FC} from 'react';
import {StyledEventEdit, StyledEventEditBlock} from "./StyledEventEdit.tsx";
import EventData from "../../types/EventData.ts";
import EditFieldInput from "../EditField/EditFieldInput.tsx";
import EditFieldTextarea from "../EditField/EditFieldTextarea.tsx";
import getSeparateDate from "../../utils/getSeparateDate.ts";

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
      </StyledEventEditBlock>
    </StyledEventEdit>
  );
};

export default EventEdit;