from __future__ import annotations

import re
from datetime import date
from html import escape
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parents[1]
SOURCE_MD = ROOT / "docs" / "dossier-professionnel-cutandgo.md"
OUT_DOCX = ROOT / "output" / "docx" / "DP_CutAndGo_dossier_professionnel_complet.docx"

NS_W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
FOOTER = "DOSSIER PROFESSIONNEL - Cut&Go - Version de travail"


ACCENT_REPLACEMENTS = {
    "A completer": "À compléter",
    "a completer": "à compléter",
    "Prenom": "Prénom",
    "Developpeur": "Développeur",
    "developpeur": "développeur",
    "vise": "visé",
    "Vise": "Visé",
    "Modalite": "Modalité",
    "modalite": "modalité",
    "utilisateur": "utilisateur",
    "Deploiement": "Déploiement",
    "deploiement": "déploiement",
    "Deployer": "Déployer",
    "deployer": "déployer",
    "Developper": "Développer",
    "developper": "développer",
    "securisee": "sécurisée",
    "securise": "sécurisé",
    "securite": "sécurité",
    "Securite": "Sécurité",
    "competence": "compétence",
    "Competence": "Compétence",
    "competences": "compétences",
    "Competences": "Compétences",
    "utilise": "utilisé",
    "utilisee": "utilisée",
    "utilises": "utilisés",
    "effectuees": "effectuées",
    "taches": "tâches",
    "Taches": "Tâches",
    "Mise en oeuvre": "Mise en œuvre",
    "presentation": "présentation",
    "Presentation": "Présentation",
    "reservation": "réservation",
    "Reservation": "Réservation",
    "reservations": "réservations",
    "Reservations": "Réservations",
    "creneau": "créneau",
    "Creneau": "Créneau",
    "creneaux": "créneaux",
    "Creneaux": "Créneaux",
    "donnees": "données",
    "Donnees": "Données",
    "base de donnees": "base de données",
    "Base de donnees": "Base de données",
    "requete": "requête",
    "Requete": "Requête",
    "requetes": "requêtes",
    "Requetes": "Requêtes",
    "preparees": "préparées",
    "preparee": "préparée",
    "separe": "séparé",
    "separee": "séparée",
    "modele": "modèle",
    "Modele": "Modèle",
    "periode": "période",
    "Periode": "Période",
    "diplomes": "diplômes",
    "Diplomes": "Diplômes",
    "Declaration": "Déclaration",
    "declare": "déclare",
    "soussigne": "soussigné",
    "realise": "réalisé",
    "realisee": "réalisée",
    "realises": "réalisés",
    "Realise": "Réalisé",
    "Realisee": "Réalisée",
    "Realises": "Réalisés",
    "Realiser": "Réaliser",
    "realiser": "réaliser",
    "identite": "identité",
    "Identite": "Identité",
    "acces": "accès",
    "Acces": "Accès",
    "cote": "côté",
    "Cote": "Côté",
    "metier": "métier",
    "Metier": "Métier",
    "role": "rôle",
    "Role": "Rôle",
    "roles": "rôles",
    "Roles": "Rôles",
    "controle": "contrôle",
    "Controle": "Contrôle",
    "controlees": "contrôlées",
    "protegees": "protégées",
    "protege": "protégé",
    "proteges": "protégés",
    "hebergeur": "hébergeur",
    "heberger": "héberger",
    "general": "général",
    "Generale": "Générale",
    "generale": "générale",
    "exercice": "exercice",
    "associes": "associés",
    "associe": "associé",
    "complementaires": "complémentaires",
    "Complementaires": "Complémentaires",
    "facultatif": "facultatif",
    "facultative": "facultative",
    "connexion": "connexion",
    "administrateur": "administrateur",
    "reactivation": "réactivation",
    "reactiver": "réactiver",
    "reactive": "réactivé",
    "supprime": "supprimé",
    "creer": "créer",
    "Creer": "Créer",
    "Creation": "Création",
    "creation": "création",
    "cree": "créé",
    "creee": "créée",
    "desactiver": "désactiver",
    "Desactiver": "Désactiver",
    "integrer": "intégrer",
    "Integration": "Intégration",
    "integration": "intégration",
    "ecran": "écran",
    "ecrans": "écrans",
    "defini": "défini",
    "definir": "définir",
    "definies": "définies",
    "eviter": "éviter",
    "evoluer": "évoluer",
    "coherence": "cohérence",
    "necessaire": "nécessaire",
    "necessaires": "nécessaires",
    "necessitait": "nécessitait",
    "verification": "vérification",
    "Verification": "Vérification",
    "verifie": "vérifie",
    "verifier": "vérifier",
    "Verifier": "Vérifier",
    "visible": "visible",
    "visuel": "visuel",
    "visuelle": "visuelle",
    "implemente": "implémenté",
    "implementees": "implémentées",
    "Implementation": "Implémentation",
    "implementation": "implémentation",
    "authentification": "authentification",
}

