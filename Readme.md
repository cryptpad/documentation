
# CryptPad Documentation


## Installation 

```bash
pipenv install
```
or
```bash
pip install requirements.txt` 
```

## Build

English `en` is the default language.

to build the default:  
```bash
make html
```

to build another language, e.g. French: 
```bash
make -e SPHINXOPTS="-D language='fr'" html
```

View the result in `/_build/html/`

## Translations

If you are interested in translating this documentation, you can use our [Weblate project](https://weblate.cryptpad.fr/projects/user-guide/) for the user guide. If your language is not listed, please [contact the development team](https://cryptpad.fr/contact.html) to add it.

### Translated builds

To update after default language has changed:  
```bash
sphinx-intl update -p _build/locale`
```

To generate `.po` files for a new language e.g. French:  
```bash
make gettext
sphinx-intl update -p _build/gettext -l fr
```

[update.sh](update.sh) updates all languages after English has changed: 
```bash
./update.sh
```

[build.sh](build.sh) builds all languages into the `www` folder: 
```bash
./build.sh
```

### translated images
Images for English are in the `/images` folder.  
To provide localised versions of images, place them in a folder such as `images/fr/`.

## Licenses

The content of this documentation is licensed under the [Creative Commons Attribution 4.0 Internarional](LICENSE) (CC-BY).

The theme is modified from the [Krita documentation](https://invent.kde.org/documentation/docs-krita-org/-/tree/master/) and licensed under the [GNU Free Documentation License](_themes/theme/LICENSE).
