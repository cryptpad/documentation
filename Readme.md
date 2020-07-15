
# CryptPad Documentation

Modified from the [Krita documentation](https://invent.kde.org/documentation/docs-krita-org/-/tree/master/).

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

to update after default language has changed:  
```bash
sphinx-intl update -p _build/locale`
```

to generate `.po` files for a new language e.g. French:  
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
`images` folder in repo root  
have a folder e.g. `images/fr/` with localised version of the image, if using one.

## Todo

- replace `{**logged in user**}` and similar with badges
- replace words in `[brackets]` with links
- add images/screenshots
- Multi-language setup
- Adjust theme
    - inline code: color and padding
    - paragraphs and headings: margin top and bottom
    - fix favicon
