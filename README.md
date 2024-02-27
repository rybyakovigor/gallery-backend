# Бэкенд Онлайн-Галереи

Приложение развернуто на [NestJS](https://docs.nestjs.com/) версия cli `10.0.0`

## Установка зависимостей

```bash
$ yarn install
```

## Запуск приложения

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Проверка качества кода

```bash
# типизация
$ yarn tsc

# eslint
$ yarn lint

# prettier
$ yarn prettier
```

Перед коммитом запускается husky и происходит проверка/исправление по возможности с помощью всех линтеров. Также проверяется шаблон на текст коммита.

```bash
chore: run tests on travis ci
fix(server): #13 send cors headers
feat(blog): #42 add comment section
```

## Тесты

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## BD
```bash
# Генерация схемы prisma
$ yarn prisma generate

# Генерация миграции
$ yarn prisma migrate dev

# Применить миграции
$ yarn prisma migrate deploy

# Удалить из БД все данные и таблицы
$ yarn prisma migrate reset
```

## Репозиторий
В репозитории 2 основные ветки: `master` и `develop`. Разработка ведется через создание веток от `develop`. `Master` - ветка для прода.
