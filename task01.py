"""
Task 01: Personal Responsive Profile Website (HTML, CSS, JS)

This script automates launching and previewing the personal profile client-side website.
The site consists of three separate files:
  - index.html: Semantic structure, SEO meta tags, profile info, skills, and interactive contact form.
  - styles.css: Modern glassmorphism UI, Dark/Light mode theme system, responsive layout.
  - script.js: Dark/Light toggle, expandable 'Read More' text, client-side validation & toast feedback.
"""

import os
import webbrowser
from pathlib import Path


def open_profile_website():
    """Opens the generated index.html file in the default web browser."""
    current_dir = Path(__file__).parent.resolve()
    html_file = current_dir / "index.html"

    if not html_file.exists():
        print(f"Error: Could not find {html_file}")
        return False

    file_uri = html_file.as_uri()
    print(f"Opening Profile Website in default browser: {file_uri}")
    webbrowser.open(file_uri)
    return True


if __name__ == "__main__":
    open_profile_website()
