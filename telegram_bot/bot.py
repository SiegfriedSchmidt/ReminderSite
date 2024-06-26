import logging
import asyncio
from typing import Any, Callable, Coroutine
import nest_asyncio
import signal
from aiogram import Bot, Dispatcher
from handlers import commands
from config_reader import config
from logger import setup_basic_logger

nest_asyncio.apply()

# пользователи для оповещений о включении и выключении бота
notification_users = []


class DispatcherOnShutdown(Dispatcher):
    def __init__(self, on_shutdown: Callable[[], Coroutine], **kwargs: Any):
        self.on_shutdown = on_shutdown
        super().__init__(**kwargs)

    def _signal_stop_polling(self, sig: signal.Signals) -> None:
        asyncio.run(self.on_shutdown())
        super()._signal_stop_polling(sig)


async def notification(message: str, bot: Bot):
    for user in notification_users:
        await bot.send_message(user, message, parse_mode=None)


async def main():
    setup_basic_logger()
    bot = Bot(token=config.bot_token.get_secret_value())

    async def on_shutdown():
        print('Бот остановлен')
        await notification("Bot stopped.", bot)

    async def on_start():
        print('Бот запущен')
        await notification("Bot started.", bot)

    dp = DispatcherOnShutdown(on_shutdown)

    dp.include_router(commands.router)

    await on_start()
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())


if __name__ == '__main__':
    asyncio.run(main())
