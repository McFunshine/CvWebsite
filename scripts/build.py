#!/usr/bin/env python3
"""
Build script for generating static site using Staticjinja.
"""
import os
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

    # Build site
    site.render(use_reloader=False)

    # Copy static files
    if os.path.exists(static_dir):
        os.system(f"cp -r {static_dir}/* {output_dir}/static/")
        # Copy favicon to root directory as well
        os.system(f"cp {static_dir}/img/favicon.ico {output_dir}/favicon.ico")


if __name__ == "__main__":
    main() 