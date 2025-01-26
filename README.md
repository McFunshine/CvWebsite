# Personal Portfolio Website

A modern, static portfolio website built with Staticjinja.

## Architecture

```
.
├── src/                    # Source files
│   ├── templates/         # Jinja2 templates
│   ├── static/           # Static assets (CSS, JS, images)
│   └── data/             # Data files (JSON, YAML)
├── scripts/               # Build and utility scripts
├── build/                 # Generated static site
└── config/               # Configuration files
```

## Development

1. Set up environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

2. Run development server:
   ```bash
   python scripts/serve.py
   ```

3. Build static site:
   ```bash
   python scripts/build.py
   ```

## Deployment

The `build/` directory contains the complete static site that can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- etc.

## Tech Stack

- Python 3.9+
- Staticjinja 4.0.0
- Modern CSS (no framework)
- Vanilla JavaScript
