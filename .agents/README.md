# Project-local Codex skills

Отбор сделан из полного пакета версии `2026-06-27.3` под текущий статический HTML/CSS/JavaScript-сайт.

## Разработка и дизайн

- `frontend-ui-engineering`, `design-system`, `ui-ux-pro-max`, `web-design-guidelines`
- `imagegen` — создание и редактирование растровых ассетов
- `code-simplification` — безопасная очистка накопившегося CSS/JS

## Проверка качества

- `browser-testing-with-devtools`, `playwright`
- `code-review-and-quality`, `debugging-and-error-recovery`
- `performance-optimization`, `security-and-hardening`

## Процесс и релиз

- `planning-and-task-breakdown`, `documentation-and-adrs`
- `git-workflow-and-versioning`, `shipping-and-launch`

## Caveman

- `caveman` — краткий режим общения;
- `caveman-setup` — project-local hooks;
- `caveman-help`, `caveman-commit`, `caveman-review`;
- `caveman-compress`, `caveman-stats`.

Hook установлен в `.codex/hooks.json`; режим `full`, автоматическая активация включена. Команда hook локальная, не использует сеть и не читает секреты. После первого открытия проекта проверьте и разрешите его через `/hooks`.

Используйте минимальный подходящий skill. Перед применением прочитайте его `SKILL.md` и только прямо указанные там references. Интеграционные skills могут требовать отдельный CLI или браузер; отсутствие зависимости не следует подменять выдуманным результатом.
