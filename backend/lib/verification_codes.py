from lib.generate_code import generate_code
from datetime import datetime
from typing import Dict

from lib.init import expirationCodeTime
from lib.pydantic_models import CodePydantic


class VerificationCodes:
    def __init__(self):
        self.codes: Dict[str, CodePydantic] = {}

    def add_data_with_code(self, data):
        code = generate_code()
        self.codes[code] = CodePydantic(creation_time=datetime.now(), expiration=expirationCodeTime, data=data)
        return code

    def verify_code(self, code):
        if code in self.codes:
            if (datetime.now() - self.codes[code].creation_time).seconds <= self.codes[code].expiration:
                return self.codes[code].data
            else:
                del self.codes[code]
        return None
