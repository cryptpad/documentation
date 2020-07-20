#!/bin/bash
git push ssh://cryptpad@freemium.cryptpad.fr:/home/cryptpad/cryptpad-documentation.git main && ssh cryptpad@freemium.cryptpad.fr 'cd /home/cryptpad/cryptpad-documentation && /usr/bin/git checkout dev && /usr/bin/git pull'
