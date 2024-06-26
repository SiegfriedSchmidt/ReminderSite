# Reminder Site

### Клонирование репозитория
```bash
$ git clone https://github.com/SiegfriedSchmidt/ReminderSite
$ cd ReminderSite
```

## Проект состоит из 3 частей:
### 1. Фронтенд
#### Установка зависимостей
```bash
$ cd frontend
$ npm install
```
#### Запуск тестового веб сервера
```bash
$ npm run dev
```
Сервер будет запущен на первом свободном порту начиная от 8000

### 2. Бэкенд
#### Установка зависимостей

Windows:
```bash
$ cd backend
$ python -m venv venv
$ .\venv\Scripts\activate
$ pip install -r requirements.txt
```

Linux:
```bash
$ cd backend
$ python3 -m venv venv
$ source ./venv/bin/activate
$ pip install -r requirements.txt
```

#### Запуск бэкенд
```bash
$ python3 main.py
```
Бэкенд сервер будет запущен на http://localhost:8003

### 3. Телеграм бот
#### Установка зависимостей

Windows:
```bash
$ cd telegram_bot
$ python -m venv venv
$ .\venv\Scripts\activate
$ pip install -r requirements.txt
```

Linux:
```bash
$ cd telegram_bot
$ python3 -m venv venv
$ source ./venv/bin/activate
$ pip install -r requirements.txt
```

#### Запуск бэкенд
```bash
$ python3 bot.py
```
Телеграм бот @Reminder_Site_Bot

# Важные замечания
## Никогда не пушить в main ветку!
