#!/bin/sh
#git pull origin main
rm -rf www
mkdir www
mkdir www/en
rm -rf _build/html
make html
cp -r _build/html/* www/en/
cat LANG | while read ligne ; do
    echo $ligne
    rm -rf _build/html
    make -e SPHINXOPTS="-D language='$ligne'" html
    mkdir www/$ligne
    cp -r _build/html/* www/$ligne/
done
cp sitemap-index.xml www/
cp robots.txt www/
