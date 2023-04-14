# Тестовое задание для компании TakeMyCode


Сделать простую систему авторизации/регистрации/получение информации о пользователе на Node.js. 
Обязательно, чтобы фигурировал jwt токен из-за микросервисной архитектуры. Чтобы потом любые другие сервисы, зная публичный сертификат, могли валидировать токен, не обращаясь к базам. 
База данных для хранения пользователей - postgresql. База данных хранения сессий - redis.
Обязательно использовать nest.js. 



# Для запуска:
1. Установить зависимости: npm ci
2. Создать файл .env и положить туда:
```bash
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_DB=finansy
POSTGRES_PASSWORD=123
POSTGRES_PORT=5432
JWT_SECRET="secret"
SESSION_SECRET="session_secret"
AT_SECRET="at_secret"
RT_SECRET="rt_secret"
AT_EXPIRES="15m"
RT_EXPIRES="7d"
SESSION_MAX_AGE=360000
```
3. Изменить конфиг для Postgresql
4. Создать БД с нужным названием
5. Запустить редис в Docker: npm run docker:compose
6. Запустить приложение: npm run start:dev
