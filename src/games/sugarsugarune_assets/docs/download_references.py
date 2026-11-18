from pathlib import Path
import json, urllib.request
root=Path(__file__).resolve().parents[1]
refs=json.loads((root/'docs'/'source_manifest.json').read_text(encoding='utf-8'))
for item in refs:
    url=item['url']; ext=url.split('?')[0].rsplit('.',1)[-1].lower()
    if ext not in ('png','jpg','jpeg','gif','webp'): print('SKIP (page):',url); continue
    out=root/(item['target']+'.'+ext);out.parent.mkdir(parents=True,exist_ok=True)
    try:
        req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req,timeout=15) as r: data=r.read()
        if len(data)<2000: raise ValueError('Too small')
        out.write_bytes(data);print('OK',out)
    except Exception as e: print('FAILED',url,str(e))
