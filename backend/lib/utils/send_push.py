import json
from pywebpush import webpush
from lib.init import vapid_private_key_path, admin_email
from typing import List


def send_push(push_subscriptions: List[str], title: str, body: str):
    for pushSub in push_subscriptions:
        webpush(
            subscription_info=json.loads(pushSub),
            data=json.dumps({
                'title': title,
                'body': body
            }),
            vapid_private_key=vapid_private_key_path,
            vapid_claims={
                'sub': f'mailto:{admin_email}'
            }
        )