COMPETENCE_INSERTS = {
    "CP1 - Installer et configurer son environnement de travail": [
        "Compétences mises en évidence : installation d'un environnement fullstack, séparation des configurations, gestion de versions, documentation et capacité à rendre le projet reproductible.",
        "Amélioration apportée au dossier : la configuration locale et production est reliée explicitement aux preuves du dépôt, notamment README, .env.example, package.json et structure de projet.",
    ],
    "CP2 - Maquetter des interfaces utilisateur web ou web mobile": [
        "Compétences mises en évidence : analyse du besoin, identification des profils, conception des parcours, priorisation MVP et préparation des écrans avant développement.",
        "Amélioration apportée au dossier : le lien entre brief, user stories, RGPD, accessibilité et choix de périmètre est rendu plus explicite pour le jury.",
    ],
    "CP3 - Réaliser des interfaces utilisateur statiques web ou web mobile": [
        "Compétences mises en évidence : intégration HTML/CSS, responsive design, formulaires accessibles, pages légales et cohérence visuelle de l'application.",
        "Amélioration apportée au dossier : les preuves front-end sont organisées par pages livrées et par objectifs de qualité, dont Lighthouse, accessibilité et structure sémantique.",
    ],
    "CP4 - Développer la partie dynamique des interfaces utilisateur web ou web mobile": [
        "Compétences mises en évidence : manipulation du DOM, appels fetch, async/await, gestion du JWT côté client, affichage conditionnel, messages utilisateur et sécurité des contenus dynamiques.",
        "Amélioration apportée au dossier : la logique front-end est présentée comme un parcours complet client, salon et administrateur relié aux scripts JavaScript du projet.",
    ],
    "CP5 - Mettre en place une base de données relationnelle": [
        "Compétences mises en évidence : modélisation relationnelle, contraintes SQL, clés étrangères, données de démonstration, migration et cohérence métier.",
        "Amélioration apportée au dossier : le choix d'une base relationnelle est justifié par les relations fortes entre utilisateurs, salons, prestations, créneaux et réservations.",
    ],
    "CP6 - Développer des composants d'accès aux données SQL et NoSQL": [
        "Compétences mises en évidence : accès aux données avec mysql2, requêtes préparées, jointures, transactions, CRUD et sécurisation contre l'injection SQL.",
        "Amélioration apportée au dossier : le dossier explique pourquoi le NoSQL n'est pas utilisé dans ce MVP et valorise la maîtrise SQL attendue pour le titre.",
    ],
    "CP7 - Développer des composants métier côté serveur": [
        "Compétences mises en évidence : API REST Express, controllers, middlewares, authentification, rôles, règles métier, erreurs HTTP et sécurisation des parcours sensibles.",
        "Amélioration apportée au dossier : les règles métier sont reliées aux preuves de code backend et aux tests, ce qui rend la démonstration plus solide devant le jury.",
    ],
    "CP8 - Documenter le déploiement d'une application dynamique web ou web mobile": [
        "Compétences mises en évidence : documentation de déploiement, variables d'environnement, architecture de production, base distante, URL publique et checklist de vérification.",
        "Amélioration apportée au dossier : le déploiement Alwaysdata est présenté comme une procédure reproductible, pas seulement comme une URL finale.",
    ],
}


def normalize_text(text: str) -> str:
    protected: list[str] = []

    def keep(match: re.Match[str]) -> str:
        protected.append(match.group(0))
        return f"@@PROTECTED_{len(protected)-1}@@"

    text = re.sub(r"`[^`\n]+`", keep, text)
    text = re.sub(r"https?://\S+", keep, text)
    for src, dst in sorted(ACCENT_REPLACEMENTS.items(), key=lambda item: len(item[0]), reverse=True):
        text = text.replace(src, dst)
    for i, value in enumerate(protected):
        text = text.replace(f"@@PROTECTED_{i}@@", value)
    return text


def style_p(style: str | None = None, num_id: int | None = None) -> str:
    parts = []
    if style:
        parts.append(f'<w:pStyle w:val="{style}"/>')
    if num_id:
        parts.append(f'<w:numPr><w:ilvl w:val="0"/><w:numId w:val="{num_id}"/></w:numPr>')
    if not parts:
        return ""
    return "<w:pPr>" + "".join(parts) + "</w:pPr>"


