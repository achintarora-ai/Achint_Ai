from pathlib import Path
import json, re, shutil
from xml.sax.saxutils import escape
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output/pdf'
OUT.mkdir(parents=True, exist_ok=True)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Name', fontName='Helvetica-Bold', fontSize=24, leading=28, spaceAfter=8))
styles.add(ParagraphStyle(name='Role', fontName='Helvetica', fontSize=11, leading=15, spaceAfter=6))
styles.add(ParagraphStyle(name='Section', fontName='Helvetica-Bold', fontSize=10, leading=14, spaceBefore=14, spaceAfter=7, keepWithNext=True, textColor=colors.HexColor('#333333')))
styles.add(ParagraphStyle(name='Copy', fontName='Helvetica', fontSize=9.5, leading=12.5, spaceAfter=5))
styles.add(ParagraphStyle(name='BulletCopy', parent=styles['Copy'], leftIndent=10, firstLineIndent=-8))
styles.add(ParagraphStyle(name='SmallCopy', fontName='Helvetica', fontSize=8, leading=11, spaceAfter=5, textColor=colors.HexColor('#555555')))
def p(text, style='Copy'): return Paragraph(text, styles[style])
def b(text): return p('- ' + text, 'BulletCopy')
def section(title): return p(title.upper(), 'Section')
def footer(canvas, doc):
    canvas.setStrokeColor(colors.HexColor('#cccccc')); canvas.line(42, 36, 570, 36)
    canvas.setFont('Helvetica',7); canvas.setFillColor(colors.HexColor('#666666'))
    canvas.drawString(42,25,'ACHINT PAL SINGH  /  AI ENGINEERING')
    canvas.drawRightString(570,25,str(doc.page))
def build(path, story):
    SimpleDocTemplate(str(path),pagesize=letter,rightMargin=42,leftMargin=42,topMargin=38,bottomMargin=48,title=path.stem.replace('-',' ').title(),author='Achint Pal Singh').build(story,onFirstPage=footer,onLaterPages=footer)

resume = [p('ACHINT PAL SINGH','Name'),p('AI ENGINEER  |  RETRIEVAL, AGENTS &amp; CLOUD SYSTEMS','Role'),
 p('Toronto, ON  |  365-440-4319  |  achintpalsingh94@gmail.com','SmallCopy'),
 p('<link href="https://github.com/achintarora-ai">GitHub: achintarora-ai</link>  |  <link href="https://www.linkedin.com/in/achint-pal-singh-1a0114288/">LinkedIn</link>  |  <link href="https://achintarora-ai.github.io/Achint_Ai">Portfolio</link>  |  <link href="https://legid.ca">legid.ca</link>','SmallCopy'),
 section('Profile'),p('AI engineer and Computer Science graduate building production AI applications, multimodal document pipelines, retrieval-augmented generation, and agent workflows. Hands-on ownership of Python/FastAPI services, model integration, evaluation, and GCP/Azure deployments. Focused on grounded answers, controlled execution, and reliable software delivery.'),
 section('Core capabilities'),
 p('<b>AI &amp; retrieval:</b> RAG, FAISS, SentenceTransformers, CLIP, Tesseract OCR, LangChain, tool calling, model routing, session memory.'),
 p('<b>Backend &amp; data:</b> Python, FastAPI, Flask, SQL, PostgreSQL, MySQL, asynchronous REST APIs, Pandas, NumPy.'),
 p('<b>ML &amp; operations:</b> TensorFlow, scikit-learn, Docker, Terraform, GitHub Actions, pytest, GCP Cloud Run, IAM, Azure AI Search, Azure AI Foundry, monitoring.'),
 section('Professional experience'),
 p('<b>Predictive Tech Labs | AI Systems Engineer</b><br/>Toronto, ON | July 2026 - Present'),
 b('Own backend and AI-platform engineering for WeKnowRights, building Python/FastAPI services, jurisdiction-aware RAG, semantic search, cited responses, and client-to-lawyer workflows.'),
 b('Engineer agent workflows with multi-provider model routing, tool calling, session memory, approval steps, and guarded execution.'),
 b('Build retrieval pipelines with FAISS, embeddings, metadata filtering, hybrid search, and grounding; evaluate quality, latency, cost, and reliability.'),
 b('Developed a two-tower recommendation architecture separating user and item representations for candidate retrieval.'),
 b('Deploy across GCP and Azure with Docker, Terraform, GitHub Actions, IAM, secrets management, structured logging, and repeatable releases.'),
 Spacer(1,5),p('<b>Predictive Tech Labs | AI Engineer Intern</b><br/>Toronto, ON | November 2025 - April 2026'),
 b('Built multimodal pipelines for PDF, DOCX, Excel, and images with Tesseract OCR, CLIP, SentenceTransformers, OpenAI embeddings, and FAISS.'),
 b('Created a generation and audit pipeline for six Ontario real-estate document types, combining curated templates, 54+ deterministic checks, and LLM semantic review.'),
 b('Reduced repetitive drafting by approximately four hours per closing workflow; achieved sub-100 ms latency in the deterministic audit layer.'),
 b('Implemented persistent conversation, case, and project memory with cross-user isolation and pytest end-to-end validation.'),
 b('Built and deployed a finance assistant using Azure AI Foundry, AI Search, Blob Storage, and App Service; validated pipelines through Azure DevOps.'),
 PageBreak(),p('ACHINT PAL SINGH','Name'),p('SELECTED WORK &amp; ADDITIONAL EXPERIENCE','Role'),
 section('Selected projects'),
 p('<b>WeKnowRights | Production legal AI platform</b>'),b('Integrated OCR, embeddings, FAISS retrieval, RAG Q&amp;A, document generation, persistent memory, and lawyer-intake workflows behind asynchronous APIs.'),b('Evaluated model-routing trade-offs across cost, quality, latency, security, and reliability.'),
 p('<b>Vector Search Benchmarking | Applied retrieval research</b>'),b('Benchmarked four open-source embedding models for retrieval quality and inference latency; documented practical model and vector-search trade-offs.'),b('Authored technical articles on vector search, RAG evaluation, tokenization, LLM economics, and AI-system design.'),
 p('<b>Machine Learning &amp; Mathematical Modeling</b>'),b('Built classification, regression, clustering, NLP, time-series, and deep-learning models using TensorFlow, scikit-learn, Pandas, and NumPy.'),b('Applied normalization, exploratory analysis, feature engineering, tuning, train/test validation, and comparative reporting.'),
 p('<b>Personal Finance Management System</b>'),b('Built a full-stack application for transaction categorization, budgets, financial goals, and reporting; owned backend, database, interface, and deployment.'),
 section('Additional experience'),
 p('<b>Freelance | Full-Stack Developer &amp; Data Analytics Consultant</b><br/>Toronto / Remote | August 2023 - Present'),b('Deliver small-business software and analytics from requirements and architecture through testing and deployment.'),b('Build web applications, RAG chatbots, and reporting workflows using Python, SQL, Power BI, and Tableau.'),
 p('<b>Sudan Movers | Dispatcher &amp; AI Solutions Contributor</b><br/>Canada | Part-time during studies'),b('Developed AI-assisted contract processing and coordination briefs from operational data.'),b('Used Python and Power BI for analytics, reporting, data quality, and fraud-detection experimentation.'),
 section('Education'),p('<b>Algoma University | B.Sc. Computer Science</b><br/>September 2023 - April 2026'),p('Coursework: machine learning, AI, deep learning, NLP, time-series analysis, databases, cloud computing, data structures and algorithms, Java, and agentic AI patterns.'),
 section('Additional tools'),p('Java, JavaScript, Bash, PowerShell, Kubernetes, Cloud Build, Azure DevOps, BigQuery, Firestore, Azure Databricks, Power BI, and Tableau.')]
