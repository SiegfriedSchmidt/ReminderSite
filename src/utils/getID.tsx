export default function getID(): string {
  // return crypto.randomUUID()
  return Math.ceil(Math.random() * 10000).toString()
}