from pathlib import Path

from reportlab import rl_config
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path('/workspace/scratch/491cfa754b55/repo')
OUTPUT = ROOT / 'web/documents/organisation-change-anonymized-2026-07-13.pdf'

rl_config.invariant = 1

NAVY = colors.HexColor('#17324D')
BLUE = colors.HexColor('#176B87')
PALE = colors.HexColor('#EAF4F7')
AMBER = colors.HexColor('#FFF4DE')
GRAY = colors.HexColor('#5B6670')
LINE = colors.HexColor('#D9E0E6')


pdfmetrics.registerFont(TTFont('DejaVu', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DejaVu-Bold', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))


class ExtractDocTemplate(BaseDocTemplate):
    def __init__(self, filename):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=22 * mm,
            rightMargin=22 * mm,
            topMargin=19 * mm,
            bottomMargin=18 * mm,
            title='AI Advocate for the Poor - anonymized evidentiary extract',
            author='AI Advocate for the Poor',
            subject='Privacy-preserving extract from a Czech public-register court order',
        )
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id='body')
        self.addPageTemplates(PageTemplate(id='extract', frames=[frame], onPage=self.draw_page))

    def draw_page(self, canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(BLUE)
        canvas.setLineWidth(1.4)
        canvas.line(doc.leftMargin, A4[1] - 13 * mm, A4[0] - doc.rightMargin, A4[1] - 13 * mm)
        canvas.setFont('DejaVu', 8)
        canvas.setFillColor(GRAY)
        canvas.drawString(doc.leftMargin, 9 * mm, 'AI Advocate for the Poor - privacy-preserving public derivative')
        canvas.drawRightString(A4[0] - doc.rightMargin, 9 * mm, str(doc.page))
        canvas.restoreState()


styles = getSampleStyleSheet()
title = ParagraphStyle(
    'ExtractTitle', parent=styles['Title'], fontName='DejaVu-Bold', fontSize=20,
    leading=24, textColor=NAVY, alignment=TA_CENTER, spaceAfter=5 * mm,
)
subtitle = ParagraphStyle(
    'ExtractSubtitle', parent=styles['Heading2'], fontName='DejaVu-Bold', fontSize=12,
    leading=15, textColor=BLUE, alignment=TA_CENTER, spaceAfter=6 * mm,
)
heading = ParagraphStyle(
    'ExtractHeading', parent=styles['Heading2'], fontName='DejaVu-Bold', fontSize=12,
    leading=15, textColor=NAVY, spaceBefore=4 * mm, spaceAfter=2.5 * mm,
)
body = ParagraphStyle(
    'ExtractBody', parent=styles['BodyText'], fontName='DejaVu', fontSize=9.4,
    leading=13.1, textColor=NAVY, alignment=TA_LEFT, spaceAfter=2.5 * mm,
)
small = ParagraphStyle(
    'ExtractSmall', parent=body, fontSize=8.2, leading=11.2, textColor=GRAY,
)
label = ParagraphStyle(
    'ExtractLabel', parent=body, fontName='DejaVu-Bold', fontSize=8.8, leading=12,
)


def note(text_value, fill=PALE):
    table = Table([[Paragraph(text_value, body)]], colWidths=[166 * mm])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), fill),
        ('BOX', (0, 0), (-1, -1), 0.7, LINE),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return table


def facts_table(rows):
    data = [[Paragraph(a, label), Paragraph(b, body)] for a, b in rows]
    table = Table(data, colWidths=[43 * mm, 123 * mm], repeatRows=0)
    table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('GRID', (0, 0), (-1, -1), 0.6, LINE),
        ('BACKGROUND', (0, 0), (0, -1), PALE),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    return table