resume_path = OUT / 'achint-pal-singh-resume.pdf'
build(resume_path,resume)
shutil.copy2(resume_path,ROOT/'public/resume/achint-pal-singh-resume.pdf')

data=json.loads((ROOT/'scripts/research-paper.json').read_text(encoding='utf-8'))
story=[p(data['title'],'Name'),p('Achint Pal Singh | Independent Technical Study | September 2026','SmallCopy')]
def inline(text):
    text=escape(text).replace('—','-').replace('–','-').replace('“','&quot;').replace('”','&quot;')
    text=re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)',r'<link href="\2" color="#333333">\1</link>',text)
    return re.sub(r'\*\*(.*?)\*\*',r'<b>\1</b>',text)
markdown=re.sub(r'(?m)^(## [^\n]+)\n',r'\1\n\n',data['excerptMarkdown'])
for block in markdown.split('\n\n'):
    if block.startswith('## '): story.append(section(block[3:]))
    elif block.startswith('|'):
        rows=[[p(inline(c.strip()),'SmallCopy') for c in line.strip('|').split('|')] for line in block.splitlines() if not re.match(r'^\|[ -]+\|',line)]
        table=Table(rows,colWidths=[70,145,313],repeatRows=1)
        table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#eeeeee')),('GRID',(0,0),(-1,-1),.4,colors.HexColor('#cccccc')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7)]))
        story.extend([table,Spacer(1,10)])
    else: story.append(p(inline(block).replace('\n','<br/>')))
paper_path=OUT/'rag-evaluation-protocol.pdf'
build(paper_path,story)
shutil.copy2(paper_path,ROOT/'public/research/rag-evaluation-protocol.pdf')

import subprocess
from pypdf import PdfReader
qa=ROOT/'tmp/pdfs';qa.mkdir(parents=True,exist_ok=True)
for path in [resume_path,paper_path]:
    print(path.name, 'pages:',len(PdfReader(path).pages))
    subprocess.run(['pdftoppm', '-scale-to', '1100', '-png', str(path), str(qa/path.stem)],check=True)
