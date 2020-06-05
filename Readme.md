
Test setup for CryptPad documentation

## Translation

Currently set-up with `en` as first language and French translation.

to build the default: `make html`  
to build French: `make -e SPHINXOPTS="-D language='fr'" html`

to update after default language has changed:  
`sphinx-intl update -p _build/locale`

Check [the Sphinx docs](https://www.sphinx-doc.org/en/master/usage/advanced/intl.html)

to generate `.po` files for a new language (not sure about this):  
`make gettext` ?
`sphinx-intl update -p _build/gettext -l de` 

check this:  
https://invent.kde.org/documentation/docs-krita-org#using-multiple-languages-at-once

[build script](https://invent.kde.org/documentation/docs-krita-org/-/blob/master/rebuild-all.bat) to automate building all languages and moving them to a `dist` folder. e.g. `dist/en/`

### translated images
`images` folder in repo root  
have a folder e.g. `images/fr/` with localised version of the image, if using one.

## Nav Issue

Why is it not like Krita? 
https://github.com/readthedocs/readthedocs.org/issues/1622 

