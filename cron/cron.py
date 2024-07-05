import time
import schedule
from datetime import datetime
from typing import List
from api import send_push_notifications, get_today_events
from init import register_events_time, disable_notification_timout
from logger import logger


def send_push(pushSubscriptions: List[str], title: str, body: str):
    send_push_notifications(pushSubscriptions, title, body)
    logger.info(f"Event notified")
    return schedule.CancelJob


def get_seconds(time: datetime):
    return (time - time.replace(hour=0, minute=0, second=0, microsecond=0)).total_seconds()


def register_all_jobs():
    logger.info('Registering all events')
    events = get_today_events()
    logger.info(f'Find {len(events)} today events')
    for event in events:
        seconds_event = get_seconds(datetime.strptime(event['timeNotification'], '%H:%M'))
        seconds_now = get_seconds(datetime.now())
        if event['pushEnabled'] and seconds_event - seconds_now > disable_notification_timout:
            logger.info(f"Event at {event['timeNotification']} scheduled")
            schedule.every().day.at(event['timeNotification']).do(
                send_push,
                pushSubscriptions=event["pushSubscriptions"], title=event["title"], body=f'Лет {event["years"]}'
            )

    job = schedule.every().day.at(register_events_time).do(register_all_jobs)
    logger.info(f'Schedule registering all events (next_run: {job.next_run})')
    return schedule.CancelJob


def main():
    register_all_jobs()
    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        logger.info('Stop cron process.')
