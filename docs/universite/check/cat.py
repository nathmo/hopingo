import re, os
BS = chr(92)
DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # docs/universite
FILES = ["G-gymnase-1.md","G-gymnase-2.md","A1-analyse-1.md","L-M-algebre-lineaire.md",
         "A2-analyse-2.md","VCF-analyse-3-4.md","P-probabilites.md","N-analyse-numerique.md"]
MODULES = ["G9","G0","G1","G2","G3","G5","G4","G10","G6","G7","G8","A1","L","A2","V","C","P","F","N","M"]
UNIT = {"G9":"logique","G0":"polynomes","G1":"fonctions","G2":"explog","G3":"trigo","G5":"recurrence",
 "G4":"geoan","G10":"coniques","G6":"analyse0","G7":"combi","G8":"complexes","A1":"analyse1","L":"alglin",
 "A2":"analyse2","V":"vecto","C":"cplx","P":"proba","F":"fourier","N":"numerique","M":"matrices"}
def mod_of(id_):
    m = re.match(r"(g\d+|a\d|[lmvcfpn])[-_]", id_)
    if not m: return None
    p = m.group(1)
    return p.upper()
SKILL_H = re.compile(r"^### `([a-z0-9][a-z0-9-]*)` — (.*)$")
MOD_H = re.compile(r"^# (G\d+|A1|A2|L|M|V|C|F|P|N)\. ")
FILE_MOD = {"A1-analyse-1.md":"A1","A2-analyse-2.md":"A2","P-probabilites.md":"P","N-analyse-numerique.md":"N"}
def read(f):
    with open(os.path.join(DIR,f),encoding="utf-8") as fh: return fh.read().split("\n")
def write(f, lines):
    with open(os.path.join(DIR,f),"w",encoding="utf-8",newline="\n") as fh: fh.write("\n".join(lines))
def split_row(line):
    # split a markdown table row on unescaped |
    cells=[]; cur=""; i=0; s=line.strip()
    if s.startswith("|"): s=s[1:]
    if s.endswith("|") and not s.endswith(BS+"|"): s=s[:-1]
    while i < len(s):
        if s[i]==BS and i+1<len(s) and s[i+1]=="|": cur+=BS+"|"; i+=2; continue
        if s[i]=="|": cells.append(cur.strip()); cur=""; i+=1; continue
        cur+=s[i]; i+=1
    cells.append(cur.strip()); return cells
def parse(f, lines=None):
    if lines is None: lines = read(f)
    skills=[]; traps=[]; sections=[]; cur_mod = FILE_MOD.get(f); sec=None
    in_trap=False
    for i,l in enumerate(lines):
        m = MOD_H.match(l)
        if m: cur_mod = m.group(1)
        if l.startswith("## ") or l.startswith("# "):
            sec = l; in_trap = l.startswith("## Pièges du module")
            if skills and skills[-1]["end"] is None: skills[-1]["end"]=i
        m = SKILL_H.match(l)
        if m:
            if skills and skills[-1]["end"] is None: skills[-1]["end"]=i
            skills.append(dict(id=m.group(1), title=m.group(2), file=f, start=i, end=None, secmod=cur_mod))
        if in_trap and l.startswith("| `"):
            cells = split_row(l)
            tid = re.match(r"`([^`]+)`", cells[0]).group(1)
            traps.append(dict(id=tid, file=f, line=i, mod=cur_mod, cells=cells))
    if skills and skills[-1]["end"] is None: skills[-1]["end"]=len(lines)
    for s in skills:
        for j in range(s["start"]+1, s["end"]):
            if "**Prérequis**" in lines[j] and "**Année**" in lines[j]:
                s["fline"]=j; break
        fl = lines[s["fline"]]
        s["year"] = re.search(r"\*\*Année\*\*\s*([\d.,]+)", fl).group(1)
        pm = re.search(r"\*\*Prérequis\*\*\s*(.*?)\s*·\s*\*\*Étiquettes", fl)
        s["prereq_raw"] = pm.group(1)
        s["prereqs"] = re.findall(r"`([^`]+)`", pm.group(1))
        s["tags"] = re.search(r"\*\*Étiquettes\*\*\s*(.*?)\s*·\s*\*\*Optionnelle", fl).group(1)
        s["optional"] = re.search(r"\*\*Optionnelle\*\*\s*(\S+)", fl).group(1)
        s["weight"] = re.search(r"\*\*Poids d'examen\*\*\s*(\S+)", fl).group(1)
        s["mod"] = mod_of(s["id"])
        # fields
        s["subgoal_line"] = None; s["traps_line"]=None
        for j in range(s["start"]+1, s["end"]):
            if lines[j].startswith("- **Sous-buts"): s["subgoal_line"]=j
            if lines[j].startswith("- **Pièges**"): s["traps_line"]=j
    return dict(lines=lines, skills=skills, traps=traps)
def load_all():
    return {f: parse(f) for f in FILES}
REF = re.compile('@([A-Z][A-Z0-9]*):"([^"]*)"')
