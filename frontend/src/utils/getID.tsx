export default function getID(): string {
  // return crypto.randomUUID()
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now())).toString(16)
}

console.warn('change crypto')