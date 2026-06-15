# Diana final site

Статический сайт‑портфолио художницы Дианы.

## Запуск

Откройте `index.html` в браузере. Сборщик и зависимости не нужны.

Публичный URL, под который подготовлены `canonical`, Open Graph, `robots.txt` и `sitemap.xml`:

`https://endoflife1231.github.io/Diana-Art-Site/Diana-Sitev1/`

## Структура

```text
index.html
css/style.css
js/script.js
js/data.js
robots.txt
sitemap.xml
.nojekyll
assets/icons/favicon.svg
assets/images/art/*.webp
assets/images/portraits/*.webp
assets/images/archive/*.webp
assets/images/og-image.jpg
docs/brief.md
docs/design_system.md
docs/references.md
docs/quality_report.md
```

## Где менять контент

- Работы, цены, статусы, описания и категории: `js/data.js`.
- Основные секции, контакты, SEO и ссылки на Telegram/TikTok: `index.html`.
- Визуальный стиль, адаптив, анимации и состояния: `css/style.css`.
- Видео и изображения: `assets/`.

## GitHub Pages

Для первого релиза публикуйте только сайт из `Diana-Sitev1` или открывайте его по пути `/Diana-Sitev1/`, если GitHub Pages смотрит на корень репозитория.

Не включайте в релиз рабочие папки с правками, бэкапы, экспорт чатов и исходные референсы. Они нужны для разработки, но не являются частью публичного сайта.

После смены домена или пути сайта обновите:

- `canonical`, `og:url`, `og:image`, `twitter:image` в `index.html`;
- `Sitemap` в `robots.txt`;
- `<loc>` в `sitemap.xml`.

## Источники

- Telegram‑экспорт и изображения из архива `Диана`.
- Старая версия сайта `diana_site`.
- Предыдущая версия `diana_site_v2` использована только как объект аудита/исправления, не как дизайн‑основа.
- Репозиторий GitHub `endoflife1231/Diana` использован для сверки структуры и данных каталога.

## Примечание

Сайт не отправляет формы на сервер. Форма готовит текст сообщения, который можно скопировать в Telegram.
