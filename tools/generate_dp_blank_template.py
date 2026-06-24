from __future__ import annotations

from datetime import date
from html import escape
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT_DOCX = ROOT / "output" / "docx" / "DP_JPMTP_modele_vierge_30_pages.docx"
OUT_PDF = ROOT / "output" / "pdf" / "DP_JPMTP_modele_vierge_remplissable_30_pages.pdf"

TITLE = "DOSSIER PROFESSIONNEL (DP)"
FOOTER = "DOSSIER PROFESSIONNEL - Version du 01/06/2016"

EXAMPLES = [
    ("Activité-type 1", "Développer la partie front-end d'une application web ou web mobile sécurisée", "Installer et configurer son environnement de travail en fonction du projet web ou web mobile"),
    ("Activité-type 1", "Développer la partie front-end d'une application web ou web mobile sécurisée", "Maquetter des interfaces utilisateur web ou web mobile"),
    ("Activité-type 1", "Développer la partie front-end d'une application web ou web mobile sécurisée", "Réaliser des interfaces utilisateur statiques web ou web mobile"),
    ("Activité-type 2", "Développer la partie back-end d'une application web ou web mobile sécurisée", "Mettre en place une base de données relationnelle"),
    ("Activité-type 2", "Développer la partie back-end d'une application web ou web mobile sécurisée", "Développer des composants d'accès aux données SQL et NoSQL"),
    ("Activité-type 2", "Développer la partie back-end d'une application web ou web mobile sécurisée", "Développer des composants métier côté serveur"),
]


def ensure_dirs() -> None:
    OUT_DOCX.parent.mkdir(parents=True, exist_ok=True)
    OUT_PDF.parent.mkdir(parents=True, exist_ok=True)


def pdf_header(c: canvas.Canvas, page_num: int) -> None:
    w, h = A4
    c.setStrokeColor(colors.HexColor("#8A8A8A"))
    c.setLineWidth(0.8)
    c.line(18 * mm, h - 22 * mm, w - 18 * mm, h - 22 * mm)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(18 * mm, h - 17 * mm, TITLE)
    c.setFont("Helvetica", 8)
    c.setFillColor(colors.HexColor("#555555"))
    c.drawString(18 * mm, 12 * mm, FOOTER)
    c.drawRightString(w - 18 * mm, 12 * mm, f"Page {page_num}/30")
    c.setFillColor(colors.black)


def draw_label(c: canvas.Canvas, x: float, y: float, label: str) -> None:
    c.setFont("Helvetica-Bold", 9)
    c.drawString(x, y, label)


def pdf_field(c: canvas.Canvas, name: str, x: float, y: float, width: float, height: float = 8 * mm, multiline: bool = False) -> None:
    c.acroForm.textfield(
        name=name,
        tooltip=name,
        x=x,
        y=y,
        width=width,
        height=height,
        borderColor=colors.HexColor("#A7A7A7"),
        fillColor=colors.white,
        textColor=colors.black,
        borderWidth=0.6,
        forceBorder=True,
        fieldFlags="multiline" if multiline else "",
        fontName="Helvetica",
        fontSize=9,
        maxlen=4000 if multiline else 120,
    )


def pdf_textarea(c: canvas.Canvas, name: str, y: float, height: float) -> None:
    pdf_field(c, name, 18 * mm, y, A4[0] - 36 * mm, height, multiline=True)


