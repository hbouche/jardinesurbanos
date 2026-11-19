# Parciales compartidos

Fuente única del **cintillo + header + menú móvil** (`header.html`), del **footer** (`footer.html`) y de los **íconos/favicon** del `<head>` (`iconos.html`).

Cada página HTML lleva una copia generada entre marcadores (`<!-- @parcial:header -->` … `<!-- @fin:header -->`), así el sitio sigue siendo estático y se publica tal cual.

- **Editar:** cambiar el parcial o `paginas.json`, que guarda las URLs de las redes y el botón del header de cada página.
- **Aplicar:** `npm run build` (o `python3 scripts/build_partials.py`).
- **Verificar:** `npm run check`. Falla si alguna página no coincide con los parciales.

No edites a mano el contenido entre los marcadores: se pierde en el siguiente build.

Tokens: `{{ROOT}}`, `{{PAGES}}`, `{{ACTIVE:clave}}`, `{{HEADER_CTA}}`, `{{RED:nombre}}` (ver `scripts/build_partials.py`).
