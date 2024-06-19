export default function getSeparateDate(date: Date): string {
  return date.toLocaleDateString('en-GB').replace('/', '.').replace('/', ' ')
}