def runs_from_inline(text: str, bold: bool = False, italic: bool = False) -> str:
    text = normalize_text(text)
    tokens = re.split(r"(`[^`]+`|\*\*[^*]+\*\*)", text)
    runs = []
    for token in tokens:
        if not token:
            continue
        props = []
        content = token
        if token.startswith("`") and token.endswith("`"):
            content = token[1:-1]
            props.append('<w:rStyle w:val="CodeChar"/>')
        elif token.startswith("**") and token.endswith("**"):
            content = token[2:-2]
            props.append("<w:b/>")
        if bold:
            props.append("<w:b/>")
        if italic:
            props.append("<w:i/>")
        rpr = f"<w:rPr>{''.join(props)}</w:rPr>" if props else ""
        runs.append(f'<w:r>{rpr}<w:t xml:space="preserve">{escape(content)}</w:t></w:r>')
    return "".join(runs)


def paragraph(text: str = "", style: str | None = None, num_id: int | None = None, page_break: bool = False) -> str:
    br = '<w:r><w:br w:type="page"/></w:r>' if page_break else ""
    return f"<w:p>{style_p(style, num_id)}{br}{runs_from_inline(text)}</w:p>"


def table(rows: list[list[str]]) -> str:
    if not rows:
        return ""
    col_count = max(len(row) for row in rows)
    widths = [int(9360 / col_count)] * col_count
    grid = "".join(f'<w:gridCol w:w="{width}"/>' for width in widths)
    out = [
        "<w:tbl>",
        '<w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblInd w:w="120" w:type="dxa"/>'
        '<w:tblBorders><w:top w:val="single" w:sz="4" w:color="B7C4D6"/><w:left w:val="single" w:sz="4" w:color="B7C4D6"/>'
        '<w:bottom w:val="single" w:sz="4" w:color="B7C4D6"/><w:right w:val="single" w:sz="4" w:color="B7C4D6"/>'
        '<w:insideH w:val="single" w:sz="4" w:color="D7DEE8"/><w:insideV w:val="single" w:sz="4" w:color="D7DEE8"/></w:tblBorders>'
        '<w:tblCellMar><w:top w:w="90" w:type="dxa"/><w:start w:w="120" w:type="dxa"/><w:bottom w:w="90" w:type="dxa"/><w:end w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr>',
        f"<w:tblGrid>{grid}</w:tblGrid>",
    ]
    for r_index, row in enumerate(rows):
        out.append("<w:tr>")
        padded = row + [""] * (col_count - len(row))
        for c_index, cell in enumerate(padded):
            fill = '<w:shd w:fill="E8EEF5"/>' if r_index == 0 else ""
            cell_text_style = "TableHeader" if r_index == 0 else "TableCell"
            out.append(
                f'<w:tc><w:tcPr><w:tcW w:w="{widths[c_index]}" w:type="dxa"/>{fill}</w:tcPr>'
                f'{paragraph(cell.strip(), cell_text_style)}</w:tc>'
            )
        out.append("</w:tr>")
    out.append("</w:tbl>")
    return "".join(out)


def parse_markdown(md: str) -> list[str]:
    lines = md.splitlines()
    parts: list[str] = []
    table_rows: list[list[str]] = []
    in_code = False
    code_lines: list[str] = []

    def flush_table() -> None:
        nonlocal table_rows
        if table_rows:
            parts.append(table(table_rows))
            table_rows = []

    def flush_code() -> None:
        nonlocal code_lines
        if code_lines:
            for code_line in code_lines:
                parts.append(paragraph(code_line, "CodeBlock"))
            code_lines = []

    for raw in lines:
        line = raw.rstrip()
        if line.strip().startswith("```"):
            flush_table()
            if in_code:
                flush_code()
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code_lines.append(line)
            continue

        if line.strip() == "---":
            flush_table()
            parts.append(paragraph(page_break=True))
            continue

        if "|" in line and line.strip().startswith("|"):
            cells = [normalize_text(c.strip()) for c in line.strip().strip("|").split("|")]
            if all(re.fullmatch(r":?-{3,}:?", c.strip()) for c in cells):
                continue
            table_rows.append(cells)
            continue
        flush_table()

        stripped = line.strip()
        if not stripped:
            parts.append(paragraph(""))
            continue

        heading = re.match(r"^(#{1,6})\s+(.*)$", stripped)
        if heading:
            level = len(heading.group(1))
            text = normalize_text(heading.group(2))
            style = {1: "Heading1", 2: "Heading2", 3: "Heading3"}.get(level, "Heading4")
            parts.append(paragraph(text, style))
            for extra in COMPETENCE_INSERTS.get(text, []):
                parts.append(paragraph(extra, "Callout"))
            continue

        bullet = re.match(r"^[-*]\s+(.*)$", stripped)
        if bullet:
            parts.append(paragraph(bullet.group(1), "ListParagraph", num_id=1))
            continue

        ordered = re.match(r"^\d+\.\s+(.*)$", stripped)
        if ordered:
            parts.append(paragraph(ordered.group(1), "ListParagraph", num_id=2))
            continue

        parts.append(paragraph(stripped, "Normal"))

    flush_table()
    flush_code()
    return parts