def add_language(story, lang):
    if lang == 'cs':
        story.extend([
            Paragraph('ANONYMIZOVANÝ DŮKAZNÍ VÝTAH', title),
            Paragraph('Změna zastupující osoby při výkonu funkce v dozorčí radě', subtitle),
            note(
                '<b>Zdroj:</b> usnesení Krajského soudu v Ostravě - pobočky v Olomouci ze dne '
                '13. července 2026 o návrhu na zápis změny do spolkového rejstříku. Úplný originál '
                'zůstává v soukromém archivu. Tento veřejný výtah není úřední kopií.'
            ),
            Paragraph('Úřední obsah ponechaný pro veřejné ověření', heading),
            facts_table([
                ('Navrhovatel', 'Cannabis is The Cure, z.s.'),
                ('Vymazává se', 'Dozorčí rada - při výkonu funkce zastupuje Ing. FRANTIŠEK DVOŘÁK.'),
                ('Zapisuje se', 'Dozorčí rada - při výkonu funkce zastupuje Bc. PATRICIA JANEKOVÁ.'),
                ('Účinnost zápisu', '„Den zápisu změny: Dnem nabytí právní moci.“'),
                ('Datum listiny', '„Olomouc 13. července 2026.“'),
            ]),
            Paragraph('Samostatný archivní údaj autora', heading),
            note(
                'Autor archivu uvádí, že na Konferenci členů dne 21. března 2026 odstoupil '
                'z funkce nyní devadesátiletý ekonom Ing. František Dvořák a byla zvolena '
                'slovenská novinářka Bc. Patricia Janeková. <b>Tento údaj není sám doložen '
                'přiloženým usnesením; k ověření je zapotřebí zápis z Konference členů.</b>',
                AMBER,
            ),
            Paragraph('Co listina sama nedokládá', heading),
            Paragraph(
                'Usnesení datované 13. července 2026 neurčuje samo o sobě, že změna byla téhož dne '
                'pravomocně zapsána. Výslovně váže den zápisu na nabytí právní moci. Přesný účinný '
                'den je proto nutné ověřit doložkou právní moci nebo aktuálním úplným výpisem.', body,
            ),
            Paragraph(
                'Listina také nedokládá, že Bc. Patricia Janeková obecně zastupuje alianci navenek. '
                'Popisuje zastupování při výkonu funkce v dozorčí radě; obecné jednání navenek je '
                'v usnesení spojeno se správní radou.', body,
            ),
            Paragraph('Rozsah odstranění osobních údajů', heading),
            Paragraph(
                'Nevratně byly vypuštěny datum narození, rodné číslo, bydliště, adresy, podpisové '
                'údaje, jména soudních zaměstnanců a identifikátory či adresy dalších subjektů, které '
                'nejsou nutné pro posouzení změny. Zachována jsou pouze dvě jména, profesní označení '
                'sdělená autorem, název aliance, dotčená funkce a rozhodná data.', small,
            ),
        ])
    else:
        story.extend([
            Paragraph('ANONYMISED EVIDENTIARY EXTRACT', title),
            Paragraph('Change of the representative acting in a supervisory-board function', subtitle),
            note(
                '<b>Source:</b> an order of the Regional Court in Ostrava, Olomouc branch, dated '
                '13 July 2026 concerning an application to record a change in the associations '
                'register. The complete original remains in the private archive. This public '
                'extract is not an official copy.'
            ),
            Paragraph('Official content retained for public verification', heading),
            facts_table([
                ('Applicant', 'Cannabis is The Cure, z.s.'),
                ('Removed', 'Supervisory board - represented in the performance of the function by Ing. FRANTIŠEK DVOŘÁK.'),
                ('Entered', 'Supervisory board - represented in the performance of the function by Bc. PATRICIA JANEKOVÁ.'),
                ('Effective entry', '“Date of recording the change: on the date the order becomes final.”'),
                ('Document date', '“Olomouc, 13 July 2026.”'),
            ]),
            Paragraph('Separate archive-owner statement', heading),
            note(
                'The archive owner states that, at the Members Conference on 21 March 2026, '
                'the now 90-year-old economist Ing. František Dvořák resigned and Slovak journalist '
                'Bc. Patricia Janeková was elected. <b>The attached order does not itself prove this '
                'statement; the conference minutes are required for verification.</b>',
                AMBER,
            ),
            Paragraph('What the document does not prove', heading),
            Paragraph(
                'The order dated 13 July 2026 does not by itself establish that the change became '
                'final and was recorded on that same date. It expressly ties the recording date to '
                'finality. The effective date therefore requires a finality endorsement or a current '
                'complete register extract.', body,
            ),
            Paragraph(
                'It also does not establish that Bc. Patricia Janeková generally represents the '
                'alliance externally. It records representation in the performance of a supervisory-'
                'board function; the order links general external representation to the management board.', body,
            ),
            Paragraph('Personal-data removal', heading),
            Paragraph(
                'Dates of birth, national identification numbers, home addresses, other addresses, '
                'signatures, court-staff names, and identifiers or addresses of other entities that '
                'are unnecessary to assess the change were irreversibly omitted. Only two names, '
                'the professional descriptions supplied by the archive owner, the alliance name, '
                'the relevant function, and the material dates remain.', small,
            ),
        ])


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    story = []
    add_language(story, 'cs')
    story.append(PageBreak())
    add_language(story, 'en')
    doc = ExtractDocTemplate(str(OUTPUT))
    doc.build(story)
    print(OUTPUT)


if __name__ == '__main__':
    build()
