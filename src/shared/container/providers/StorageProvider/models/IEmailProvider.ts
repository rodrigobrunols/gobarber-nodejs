export default interface IEmailProvider{
  sendEmail(to: string, subject: string, body: string): Promise<void>

}
