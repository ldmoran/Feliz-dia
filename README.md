# Feliz cumpleaños, Gaby 🌼

Página estática (HTML, CSS y JavaScript) con flores amarillas, un ramo con deseos, un pastel con velas y una carta.
La música (Iris, Goo Goo Dolls) usa el reproductor oficial de YouTube; no hay archivos de audio.

## Probar en local
YouTube necesita http, así que desde esta carpeta:

```bash
python -m http.server 8080
```
y abre http://localhost:8080

## Desplegar en Render (Static Site)
- Branch: `main`
- Build Command: vacío
- Publish Directory: `./`

Para cambiar la canción, edita `VIDEO` en `js/script.js`.
