import EventData from "../types/EventData.ts";
import getID from "../utils/getID.tsx";

const stubData: EventData[] = [
  {
    title: "Lorem ",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: "",
    id: getID()
  }, {
    title: "Lorem ",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: "",
    id: getID()
  }, {
    title: "Lorem ",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: "",
    id: getID()
  }, {
    title: "Lorem ",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: "",
    id: getID()
  }, {
    title: "Lorem ",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: "",
    id: getID()
  }, {
    title: "Lorem ",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: "",
    id: getID()
  },
]

export default async function getEvents(): Promise<EventData[]> {
  return stubData
}