def styles_xml() -> str:
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="{NS_W}">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr><w:pPr><w:spacing w:after="120" w:line="280" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="36"/><w:color w:val="1F4D78"/></w:rPr><w:pPr><w:spacing w:after="220"/><w:jc w:val="center"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:color w:val="555555"/></w:rPr><w:pPr><w:spacing w:after="180"/><w:jc w:val="center"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="30"/><w:color w:val="2E74B5"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="260" w:after="140"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="26"/><w:color w:val="1F4D78"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="180" w:after="100"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="23"/><w:color w:val="333333"/></w:rPr><w:pPr><w:keepNext/><w:spacing w:before="120" w:after="80"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading4"><w:name w:val="heading 4"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr><w:pPr><w:spacing w:before="100" w:after="60"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:rPr><w:sz w:val="22"/></w:rPr><w:pPr><w:spacing w:after="80" w:line="280" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="CodeBlock"><w:name w:val="Code Block"/><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:pPr><w:spacing w:after="40"/><w:shd w:fill="F4F6F8"/></w:pPr></w:style>
  <w:style w:type="character" w:styleId="CodeChar"><w:name w:val="Code Char"/><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="20"/><w:color w:val="8A3B12"/></w:rPr></w:style>
  <w:style w:type="paragraph" w:styleId="Callout"><w:name w:val="Callout"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="21"/><w:color w:val="1F3A5F"/></w:rPr><w:pPr><w:spacing w:before="60" w:after="90"/><w:ind w:left="240"/><w:shd w:fill="F4F6F9"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableHeader"><w:name w:val="Table Header"/><w:rPr><w:b/><w:sz w:val="20"/></w:rPr><w:pPr><w:spacing w:after="0"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="TableCell"><w:name w:val="Table Cell"/><w:rPr><w:sz w:val="20"/></w:rPr><w:pPr><w:spacing w:after="0" w:line="260" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="FooterLine"><w:name w:val="Footer Line"/><w:rPr><w:sz w:val="16"/><w:color w:val="666666"/></w:rPr><w:pPr><w:jc w:val="center"/><w:spacing w:before="120" w:after="0"/></w:pPr></w:style>
</w:styles>"""


def numbering_xml() -> str:
    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:numbering xmlns:w="{NS_W}">
  <w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="720"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="decimal"/><w:lvlText w:val="%1."/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="720"/></w:tabs><w:ind w:left="720" w:hanging="360"/></w:pPr></w:lvl></w:abstractNum>
  <w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>
  <w:num w:numId="2"><w:abstractNumId w:val="1"/></w:num>
</w:numbering>"""


def build_docx() -> None:
    OUT_DOCX.parent.mkdir(parents=True, exist_ok=True)
    md = SOURCE_MD.read_text(encoding="utf-8")
    parts = [
        paragraph("DOSSIER PROFESSIONNEL (DP)", "Title"),
        paragraph("Cut&Go - Application web de réservation de rendez-vous pour salons de coiffure", "Subtitle"),
        paragraph("Titre professionnel visé : Développeur web et web mobile", "Subtitle"),
        paragraph("Version complète intégrée dans le modèle Word vierge", "Subtitle"),
        paragraph(page_break=True),
    ]
    parts.extend(parse_markdown(md))
    parts.append(paragraph(FOOTER, "FooterLine"))

    document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="{NS_W}">
  <w:body>
    {''.join(parts)}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/>
      <w:cols w:space="708"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>
  </w:body>
</w:document>"""

    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
  <Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>"""
    rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>"""
    doc_rels = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
</Relationships>"""
    core = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>Dossier professionnel Cut&amp;Go complet</dc:title>
  <dc:creator>Codex</dc:creator>
  <cp:lastModifiedBy>Codex</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{date.today().isoformat()}T00:00:00Z</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{date.today().isoformat()}T00:00:00Z</dcterms:modified>
</cp:coreProperties>"""
    app = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Codex</Application></Properties>"""

    with ZipFile(OUT_DOCX, "w", ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", rels)
        z.writestr("word/_rels/document.xml.rels", doc_rels)
        z.writestr("word/document.xml", document_xml)
        z.writestr("word/styles.xml", styles_xml())
        z.writestr("word/numbering.xml", numbering_xml())
        z.writestr("docProps/core.xml", core)
        z.writestr("docProps/app.xml", app)
    print(OUT_DOCX)


if __name__ == "__main__":
    build_docx()
