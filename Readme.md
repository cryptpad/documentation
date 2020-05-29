
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

