# Sam Tran — Portfolio

Personal portfolio website built with HTML, CSS, and JavaScript.

## Tech Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- EmailJS (contact form)

## Project Structure

```text
.
├── index.html
├── style.css
├── script.js
└── images/
```

## Run Locally

This is a static site, so you can open `index.html` directly in a browser.

For best results, run with a local server:

```bash
# Python
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

## Deploy (GitHub Pages)

This repo is set up as a user site:

- Repository: `samktran/samktran.github.io`
- Branch: `main`
- Folder: `/ (root)`

Push flow:

```bash
git add .
git commit -m "update portfolio"
git push origin main
```

## If changes don’t appear immediately

GitHub Pages and browsers cache static files for a short time.

Try:

- Hard refresh: `Ctrl + F5`
- Open in Incognito/Private mode
- Use a cache-busting URL: `https://samktran.github.io/?v=timestamp`
- Wait up to ~10 minutes for CDN cache expiry

## Contact Form

Contact form uses EmailJS configured in `script.js`.

To change keys/service/template IDs, update these constants:

- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
