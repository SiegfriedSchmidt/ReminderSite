import EventData from "./EventData.ts";

export type SortColumnType = { column: keyof EventData, direction: 'asc' | 'desc' };