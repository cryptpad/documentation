# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import json
import os
import sys
sys.path.insert(0, os.path.abspath('.'))

from sphinx import addnodes
from docutils.nodes import strong, reference, Text, raw
from docutils.parsers.rst import Directive
import docutils.parsers.rst.directives as directives

# -- Project information -----------------------------------------------------

project = 'CryptPad'
copyright = '2026, CryptPad Team'
author = 'CryptPad Team'

# The full version, including alpha/beta/rc tags
release = '2026.5.0'

# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
    'recommonmark',
    #'sphinx_markdown_tables'
    # XXX causes an error at build, removing with possible issues with tables?
    'sphinx_sitemap'
]

source_suffix = {
    '.rst': 'restructuredtext',
    '.txt': 'markdown',
    '.md': 'markdown',
}

source_parsers = {
   '.md': 'recommonmark.parser.CommonMarkParser',
}

language = 'en'

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = [
    '_build',
    'Thumbs.db',
    '.DS_Store',
    'README.md',
    'www',
    'www2',
    '_themes/theme/static/fonts/cptools/README.md',
    'requirements.txt',
    'robots.txt',
    'SECURITY.md',
    '.venv',
    '.python-version'
    ]

# -- Substitutions
# ----------------------------------------------



# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
# html_static_path = ['static']

html_static_path = ['_themes/theme/static']

html_css_files = [
    'css/open-sans.css',
    'css/cptools.css',
    'css/fontawesome.css',
    'css/IBM-plex.css',
    'css/cp-overrides.css'
]

html_js_files = [
    'js/lucide.min.js',
    'js/lucide-theme.js'
]

html_theme = "furo"
html_theme_path = ["_themes"]
using_rtd_theme = True
smartquotes = False

html_baseurl = 'https://docs.cryptpad.org/' # for the generated site-map
#html_extra_path = ["robots.txt"]

# Translations
locale_dirs = ['locale/']
gettext_compact = False
figure_language_filename = "{path}{language}/{basename}{ext}"

prolog = ''

# New 'raw' role for Lucide
prolog += '''.. role:: raw-html(raw)
   :format: html\n'''

def make_badge_role(css_class, icon_name):
    def role(name, rawtext, text, lineno, inliner, options=None, content=None):
        html = f'<span class="{css_class}" data-icon="{icon_name}"><i data-lucide="{icon_name}"></i> {text}</span>'
        return [raw(format="html", text=html)], []
    return role

badge_user_role = make_badge_role("badge-user", "user")
badge_owner_role = make_badge_role("badge-owner", "id-card-lanyard")
badge_new_role = make_badge_role("badge-new", "sparkles")

# Lucide icon directive
class Lucide(Directive):

    has_content = True

    def run(self):
        icon_name = self.content[0]
        node = raw(format="html", text=f"<i data-lucide='{icon_name}'></i>")
        return [node]

# Import lucide icons file
from conf_icons import lucide_icons
from icon_mappings import shortcut_icon_map, cptools_icon_map, admonition_icon_map

lucide_icon_set = set(lucide_icons)
html_context = {
    'lucide_theme_config': json.dumps({
        'admonitions': admonition_icon_map,
        'permalinks': {'icon': 'link'},
        'toctree': {'icon': 'chevron-right'},
    }),
}


def mapped_icon(name, icon_map):
    icon = icon_map.get(name, name)
    return icon if icon in lucide_icon_set else None


def resolve_shortcut_icon(shortcut):
    if shortcut.startswith('cptools '):
        name = shortcut.split(' ', 1)[1].strip().lower()
        icon = mapped_icon(name, cptools_icon_map)
        return '.. |cptools %s| lucide:: %s' % (name, icon) if icon else None

    name = shortcut.strip().lower().replace(' ', '-')
    icon = mapped_icon(name, shortcut_icon_map)
    return '.. |%s| lucide:: %s' % (shortcut, icon) if icon else None


lucide_substitutions = []

for icon in lucide_icons:
    lucide_substitutions.append('.. |icon %s| lucide:: %s' % (icon, icon))

for shortcut in shortcut_icon_map:
    substitution = resolve_shortcut_icon(shortcut)
    if substitution:
        lucide_substitutions.append(substitution)

for name in cptools_icon_map:
    substitution = resolve_shortcut_icon('cptools ' + name)
    if substitution:
        lucide_substitutions.append(substitution)

prolog += '\n'.join(lucide_substitutions)
prolog += '\n'


def setup(app):
    app.add_directive('lucide', Lucide)
    app.add_role('badge_user', badge_user_role)
    app.add_role('badge_owner', badge_owner_role)
    app.add_role('badge_new', badge_new_role)
    app.config.rst_prolog = (app.config.rst_prolog or '') + prolog
    return {'version': '0.0.1'}
