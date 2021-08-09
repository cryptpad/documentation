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
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))

import os
from sphinx import addnodes
from docutils.nodes import strong, emphasis, reference, Text
from docutils.parsers.rst.roles import set_classes
from docutils.parsers.rst import Directive
import docutils.parsers.rst.directives as directives

# -- Project information -----------------------------------------------------

project = 'CryptPad'
copyright = '2021, CryptPad Team'
author = 'CryptPad Team'

# The full version, including alpha/beta/rc tags
release = '4.7.0'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
import sphinx_fontawesome

extensions = [
    'recommonmark',
    'sphinx_markdown_tables',
    'sphinx_fontawesome',
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
    'Readme.md',
    'www',
    'www2',
    '_themes/theme/static/fonts/cptools/Readme.md',
    'requirements.txt'
    ]

# -- Substitutions
# ----------------------------------------------

# rst_prolog is used by the Fontawesome package
# to use it: rst_prolog = sphinx_fontawesome.prolog + "my prolog"

rst_epilog = """

.. role:: badge_user
.. role:: badge_owner
.. role:: badge_new

"""


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
# html_static_path = ['static']

html_css_files = [
    'css/open-sans.css',
    'css/cptools.css',
    'css/fontawesome.css',
    'css/cp-overrides.css'
]

html_theme = "theme"
html_theme_path = ["_themes"]
using_rtd_theme = True
smartquotes = False

html_baseurl = 'https://docs.cryptpad.fr/' # for the generated site-map
html_extra_path = ["robots.txt"]

html_theme_options = {
    'logo_only': False,
    'display_version': True,
    'prev_next_buttons_location': 'bottom',
    'style_external_links': False,
    # Toc options
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 5,
    'includehidden': True,
    'titles_only': False
}

# Translations
locale_dirs = ['locale/']
gettext_compact = False
figure_language_filename = "{path}{language}/{basename}{ext}"

# Add support for cptools

def cptools_global(key=''):
    def cptools(role, rawtext, text, lineno, inliner, options={}, content=[]):
        options.update({'classes': []})
        options['classes'].append('cptools')
        if key:
            options['classes'].append('cptools-%s' % key)
        else:
             for x in text.split(","):
                options['classes'].append('cptools-%s' % x)
        set_classes(options)
        node = emphasis(**options)
        return [node], []
    return cptools

#add directive
class Cptools(Directive):

    has_content = True

    def run(self):
        options= {'classes' : []}
        options['classes'].append('cptools')
        for x in self.content[0].split(' '):
            options['classes'].append('cptools-%s' % x)
        set_classes(options)
        node = emphasis(**options)
        return [node]

cptools_icons = ['destroy', 'add-bottom', 'add-top', 'folder-upload', 'folder-no-color', 'slide', 'shared-folder', 'poll', 'file-upload', 'whiteboard', 'todo', 'pad', 'folder-open', 'kanban', 'folder', 'shared-folder-open', 'code', 'template', 'new-template', 'palette', 'form-poll', 'form-poll-maybe', 'form-list-check', 'form-grid-check', 'form-grid-radio', 'form-list-radio', 'form-page-break', 'form-paragraph', 'form-text', 'form-list-ordered']

prolog = '\n'.join(['.. |cptools %s| cptools:: %s' % (icon, icon) for icon in cptools_icons])
prolog += '\n'

def setup(app):
    app.add_role('cptools', cptools_global())
    app.add_directive('cptools', Cptools)
    app.config.rst_prolog += prolog
    return {'version': '0.0.1'}
