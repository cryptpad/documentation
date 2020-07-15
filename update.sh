#!/bin/sh
make gettext
cat LANG | while  read ligne ; do
    sphinx-intl update --pot-dir _build/gettext -l $ligne
done
git add locale/*
git commit -m "Update .po files"
git push origin main