def build_pdf() -> None:
    c = canvas.Canvas(str(OUT_PDF), pagesize=A4)
    w, h = A4

    # Page 1
    pdf_header(c, 1)
    y = h - 38 * mm
    for label, name in [
        ("Nom de naissance", "nom_naissance"),
        ("Nom d'usage", "nom_usage"),
        ("Prénom", "prenom"),
        ("Adresse", "adresse"),
        ("Titre professionnel visé", "titre_professionnel"),
    ]:
        draw_label(c, 22 * mm, y, label)
        pdf_field(c, name, 72 * mm, y - 2 * mm, 115 * mm, 8 * mm)
        y -= 14 * mm
    draw_label(c, 22 * mm, y, "Modalité d'accès")
    c.acroForm.checkbox(name="parcours_formation", x=72 * mm, y=y - 1 * mm, size=4 * mm, borderWidth=0.5, buttonStyle="check")
    c.drawString(79 * mm, y, "Parcours de formation")
    c.acroForm.checkbox(name="vae", x=126 * mm, y=y - 1 * mm, size=4 * mm, borderWidth=0.5, buttonStyle="check")
    c.drawString(133 * mm, y, "Validation des Acquis de l'Expérience (VAE)")
    c.showPage()

    # Page 2
    pdf_header(c, 2)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(18 * mm, h - 38 * mm, "Presentation du dossier")
    c.setFont("Helvetica", 10)
    text = c.beginText(18 * mm, h - 50 * mm)
    text.setLeading(14)
    for line in [
        "Le dossier professionnel constitue un élément du système de validation du titre professionnel.",
        "Il appartient au candidat, qui le conserve, l'actualise durant son parcours et le présente à chaque session d'examen.",
        "Ce modèle vierge reprend la structure du DP et laisse des zones disponibles pour renseigner les exemples de pratique professionnelle.",
        "",
        "Consignes: complétez les champs, ajoutez vos preuves, puis adaptez les pages si votre référentiel de certification le demande.",
    ]:
        text.textLine(line)
    c.drawText(text)
    pdf_textarea(c, "notes_presentation", 38 * mm, 90 * mm)
    c.showPage()

    # Page 3
    pdf_header(c, 3)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(18 * mm, h - 38 * mm, "Informations et notes personnelles")
    c.setFont("Helvetica", 10)
    c.drawString(18 * mm, h - 50 * mm, "Lien officiel: http://travail-emploi.gouv.fr/titres-professionnels")
    pdf_textarea(c, "notes_generales", 28 * mm, 170 * mm)
    c.showPage()

    # Page 4
    pdf_header(c, 4)
    c.setFont("Helvetica-Bold", 14)
    c.drawString(18 * mm, h - 38 * mm, "Sommaire")
    y = h - 54 * mm
    for i, (_, activity, skill) in enumerate(EXAMPLES, start=1):
        c.setFont("Helvetica", 9)
        c.drawString(20 * mm, y, f"Exemple de pratique professionnelle n° {i} - {activity}")
        pdf_field(c, f"sommaire_page_{i}", 176 * mm, y - 2 * mm, 12 * mm, 7 * mm)
        y -= 8 * mm
        c.drawString(26 * mm, y, skill)
        y -= 11 * mm
    for label in ["Titres, diplomes, CQP, attestations", "Declaration sur l'honneur", "Documents illustrant la pratique professionnelle", "Annexes"]:
        c.drawString(20 * mm, y, label)
        pdf_field(c, f"sommaire_{label[:8].lower().replace(' ', '_')}", 176 * mm, y - 2 * mm, 12 * mm, 7 * mm)
        y -= 10 * mm
    c.showPage()

    # Page 5
    pdf_header(c, 5)
    c.setFont("Helvetica-Bold", 20)
    c.drawCentredString(w / 2, h / 2, "EXEMPLES DE PRATIQUE PROFESSIONNELLE")
    c.showPage()

    page = 6
    for idx, (atype, activity, skill) in enumerate(EXAMPLES, start=1):
        pdf_header(c, page)
        c.setFont("Helvetica-Bold", 11)
        c.drawString(18 * mm, h - 38 * mm, atype)
        c.setFont("Helvetica", 10)
        c.drawString(18 * mm, h - 46 * mm, activity)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(18 * mm, h - 58 * mm, f"Exemple n° {idx}")
        c.drawString(18 * mm, h - 68 * mm, f"> {skill}")
        c.drawString(18 * mm, h - 82 * mm, "1. Décrivez les tâches ou opérations effectuées, et dans quelles conditions")
        pdf_textarea(c, f"exemple_{idx}_taches", 24 * mm, 165 * mm)
        c.showPage()
        page += 1

        pdf_header(c, page)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(18 * mm, h - 38 * mm, f"Exemple n° {idx} - Suite")
        c.drawString(18 * mm, h - 50 * mm, "2. Précisez les moyens utilisés")
        pdf_textarea(c, f"exemple_{idx}_moyens", 106 * mm, 120 * mm)
        c.showPage()
        page += 1

        pdf_header(c, page)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(18 * mm, h - 38 * mm, f"Exemple n° {idx} - Suite")
        c.drawString(18 * mm, h - 50 * mm, "3. Avec qui avez-vous travaillé ?")
        pdf_textarea(c, f"exemple_{idx}_collaboration", 142 * mm, 84 * mm)
        c.drawString(18 * mm, 132 * mm, "4. Contexte")
        for label, name, yy in [
            ("Nom de l'entreprise, organisme ou association", "entreprise", 120 * mm),
            ("Chantier, atelier, service", "service", 106 * mm),
            ("Période d'exercice", "periode", 92 * mm),
        ]:
            draw_label(c, 22 * mm, yy + 3 * mm, label)
            pdf_field(c, f"exemple_{idx}_{name}", 88 * mm, yy, 100 * mm, 8 * mm)
        c.showPage()
        page += 1

        pdf_header(c, page)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(18 * mm, h - 38 * mm, f"Exemple n° {idx} - Suite")
        c.drawString(18 * mm, h - 50 * mm, "5. Informations complémentaires (facultatif)")
        pdf_textarea(c, f"exemple_{idx}_infos_complementaires", 24 * mm, 200 * mm)
        c.showPage()
        page += 1

    # Page 30
    pdf_header(c, 30)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(18 * mm, h - 38 * mm, "Titres, diplômes, CQP, attestations de formation (facultatif)")
    y = h - 52 * mm
    for i in range(1, 5):
        pdf_field(c, f"titre_{i}_intitule", 18 * mm, y, 70 * mm, 8 * mm)
        pdf_field(c, f"titre_{i}_organisme", 92 * mm, y, 58 * mm, 8 * mm)
        pdf_field(c, f"titre_{i}_date", 154 * mm, y, 34 * mm, 8 * mm)
        y -= 10 * mm
    c.setFont("Helvetica-Bold", 13)
    c.drawString(18 * mm, y - 6 * mm, "Déclaration sur l'honneur")
    c.setFont("Helvetica", 9)
    c.drawString(18 * mm, y - 16 * mm, "Je soussigné(e), déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts.")
    pdf_field(c, "declaration_nom", 18 * mm, y - 31 * mm, 70 * mm, 8 * mm)
    pdf_field(c, "declaration_lieu", 94 * mm, y - 31 * mm, 44 * mm, 8 * mm)
    pdf_field(c, "declaration_date", 144 * mm, y - 31 * mm, 44 * mm, 8 * mm)
    pdf_textarea(c, "documents_annexes", 22 * mm, 70 * mm)
    c.save()


