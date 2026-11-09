"""Global checks over the 8 catalogs. Exit code 1 if a check fails."""
from cat import *
from collections import Counter, defaultdict
import os, sys

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
# Skills already built in the app (5H–11H units): read from js/content/skills.js.
_SKILLS_JS = os.path.join(HERE, "..", "..", "..", "js", "content", "skills.js")
SCHOOL = set(re.findall(r"\bid: '([a-z0-9-]+)'", open(_SKILLS_JS, encoding="utf-8").read()))
TRAP_RE = re.compile(r"^(g\d+|a1|a2|l|m|v|c|f|p|n)_[A-Za-z0-9_]+$")
# notation, not traps: partial derivative f_x (A2), observed p-value p_obs (P)
NOTATION = {"f_x", "p_obs"}
PREFIX_MOD = {"l": "L", "m": "M", "v": "V", "c": "C", "f": "F", "p": "P", "n": "N"}

def trap_mod(t):
    p = t.split("_", 1)[0]
    return PREFIX_MOD.get(p, p.upper())

D = load_all()
fails = defaultdict(list)
skills = [s for d in D.values() for s in d["skills"]]
cnt = Counter(s["id"] for s in skills)
by_id = {s["id"]: s for s in skills}

# 1. unique skill ids
for k, v in cnt.items():
    if v > 1: fails["1. ids de compétence uniques"].append(k)
# skill prefix matches its module section
for s in skills:
    if s["mod"] != s["secmod"]:
        fails["1. ids de compétence uniques"].append(f"{s['id']} dans la section {s['secmod']}")

# 2. prerequisites exist
for s in skills:
    for p in s["prereqs"]:
        if p.startswith("@alg:"): continue
        if p.startswith("@"):
            fails["2. prérequis existants"].append(f"{s['id']} → {p} (référence non résolue)"); continue
        if p not in by_id and p not in SCHOOL:
            fails["2. prérequis existants"].append(f"{s['id']} → {p}")

# 2b. each kept prerequisite is credited in the sub-goals or has a reason
for f, d in D.items():
    L = d["lines"]
    for s in d["skills"]:
        sub = L[s["subgoal_line"]] if s["subgoal_line"] is not None else ""
        why = L[s["fline"] + 1] if L[s["fline"] + 1].startswith("- **Pourquoi ces prérequis**") else ""
        for p in s["prereqs"]:
            if f"`{p}`" not in sub and f"`{p}` :" not in why:
                fails["2b. prérequis justifiés (sous-buts ou raison)"].append(f"{s['id']} → {p}")

# 3. no cycle
graph = {s["id"]: [p for p in s["prereqs"] if p in by_id] for s in skills}
state = {}
def dfs(u, stack):
    state[u] = 1; stack.append(u)
    for v in graph[u]:
        if state.get(v) == 1:
            fails["3. graphe sans cycle"].append(" → ".join(stack[stack.index(v):] + [v]))
        elif v not in state:
            dfs(v, stack)
    stack.pop(); state[u] = 2
sys.setrecursionlimit(10000)
for u in graph:
    if u not in state: dfs(u, [])

# 4. required skill never depends on an optional one
for s in skills:
    if s["optional"] == "non":
        for p in graph[s["id"]]:
            if by_id[p]["optional"] != "non":
                fails["4. aucune obligatoire ne dépend d'une optionnelle"].append(f"{s['id']} → {p}")
opt = [s["id"] for s in skills if s["optional"] != "non"]

# traps
defs = defaultdict(list)
for f, d in D.items():
    for t in d["traps"]:
        defs[t["id"]].append((f, t["mod"], t))
