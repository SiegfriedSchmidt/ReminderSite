export default interface User {
  username: string
  email: string
  isAdmin: boolean
  accessToken: string
  refreshToken: string
  notifications: {
    time: string
    pushEnabled: boolean
    telegramEnabled: boolean
    emailEnabled: boolean
    email: string
  }
}
