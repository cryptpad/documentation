#!/bin/sh
git pull origin main
rm -r www
mkdir www
mkdir www/en
make html
rm -r _build/html
cp -r _build/html www/en/
cat LANG | while  read ligne ; do
    rm -r _build/html
    make -e SPHINXOPTS="-D language='$ligne'" html
    mkdir www/$ligne
    cp -r _build/html www/$ligne/
done