refs = defaultdict(list)   # trap id -> list of (file, line, owner module)
for f, d in D.items():
    L = d["lines"]
    owner = {}
    for s in d["skills"]:
        for j in range(s["start"], s["end"]): owner[j] = s
    cur = FILE_MOD.get(f)
    for i, l in enumerate(L):
        m = MOD_H.match(l)
        if m: cur = m.group(1)
        text = l
        own = None
        if l.startswith("| `"):
            c0 = split_row(l)[0]
            mm = re.match(r"`([^`]+)`", c0)
            if mm and TRAP_RE.match(mm.group(1)):
                own = mm.group(1)
                text = l[len(c0) + 2:]
        for tok in re.findall(r"`([^`]+)`", text):
            if TRAP_RE.match(tok) and tok not in NOTATION:
                refs[tok].append((f, i + 1, (owner[i]["mod"] if i in owner else cur)))

# 5. every referenced trap defined exactly once
for t in refs:
    if len(defs.get(t, [])) != 1:
        fails["5. piège référencé défini une seule fois"].append(f"{t} ({len(defs.get(t, []))} définitions ; {refs[t][0][0]}:{refs[t][0][1]})")
for t, ds in defs.items():
    if len(ds) > 1:
        fails["5. piège référencé défini une seule fois"].append(f"{t} défini {len(ds)} fois")

# 6. every defined trap is referenced
for t in defs:
    if t not in refs:
        fails["6. piège défini référencé"].append(t)

# 7. prefixes
MOD_ORDER = MODULES
for t, ds in defs.items():
    for f, mod, row in ds:
        if trap_mod(t) != mod:
            fails["7. préfixe des pièges = module"].append(f"{t} défini dans {mod}")
for t, rs in refs.items():
    tm = trap_mod(t)
    for f, line, om in rs:
        if om and om != tm and tm in MOD_ORDER and om in MOD_ORDER and MOD_ORDER.index(tm) > MOD_ORDER.index(om):
            fails["7. préfixe des pièges = module"].append(f"{t} (module {tm}) utilisé plus tôt, en {om} ({f}:{line})")

# 8. repair targets exist
for t, ds in defs.items():
    for f, mod, row in ds:
        rep = row["cells"][4] if len(row["cells"]) > 4 else ""
        targets = re.findall(r"`([^`]+)`", rep)
        if not targets:
            fails["8. cibles de réparation existantes"].append(f"{t} : réparation vide « {rep} »")
        for x in targets:
            if x.startswith("@alg:"): continue
            if x not in by_id and x not in SCHOOL:
                fails["8. cibles de réparation existantes"].append(f"{t} → {x}")
        comp = re.findall(r"`([^`]+)`", row["cells"][3])
        for x in comp:
            if x not in by_id:
                fails["8. cibles de réparation existantes"].append(f"{t} : compétence {x} inconnue")

# 9. no unresolved cross-catalog reference anywhere
for f, d in D.items():
    for i, l in enumerate(d["lines"]):
        if REF.search(l):
            fails["9. références @MODULE résolues"].append(f"{f}:{i+1}")

# 10. sub-goal credits point to existing skills
for f, d in D.items():
    L = d["lines"]
    for s in d["skills"]:
        if s["subgoal_line"] is None: continue
        for tok in re.findall(r"`((?:g\d+|a1|a2|l|m|v|c|f|p|n)-[a-z0-9-]+)`", L[s["subgoal_line"]]):
            if tok not in by_id and tok not in SCHOOL:
                fails["10. crédits des sous-buts existants"].append(f"{s['id']} → {tok}")

CHECKS = ["1. ids de compétence uniques", "2. prérequis existants", "2b. prérequis justifiés (sous-buts ou raison)",
          "3. graphe sans cycle", "4. aucune obligatoire ne dépend d'une optionnelle",
          "5. piège référencé défini une seule fois", "6. piège défini référencé",
          "7. préfixe des pièges = module", "8. cibles de réparation existantes",
          "9. références @MODULE résolues", "10. crédits des sous-buts existants"]
print(f"{len(skills)} compétences, {len(defs)} pièges, optionnelles : {opt}")
bad = 0
for c in CHECKS:
    v = fails.get(c, [])
    print(("OK   " if not v else "ÉCHEC") + f" {c}" + (f" : {len(v)}" if v else ""))
    for x in v[:40]: print("      ", x)
    bad += bool(v)
sys.exit(1 if bad else 0)
