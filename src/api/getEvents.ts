import EventData from "../types/EventData.ts";

const stubData: EventData[] = [
  {
    title: "Lorem ",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: ""
  }, {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: ""
  }, {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: ""
  }, {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.2020"),
    until: Math.ceil(Math.random() * 365),
    description: ""
  }, {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: ""
  }, {
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    date: new Date("01.01.1970"),
    until: Math.ceil(Math.random() * 365),
    description: ""
  },
]

export default async function getEvents(): Promise<EventData[]> {
  return stubData
}