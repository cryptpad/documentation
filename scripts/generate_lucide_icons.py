#!/usr/bin/env python3
# Regenerate lucide_icons.py after updating _themes/theme/static/js/lucide.min.js

import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parents[1]
lucide_js = Path(sys.argv[1]) if len(sys.argv) > 1 else root / "_themes/theme/static/js/lucide.min.js"
out = root / "lucide_icons.py"

text = lucide_js.read_text(encoding="utf-8")
names = re.findall(r"a\.([A-Z][A-Za-z0-9]*)=", text)

def convert_to_kebab_case(name):
    name = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", name)
    name = re.sub(r"([A-Z])([A-Z][a-z])", r"\1-\2", name)
    return name.lower()

seen = set()
icons = []
for name in names:
    icon = convert_to_kebab_case(name)
    if icon not in seen:
        seen.add(icon)
        icons.append(icon)
icons.sort()

lines = ["# generated from %s\n" % lucide_js.name, "lucide_icons = ["]
lines += ["    %r," % i for i in icons]
lines.append("]\n")
out.write_text("\n".join(lines), encoding="utf-8")
print(len(icons), "icons ->", out)
