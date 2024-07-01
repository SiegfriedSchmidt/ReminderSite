from pydantic import BaseModel
from lib.utils.generate_code import generate_code
from typing import Dict, Any
from datetime import datetime


class CodePydantic(BaseModel):
    creation_time: datetime
    expiration: int
    data: Any


class VerificationCodes:
    def __init__(self, expiration_code_time):
        self.codes: Dict[str, CodePydantic] = {}
        self.expiration_code_time = expiration_code_time

    def add_data_with_code(self, data):
        code = generate_code()
        self.codes[code] = CodePydantic(creation_time=datetime.now(), expiration=self.expiration_code_time, data=data)
        return code

    def verify_code(self, code):
        if code in self.codes:
            if (datetime.now() - self.codes[code].creation_time).seconds <= self.codes[code].expiration:
                return self.codes[code].data
            else:
                del self.codes[code]
        return None
