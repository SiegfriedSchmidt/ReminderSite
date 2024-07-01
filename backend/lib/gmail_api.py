import base64
import os.path
from email.mime.text import MIMEText
from logging import Logger

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError


class GmailApiException(BaseException):
    pass


class GmailApi:
    SCOPES = ['https://www.googleapis.com/auth/gmail.readonly',
              'https://www.googleapis.com/auth/gmail.modify']

    def __init__(self, secret_folder, logger: Logger):
        self.creds = self.get_cred(secret_folder)
        self.logger = logger

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
                message = MIMEText(text, 'html')
                message["To"] = to
                message["From"] = "noreply.reminder.noreply@gmail.com"
                message["Subject"] = subject

                create_message = {"raw": base64.urlsafe_b64encode(message.as_bytes()).decode()}

                send_message = (service.users().messages().send(userId="me", body=create_message).execute())
                self.logger.info(f'Message has been sent to "{to}" with id "{send_message["id"]}"')
        except HttpError:
            self.logger.error('CREDENTIALS EXPIRED!!!')
            raise GmailApiException