def w_p(text: str = "", style: str | None = None, page_break: bool = False) -> str:
    ppr = f"<w:pPr><w:pStyle w:val=\"{style}\"/></w:pPr>" if style else ""
    runs = ""
    if page_break:
        runs += "<w:r><w:br w:type=\"page\"/></w:r>"
    if text:
        runs += f"<w:r><w:t xml:space=\"preserve\">{escape(text)}</w:t></w:r>"
    return f"<w:p>{ppr}{runs}</w:p>"


def w_field(label: str) -> str:
    return w_p(f"{label} : ______________________________________________________________")


def blank_lines(count: int) -> list[str]:
    return [w_p("________________________________________________________________________________") for _ in range(count)]


def build_docx() -> None:
    pages: list[list[str]] = []
    pages.append([
        w_p(TITLE, "Title"),
        w_field("Nom de naissance"),
        w_field("Nom d'usage"),
        w_field("Prénom"),
        w_field("Adresse"),
        w_field("Titre professionnel visé"),
        w_p("Modalité d'accès : [ ] Parcours de formation     [ ] Validation des Acquis de l'Expérience (VAE)"),
    ])
    pages.append([
        w_p(TITLE, "HeaderLine"),
        w_p("Presentation du dossier", "Heading1"),
        w_p("Le dossier professionnel constitue un élément du système de validation du titre professionnel."),
        w_p("Il appartient au candidat, qui le conserve, l'actualise durant son parcours et le présente à chaque session d'examen."),
        w_p("Notes :"),
        *blank_lines(16),
    ])
    pages.append([
        w_p(TITLE, "HeaderLine"),
        w_p("Informations et notes personnelles", "Heading1"),
        w_p("Lien officiel : http://travail-emploi.gouv.fr/titres-professionnels"),
        *blank_lines(19),
    ])
    pages.append([
        w_p(TITLE, "HeaderLine"),
        w_p("Sommaire", "Heading1"),
        *[w_p(f"Exemple de pratique professionnelle n° {i} - {skill} ................ p. ____") for i, (_, _, skill) in enumerate(EXAMPLES, 1)],
        w_p("Titres, diplômes, CQP, attestations de formation (facultatif) .......... p. ____"),
        w_p("Déclaration sur l'honneur .............................................. p. ____"),
        w_p("Documents illustrant la pratique professionnelle (facultatif) .......... p. ____"),
        w_p("Annexes ................................................................ p. ____"),
    ])
    pages.append([
        w_p(TITLE, "HeaderLine"),
        w_p("EXEMPLES DE PRATIQUE PROFESSIONNELLE", "BigCenter"),
    ])

    for idx, (atype, activity, skill) in enumerate(EXAMPLES, 1):
        pages.append([
            w_p(TITLE, "HeaderLine"),
            w_p(atype, "Heading1"),
            w_p(activity, "Heading2"),
            w_p(f"Exemple n° {idx}", "Heading2"),
            w_p(f"> {skill}", "Heading3"),
            w_p("1. Décrivez les tâches ou opérations que vous avez effectuées, et dans quelles conditions :", "Heading3"),
            *blank_lines(14),
        ])
        pages.append([
            w_p(TITLE, "HeaderLine"),
            w_p(f"Exemple n° {idx} - Suite", "Heading2"),
            w_p("2. Précisez les moyens utilisés :", "Heading3"),
            *blank_lines(18),
        ])
        pages.append([
            w_p(TITLE, "HeaderLine"),
            w_p(f"Exemple n° {idx} - Suite", "Heading2"),
            w_p("3. Avec qui avez-vous travaillé ?", "Heading3"),
            *blank_lines(8),
            w_p("4. Contexte", "Heading3"),
            w_field("Nom de l'entreprise, organisme ou association"),
            w_field("Chantier, atelier, service"),
            w_field("Période d'exercice"),
        ])
        pages.append([
            w_p(TITLE, "HeaderLine"),
            w_p(f"Exemple n° {idx} - Suite", "Heading2"),
            w_p("5. Informations complémentaires (facultatif)", "Heading3"),
            *blank_lines(18),
        ])

    pages.append([
        w_p(TITLE, "HeaderLine"),
        w_p("Titres, diplômes, CQP, attestations de formation (facultatif)", "Heading1"),
        w_p("Intitulé | Autorité ou organisme | Date"),
        *blank_lines(5),
        w_p("Déclaration sur l'honneur", "Heading1"),
        w_p("Je soussigné(e) ______________________________ déclare sur l'honneur que les renseignements fournis dans ce dossier sont exacts."),
        w_p("Fait a ____________________ le ____________________ Signature : ____________________"),
        w_p("Documents illustrant la pratique professionnelle / Annexes", "Heading1"),
        *blank_lines(7),
    ])

    body_parts: list[str] = []
    for page_index, page in enumerate(pages, 1):
        body_parts.extend(page)
        body_parts.append(w_p(f"{FOOTER} - Page {page_index}/30", "FooterLine"))
        if page_index != len(pages):
            body_parts.append(w_p(page_break=True))

    document_xml = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    {''.join(body_parts)}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134" w:header="708" w:footer="708" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>"""

    styles_xml = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr><w:pPr><w:spacing w:after="100" w:line="276" w:lineRule="auto"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="34"/><w:color w:val="1F4D78"/></w:rPr><w:pPr><w:spacing w:after="240"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="28"/><w:color w:val="2E74B5"/></w:rPr><w:pPr><w:spacing w:before="200" w:after="120"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="24"/><w:color w:val="1F4D78"/></w:rPr><w:pPr><w:spacing w:before="120" w:after="80"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:rPr><w:b/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/></w:rPr><w:pPr><w:spacing w:before="80" w:after="80"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="HeaderLine"><w:name w:val="Header Line"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="666666"/></w:rPr><w:pPr><w:spacing w:after="160"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="FooterLine"><w:name w:val="Footer Line"/><w:rPr><w:sz w:val="16"/><w:color w:val="666666"/></w:rPr><w:pPr><w:jc w:val="right"/><w:spacing w:before="160" w:after="0"/></w:pPr></w:style>
  <w:style w:type="paragraph" w:styleId="BigCenter"><w:name w:val="Big Center"/><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="1F4D78"/></w:rPr><w:pPr><w:jc w:val="center"/><w:spacing w:before="1800"/></w:pPr></w:style>
</w:styles>"""

    content_types = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>
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
</Relationships>"""
    core = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:title>DP JPMTP modele vierge 30 pages</dc:title>
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
        z.writestr("word/styles.xml", styles_xml)
        z.writestr("docProps/core.xml", core)
        z.writestr("docProps/app.xml", app)


def main() -> None:
    ensure_dirs()
    build_docx()
    build_pdf()
    print(OUT_DOCX)
    print(OUT_PDF)


if __name__ == "__main__":
    main()
