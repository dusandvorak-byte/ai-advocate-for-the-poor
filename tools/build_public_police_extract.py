#!/usr/bin/env python3
"""Build the reviewed public derivative of the 20 July 2026 police notice."""

from pathlib import Path

import fitz


ROOT = Path(__file__).resolve().parents[1]
SOURCE = (
    ROOT.parent
    / "upload"
    / "01-Krajsk-editelstv-policie-OK-dne-20.7.2026-p-ed-alobn-v-zvu-NSZ-ze-dne-14.-7.2026-odkl-d-me-do-ko-e.pdf"
)
OUTPUT = ROOT / "web" / "documents" / "police-notice-public-derivative-2026-07-20.pdf"
FONT_REGULAR = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf")
FONT_BOLD = Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")


def redact_matches(page: fitz.Page, text: str, padding: float = 1.5) -> None:
    matches = page.search_for(text)
    if not matches:
        raise RuntimeError(f"Expected text not found: {text}")
    for match in matches:
        page.add_redact_annot(match + (-padding, -padding, padding, padding), fill=(1, 1, 1))


def build() -> None:
    for font in (FONT_REGULAR, FONT_BOLD):
        if not font.exists():
            raise RuntimeError(f"Required font not found: {font}")

    document = fitz.open(SOURCE)
    if document.page_count != 1:
        raise RuntimeError("The reviewed source must contain exactly one page")

    page = document[0]
    redact_matches(page, "JID: PCR14ETRfo55001102")
    redact_matches(page, "70.5790.55001102")

    # The address shares a text block with the addressee name. Redact that
    # complete block and then restore only the archive owner's public name.
    page.add_redact_annot(fitz.Rect(55, 176, 205, 221), fill=(1, 1, 1))

    # Remove the public official's name while retaining the official role.
    page.add_redact_annot(fitz.Rect(351, 426, 466, 444), fill=(1, 1, 1))

    # Remove the embedded signature panel and signing time.
    page.add_redact_annot(fitz.Rect(52, 764, 175, 801), fill=(1, 1, 1))
    page.apply_redactions(images=fitz.PDF_REDACT_IMAGE_NONE)

    page.insert_text(
        fitz.Point(58.6, 191.3),
        "Dušan DVOŘÁK",
        fontsize=10.98,
        fontname="DejaVuSansBold",
        fontfile=str(FONT_BOLD),
        color=(0, 0, 0),
    )
    page.insert_text(
        fitz.Point(354, 439),
        "jméno úřední osoby nezveřejněno",
        fontsize=6.4,
        fontname="DejaVuSans",
        fontfile=str(FONT_REGULAR),
        color=(0.35, 0.35, 0.35),
    )
    page.insert_text(
        fitz.Point(346.4, 454),
        "zástupce ředitele odboru",
        fontsize=10.98,
        fontname="DejaVuSans",
        fontfile=str(FONT_REGULAR),
        color=(0, 0, 0),
    )
    page.insert_textbox(
        fitz.Rect(56, 726, 520, 757),
        "VEŘEJNÁ ODVOZENÁ KOPIE - zachováno jméno adresáta; "
        "odstraněna adresa, jméno podepisující úřední osoby a podpisová data.",
        fontsize=7.5,
        fontname="DejaVuSans",
        fontfile=str(FONT_REGULAR),
        color=(0.25, 0.25, 0.25),
    )

    document.set_metadata(
        {
            "title": "Police notice dated 20 July 2026 — reviewed public derivative",
            "author": "AI Advocate for the Poor",
            "subject": "Privacy-preserving derivative; not an official copy",
            "keywords": "post-submission test, source-bounded public extract",
            "creator": "AI Advocate for the Poor",
            "producer": "PyMuPDF",
            "creationDate": "D:20260720000000+02'00'",
            "modDate": "D:20260720000000+02'00'",
        }
    )
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    if OUTPUT.exists():
        OUTPUT.unlink()
    document.save(OUTPUT, garbage=4, deflate=True, clean=True, no_new_id=True)
    document.close()


if __name__ == "__main__":
    build()
