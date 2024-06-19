import EventData from "../types/EventData.ts";
import getID from "../utils/getID.tsx";


const stubData: EventData[] = Array.from({length: 30}, () => {
  return {
    title: `Lorem ${Math.ceil(Math.random() * 10)}`,
    date: new Date("01/01/1970"),
    until: Math.ceil(Math.random() * 365),
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    id: getID()
  }
});

export default async function getEvents(): Promise<EventData[]> {
  return new Promise((resolve) => setTimeout(() => {
    console.log('get events data')
    resolve(stubData)
  }, 1000))
}