FROM python:3.10.9-alpine
COPY requirements.txt /
RUN pip install -r requirements.txt
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

COPY . /app
WORKDIR /app
ENTRYPOINT ["python3", "cron.py"]
