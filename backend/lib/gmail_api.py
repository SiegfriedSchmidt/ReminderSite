import base64
import os.path
from email.message import EmailMessage

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

from lib.init import secret_folder_path


class GmailApi:
    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
              'https://www.googleapis.com/auth/gmail.modify']

    def __init__(self, secret_folder):
        self.creds = self.get_cred(secret_folder)

    @staticmethod
    def get_cred(secret_folder: str):
        creds = None
        if os.path.exists(f"{secret_folder}/token.json"):
            creds = Credentials.from_authorized_user_file(f"{secret_folder}/token.json", GmailApi.SCOPES)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(f"{secret_folder}/credentials.json", GmailApi.SCOPES)
                creds = flow.run_local_server(port=0)
            with open(f"{secret_folder}/token.json", "w") as token:
                token.write(creds.to_json())

        assert creds
        return creds

    def send_email(self, to: str, subject: str, text: str):
        try:
            with build("gmail", "v1", credentials=self.creds) as service:
                message = EmailMessage()
                message["To"] = to
                message["From"] = "noreply.reminder.noreply@gmail.com"
                message["Subject"] = subject

                message.set_content(text)
                create_message = {"raw": base64.urlsafe_b64encode(message.as_bytes()).decode()}

                send_message = (
                    service.users()
                    .messages()
                    .send(userId="me", body=create_message)
                    .execute()
                )
                print(f'Message Id: {send_message["id"]}')
        except HttpError:
            print('CREDENTIALS EXPIRED!!!')


def main():
    gmail_api = GmailApi(secret_folder_path)
    gmail_api.send_email('bob-message@mail.ru', "Automated message", "Test 2")


if __name__ == '__main__':
    main()
