#!/bin/sh
#git pull origin main
rm -rf www2
mkdir www2
mkdir www2/en
rm -rf _build/html
make html
cp -r _build/html/* www2/en/
cat LANG | while read ligne ; do
    echo $ligne
    rm -rf _build/html
    make -e SPHINXOPTS="-D language='$ligne'" html
    mkdir www2/$ligne
    cp -r _build/html/* www2/$ligne/
done

