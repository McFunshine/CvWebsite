#!/usr/bin/env python3
"""
Development server with live reload functionality.
"""
import os
from livereload import Server
from staticjinja import Site


def main():
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    template_dir = os.path.join(root, "src", "templates")
    static_dir = os.path.join(root, "src", "static")
    output_dir = os.path.join(root, "build")
    data_dir = os.path.join(root, "src", "data")

    # Create Site with custom settings
    site = Site.make_site(
        searchpath=template_dir,
        outpath=output_dir,
        staticpaths=["static"],
        contexts=[
            ("index.html", {"title": "Home"}),
            ("projects/*.html", {"title": "Projects"}),
            ("contact.html", {"title": "Contact"}),
        ],
    )

    # Initial build
    site.render(use_reloader=False)

    # Copy static files
    if os.path.exists(static_dir):
        os.system(f"cp -r {static_dir}/* {output_dir}/static/")

    # Set up live reload server
    server = Server()
    
    # Watch templates and static files
    server.watch(template_dir, lambda: site.render(use_reloader=False))
    server.watch(static_dir, lambda: os.system(f"cp -r {static_dir}/* {output_dir}/static/"))
    
    # Serve the site
    server.serve(root=output_dir, port=8000, host="localhost")


if __name__ == "__main__":
    main() 