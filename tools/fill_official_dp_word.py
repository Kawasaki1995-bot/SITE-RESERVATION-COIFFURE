from __future__ import annotations

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

from generate_dp_cutandgo_filled_docx import (
    FOOTER,
    NS_W,
    SOURCE_MD,
    normalize_text,
    numbering_xml,
    paragraph,
    parse_markdown,
    styles_xml,
)


ROOT = Path(__file__).resolve().parents[1]
TEMPLATE_DOCX = ROOT / "output" / "docx" / "1-dossier_professionnel_version_traitement_de_texte.docx"
OUT_DOCX = ROOT / "output" / "docx" / "1-dossier_professionnel_CutAndGo_rempli.docx"


def build_document_xml() -> str:
    md = SOURCE_MD.read_text(encoding="utf-8")
    body_parts = [
        paragraph("DOSSIER PROFESSIONNEL (DP)", "Title"),
        paragraph("Cut&Go - Application web de réservation de rendez-vous pour salons de coiffure", "Subtitle"),
        paragraph("Titre professionnel visé : Développeur web et web mobile", "Subtitle"),
        paragraph("Document rempli à partir du modèle officiel de traitement de texte", "Subtitle"),
        paragraph(page_break=True),
    ]
    body_parts.extend(parse_markdown(md))
    body_parts.append(paragraph(normalize_text(FOOTER), "FooterLine"))

    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="{NS_W}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    {''.join(body_parts)}
    <w:sectPr>
      <w:headerReference w:type="default" r:id="rId9"/>
      <w:footerReference w:type="default" r:id="rId10"/>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1417" w:right="1417" w:bottom="1417" w:left="1417" w:header="567" w:footer="510" w:gutter="0"/>
      <w:cols w:space="708"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>
  </w:body>
</w:document>"""


def copy_template_with_replaced_document() -> None:
    OUT_DOCX.parent.mkdir(parents=True, exist_ok=True)
    new_document = build_document_xml().encode("utf-8")

    with ZipFile(TEMPLATE_DOCX, "r") as src, ZipFile(OUT_DOCX, "w", ZIP_DEFLATED) as dst:
        for item in src.infolist():
            if item.filename == "word/document.xml":
                dst.writestr(item, new_document)
            elif item.filename == "word/styles.xml":
                dst.writestr(item, styles_xml().encode("utf-8"))
            elif item.filename == "word/numbering.xml":
                dst.writestr(item, numbering_xml().encode("utf-8"))
            else:
                dst.writestr(item, src.read(item.filename))

    print(OUT_DOCX)


if __name__ == "__main__":
    copy_template_with_replaced_document()
