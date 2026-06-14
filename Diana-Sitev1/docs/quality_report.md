# Quality report

Проверка выполнена по `quality_checklist.md` из skill pack.

## Структура

- [x] `index.html` в корне проекта.
- [x] CSS подключен как `css/style.css`.
- [x] JS подключен как `js/script.js` с `defer`.
- [x] Изображения структурированы: `assets/images/art`, `assets/images/portraits`, `assets/images/archive`.
- [x] Имена файлов безопасные: латиница, нижний регистр, дефисы.
- [x] ZIP создан из чистой папки проекта.

## HTML

- [x] `<!doctype html>`.
- [x] `lang="ru"`.
- [x] `title`, `meta viewport`, `meta description`, Open Graph.
- [x] Семантические теги: header/nav/main/section/article/footer/dialog.
- [x] Логичная иерархия заголовков.
- [x] Alt‑тексты для изображений.
- [x] Skip link.

## CSS

- [x] CSS‑переменные.
- [x] Reset и `box-sizing`.
- [x] Hover/focus-visible states.
- [x] Breakpoints для desktop/tablet/mobile.
- [x] `prefers-reduced-motion`.
- [x] Без лишнего `!important`, кроме reduce-motion override.

## JavaScript

- [x] `node --check js/script.js` проходит.
- [x] Селекторы проверяются перед использованием.
- [x] Burger menu.
- [x] Фильтры, поиск, сортировка.
- [x] Modal dialog: открыть/закрыть кнопкой, overlay, Escape.
- [x] localStorage wrapped in try/catch.
- [x] Frontend‑форма не отправляет данные на сервер.
- [x] Toast уведомления.

## Адаптив и поведение

Проверено в headless Chromium через Playwright на ширинах: 1440, 1200, 1024, 768, 430, 375 px. Из-за политики sandbox прямое открытие `file://`/локального HTTP в Playwright было заблокировано, поэтому поведенческий тест выполнялся через `page.set_content` с инлайном CSS/JS и data‑placeholder для изображений. Отдельно статически проверены все реальные относительные пути к CSS, JS и изображениям.

Проверенные сценарии:

- [x] На странице рендерится 10 карточек работ.
- [x] Фильтр «В наличии» показывает 3 работы.
- [x] Поиск вместе с фильтром не ломает empty state.
- [x] Мобильное меню открывается и закрывается по Escape.
- [x] Модалка работы открывается и закрывается по Escape.
- [x] Форма генерирует текст сообщения без отправки на сервер.
- [x] Горизонтальный overflow не обнаружен в проверенных ширинах.

## Ограничения

- Актуальность наличия нужно подтверждать вручную в Telegram, потому что сайт статический.
- Нет backend/CMS; это осознанный handoff‑вариант.
- Ссылки на Telegram/TikTok требуют интернет при клике, сам сайт открывается локально.
