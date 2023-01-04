# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.10

ENV PYTHONUNBUFFERED 1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install pip requirements
COPY Pipfile Pipfile.lock /app/
RUN pip install pipenv && pipenv install --system

COPY . /app

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-container