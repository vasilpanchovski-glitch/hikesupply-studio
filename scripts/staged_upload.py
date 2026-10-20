#!/usr/bin/env python3
"""Upload local files to Shopify staged-upload targets.

Usage: python3 scripts/staged_upload.py <targets.json> <file> [<file> ...]

<targets.json> is the stagedUploadsCreate result saved verbatim (the whole
{"data":...} response, or just the stagedTargets list). Each local file is
matched to the target whose resourceUrl ends with "/<upload filename>".
Pass files as  local_path=upload_filename  when the names differ.
Prints one line per file: <upload filename> <http status> <resourceUrl>.
Status 201 means uploaded; then call fileCreate with originalSource=resourceUrl.
"""
import json, subprocess, sys

def targets(path):
    d = json.load(open(path))
    if isinstance(d, dict):
        d = d.get("data", d).get("stagedUploadsCreate", d).get("stagedTargets", d)
    return d

def main():
    ts = targets(sys.argv[1])
    ok = True
    for arg in sys.argv[2:]:
        local, _, name = arg.partition("=")
        name = name or local.rsplit("/", 1)[-1]
        t = next((t for t in ts if t["resourceUrl"].endswith("/" + name)), None)
        if not t:
            print(name, "NO-TARGET"); ok = False; continue
        cmd = ["curl", "-sS", "-o", "/dev/null", "-w", "%{http_code}", "-m", "300", t["url"]]
        for p in t["parameters"]:
            cmd += ["-F", f'{p["name"]}={p["value"]}']
        cmd += ["-F", f"file=@{local}"]
        code = subprocess.run(cmd, capture_output=True, text=True).stdout.strip()
        print(name, code, t["resourceUrl"])
        ok = ok and code in ("200", "201", "204")
    sys.exit(0 if ok else 1)

if __name__ == "__main__":
    main()
