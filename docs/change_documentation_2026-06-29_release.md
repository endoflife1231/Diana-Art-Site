# Релизная подготовка — 2026-06-29

## Публичный URL

Сайт перенесён из папки `predrelize/` в корень репозитория для публикации через GitHub Pages:

`https://endoflife1231.github.io/Diana-Art-Site/`

## Что сделано

- Исправлены релизные SEO URL в `index.html`, `robots.txt` и `sitemap.xml`.
- Добавлен JSON-LD блок для структурированного описания сайта.
- Добавлен `noscript` каталог работ для статического SEO/no-JS fallback.
- Видео перекодированы в меньшие MP4 с сохранением совместимости браузеров.
- Корневой `README.md` переписан как релизное описание репозитория для GitHub.
- `.gitignore` дополнен локальными Playwright/output артефактами.

## Видео

Перед сжатием создан бэкап:

`backups/videos-before-release-20260629T163357Z`

Итоговые размеры:

- `february-edit.mp4`: 412471 -> 205618 байт
- `hero-intro.mp4`: 6374428 -> 2039636 байт
- `hero-zaliv.mp4`: 473359 -> 240413 байт
- `penguin-context.mp4`: 5641313 -> 2275611 байт
- `process-routine.mp4`: 1510610 -> 622996 байт

Общий вес видео стал примерно 5.38 МБ вместо 14.41 МБ.

## Проверка

- `node --check js/script.js` — успешно.
- `node --check js/data.js` — успешно.
- Проверка локальных `src/href` в `index.html` — битых ссылок нет.
- Chrome/Playwright: корневая страница открывается, карточек каталога 10, консоль `0 errors / 0 warnings`.
- Mobile Chrome/Playwright: сетка 2 колонки, список 1 колонка, модалка фокусирует кнопку закрытия и закрывается по `Escape`.
- Форма контакта готовит текст сообщения без отправки данных на сервер.
- `robots.txt` и `sitemap.xml` отдаются с HTTP 200.
- Локальные timing-метрики Chrome: `DOMContentLoaded ~249ms`, `load ~387ms`, начальный transfer около `3037KB`.

Lighthouse CLI в текущем контейнере дважды упал из-за сбоя Chrome/DevTools connection (`Browser tab has unexpectedly crashed`). Это инфраструктурный сбой проверки, не ошибка страницы: тот же Chrome через Playwright сайт открывает стабильно и без console errors.
