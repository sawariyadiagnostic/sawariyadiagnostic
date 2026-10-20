import os
import re
import csv
import json
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

ROOT = r"c:\Users\Dell\Desktop\python\website-github-sync"
PUBLISHED_CATALOG_PATH = os.path.join(ROOT, "src", "data", "publishedCatalog.ts")
PANELS_MANIFEST_PATH = os.path.join(ROOT, "src", "data", "clinicalPanelManifest.ts")
CSV_REGISTER_PATH = os.path.join(ROOT, "catalog-workspace", "raw-inventory", "individual-tests-register.csv")
B2B_PDF_PATH = r"C:\Users\Dell\Desktop\python\lab official documentation data and official documents\folder for files of lab\internal\QMS_06_External_Origin_Docs\Raw_Dropzone\Diagnostic Rate List Extraction with b2b rates  - Google Sheets.pdf"
OUT_PATH_1 = os.path.join(ROOT, "catalog-workspace", "Sawariya_Diagnostic_Test_Rates_and_Discounts_Charkhi_Dadri.xlsx")
OUT_PATH_2 = r"C:\Users\Dell\.gemini\antigravity\brain\1e8f5101-c3a4-4ce6-993a-7f60beea85df\Sawariya_Diagnostic_Test_Rates_and_Discounts_Charkhi_Dadri.xlsx"

# 1. Parse publishedCatalog.ts
tests = []
with open(PUBLISHED_CATALOG_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Match each object { ... } in medicalTests
test_blocks = re.findall(r"\{\s*id:\s*[\"'](web-\d+)[\"'],\s*name:\s*[\"']([^\"']+)[\"'],.*?price:\s*(\d+),.*?category:\s*[\"']([^\"']+)[\"'].*?originalPrice:\s*(\d+)", content, re.DOTALL)
for m in test_blocks:
    tests.append({
        "id": m[0],
        "name": m[1],
        "price": int(m[2]),
        "category": m[3],
        "originalPrice": int(m[4]),
    })

# If originalPrice is absent in some regex captures, parse block by block
if len(tests) < 70:
    tests = []
    # Split by { id:
    raw_blocks = content.split("id:")[1:]
    for b in raw_blocks:
        id_match = re.search(r"^\s*[\"'](web-\d+)[\"']", b)
        if not id_match:
            continue
        test_id = id_match.group(1)
        name_match = re.search(r"name:\s*[\"']([^\"']+)[\"']", b)
        price_match = re.search(r"price:\s*(\d+)", b)
        cat_match = re.search(r"category:\s*[\"']([^\"']+)[\"']", b)
        orig_match = re.search(r"originalPrice:\s*(\d+)", b)
        
        name = name_match.group(1) if name_match else "Unknown"
        price = int(price_match.group(1)) if price_match else 0
        cat = cat_match.group(1) if cat_match else "specialized"
        orig = int(orig_match.group(1)) if orig_match else price
        
        tests.append({
            "id": test_id,
            "name": name,
            "price": price,
            "category": cat,
            "originalPrice": orig
        })

# 2. Parse B2B PDF
b2b_items = []
try:
    import fitz
    doc = fitz.open(B2B_PDF_PATH)
    for page in doc:
        text = page.get_text()
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        i = 0
        while i < len(lines):
            line = lines[i]
            if line.isdigit() and i + 2 < len(lines):
                s_no = int(line)
                name = lines[i+1]
                next_val = lines[i+2]
                
                # Check for wrap
                if next_val.isdigit():
                    mrp = int(next_val)
                    net = int(lines[i+3]) if i + 3 < len(lines) and lines[i+3].isdigit() else 0
                    b2b_items.append({"s_no": s_no, "name": name, "mrp": mrp, "net": net})
                    i += 4 if (i + 3 < len(lines) and lines[i+3].isdigit()) else 3
                else:
                    # Name was wrapped
                    name = f"{name} {next_val}"
                    if i + 3 < len(lines) and lines[i+3].isdigit():
                        mrp = int(lines[i+3])
                        net = int(lines[i+4]) if i + 4 < len(lines) and lines[i+4].isdigit() else 0
                        b2b_items.append({"s_no": s_no, "name": name, "mrp": mrp, "net": net})
                        i += 5 if (i + 4 < len(lines) and lines[i+4].isdigit()) else 4
                    else:
                        i += 1
            else:
                i += 1
except Exception as e:
    print(f"Error parsing B2B PDF: {e}")

# 3. Parse Panels
panels = []
with open(PANELS_MANIFEST_PATH, "r", encoding="utf-8") as f:
    p_content = f.read()

raw_panel_blocks = p_content.split("id:")[1:]
for b in raw_panel_blocks:
    id_m = re.search(r"^\s*[\"'](panel-[^\"']+)[\"']", b)
    if not id_m:
        continue
    panel_id = id_m.group(1)
    name_m = re.search(r"name:\s*[\"']([^\"']+)[\"']", b)
    dept_m = re.search(r"department:\s*[\"']([^\"']+)[\"']", b)
    price_m = re.search(r"transparentPrice:\s*(\d+)", b)
    tat_m = re.search(r"turnaroundEstimate:\s*[\"']([^\"']+)[\"']", b)
    params_m = re.search(r"parameters:\s*\[(.*?)\]", b, re.DOTALL)
    
    p_count = 0
    if params_m:
        p_count = len(re.findall(r"[\"']([^\"']+)[\"']", params_m.group(1)))
        
    panels.append({
        "id": panel_id,
        "name": name_m.group(1) if name_m else "Panel",
        "department": dept_m.group(1) if dept_m else "Pathology",
        "price": int(price_m.group(1)) if price_m else 0,
        "turnaround": tat_m.group(1) if tat_m else "2-6 Hours",
        "param_count": p_count
    })

print(f"Parsed {len(tests)} published tests, {len(b2b_items)} B2B items, {len(panels)} panels.")

# Create Workbook
wb = openpyxl.Workbook()

# Style definitions
font_title = Font(name="Segoe UI", size=14, bold=True, color="102A43")
font_subtitle = Font(name="Segoe UI", size=10, italic=True, color="486581")
font_header = Font(name="Segoe UI", size=10, bold=True, color="FFFFFF")
font_data = Font(name="Segoe UI", size=10, color="1D1D1F")
font_data_bold = Font(name="Segoe UI", size=10, bold=True, color="102A43")
font_formula = Font(name="Segoe UI", size=10, bold=True, color="059669")

fill_navy_header = PatternFill(start_color="102A43", end_color="102A43", fill_type="solid")
fill_blue_header = PatternFill(start_color="155E9A", end_color="155E9A", fill_type="solid")
fill_teal_header = PatternFill(start_color="0A6C82", end_color="0A6C82", fill_type="solid")
fill_emerald_header = PatternFill(start_color="059669", end_color="059669", fill_type="solid")
fill_accent_soft = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
fill_highlight = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")

thin_border = Border(
    left=Side(style="thin", color="E2E8F0"),
    right=Side(style="thin", color="E2E8F0"),
    top=Side(style="thin", color="E2E8F0"),
    bottom=Side(style="thin", color="E2E8F0")
)
header_border = Border(
    left=Side(style="thin", color="CBD5E1"),
    right=Side(style="thin", color="CBD5E1"),
    top=Side(style="medium", color="0A1128"),
    bottom=Side(style="medium", color="0A1128")
)

# -------------------------------------------------------------
# Sheet 1: Published Individual Tests & Discount Calculator
# -------------------------------------------------------------
ws1 = wb.active
ws1.title = "Published_Tests_Tariffs"
ws1.views.sheetView[0].showGridLines = True

ws1.append(["SAWARIYA DIAGNOSTIC LAB — CHARKHI DADRI (HARYANA)"])
ws1.append(["Official Tariff Master & Patient Discount Adjustment Calculator (Opp. R.S. Sangwan Hospital, Loharu Road)"])
ws1.append([])

headers1 = [
    "Test Code",
    "Test Name",
    "Department",
    "Current Patient Rate (₹)",
    "Standard Reference MRP (₹)",
    "Current Discount (%)",
    "Matched B2B Net Cost (₹)",
    "Estimated Lab Margin (₹)",
    "New Proposed Rate (₹) [EDITABLE]",
    "New Discount (%) [CALCULATED]",
    "Margin over B2B (₹) [CALCULATED]",
    "Local Charkhi Dadri Pricing Strategy & Reagent Note"
]
ws1.append(headers1)

for row_idx, t in enumerate(tests, start=5):
    matched_b2b = None
    t_clean = t["name"].lower()
    for b in b2b_items:
        b_clean = b["name"].lower()
        if b_clean in t_clean or t_clean in b_clean or (len(b_clean) > 4 and b_clean[:6] in t_clean):
            matched_b2b = b["net"]
            break
    
    b2b_val = matched_b2b if matched_b2b else ""
    margin_formula = f"=D{row_idx}-G{row_idx}" if matched_b2b else f"=D{row_idx}*0.6"
    new_discount_formula = f"=IF(I{row_idx}>0, ROUND((1-(I{row_idx}/E{row_idx}))*100, 1), F{row_idx})"
    new_margin_formula = f"=IF(AND(I{row_idx}>0, ISNUMBER(G{row_idx})), I{row_idx}-G{row_idx}, IF(I{row_idx}>0, I{row_idx}*0.6, H{row_idx}))"
    
    note = "Routine in-house analyzer; low reagent marginal cost" if t["price"] <= 300 else "Specialized CLIA / partner outsourced parameter"
    
    ws1.append([
        t["id"],
        t["name"],
        t["category"],
        t["price"],
        t["originalPrice"],
        round((1 - t["price"] / t["originalPrice"]) * 100, 1) if t["originalPrice"] > 0 else 0,
        b2b_val,
        margin_formula,
        t["price"],  # Default to current rate in editable column
        new_discount_formula,
        new_margin_formula,
        note
    ])

# -------------------------------------------------------------
# Sheet 2: B2B Cost Reference List (from Partner Dropzone)
# -------------------------------------------------------------
ws2 = wb.create_sheet(title="B2B_Cost_Reference")
ws2.views.sheetView[0].showGridLines = True

ws2.append(["B2B OUTSOURCING & REFERENCE COST LIST"])
ws2.append(["Contracted Net Laboratory Costs from Extraction Sheet (Use to protect minimum gross margins)"])
ws2.append([])

headers2 = [
    "S.No",
    "Standardized Test Name",
    "Standard Hospital MRP (₹)",
    "Contracted B2B Net Cost (₹)",
    "Minimum Retail Floor (₹) [Cost + 60%]",
    "Suggested Walk-in Patient Rate (₹)",
    "Target Gross Profit (₹)",
    "Gross Margin %"
]
ws2.append(headers2)

for row_idx, b in enumerate(b2b_items, start=5):
    s_idx = row_idx
    min_floor = f"=ROUND(D{s_idx}*1.6, 0)"
    suggested = f"=ROUND(IF(D{s_idx}<=150, D{s_idx}*2.5, IF(D{s_idx}<=500, D{s_idx}*2.0, D{s_idx}*1.7)), -1)"
    gp = f"=F{s_idx}-D{s_idx}"
    gm = f"=ROUND((G{s_idx}/F{s_idx})*100, 1)"
    
    ws2.append([
        b["s_no"],
        b["name"],
        b["mrp"],
        b["net"],
        min_floor,
        suggested,
        gp,
        gm
    ])

# -------------------------------------------------------------
# Sheet 3: Complete Health Test Panels
# -------------------------------------------------------------
ws3 = wb.create_sheet(title="Complete_Test_Panels")
ws3.views.sheetView[0].showGridLines = True

ws3.append(["SAWARIYA CLINICAL TEST PANELS TARIFF"])
ws3.append(["Consolidated Multi-Analyte Health Panels (Single Vacutainer Needle Draw)"])
ws3.append([])

headers3 = [
    "Panel ID",
    "Panel Name",
    "Department",
    "Included Analytes",
    "Current Transparent Rate (₹)",
    "Estimated Individual A La Carte Sum (₹)",
    "Patient Package Savings (₹)",
    "Package Discount %",
    "Standard Turnaround",
    "New Proposed Panel Rate (₹)",
    "New Savings %"
]
ws3.append(headers3)

for row_idx, p in enumerate(panels, start=5):
    est_alacarte = round(p["price"] * 1.55, -1)
    savings = f"=F{row_idx}-E{row_idx}"
    savings_pct = f"=ROUND((G{row_idx}/F{row_idx})*100, 1)"
    new_savings_pct = f"=ROUND((1-(J{row_idx}/F{row_idx}))*100, 1)"
    
    ws3.append([
        p["id"],
        p["name"],
        p["department"],
        p["param_count"],
        p["price"],
        est_alacarte,
        savings,
        savings_pct,
        p["turnaround"],
        p["price"],
        new_savings_pct
    ])

# -------------------------------------------------------------
# Sheet 4: Local Charkhi Dadri Village & Catchment Strategy
# -------------------------------------------------------------
ws4 = wb.create_sheet(title="Charkhi_Dadri_Area_Strategy")
ws4.views.sheetView[0].showGridLines = True

ws4.append(["CHARKHI DADRI DISTRICT & RURAL VILLAGE CATCHMENT DIRECTORY"])
ws4.append(["Home Sample Collection Service Radius & Localized Health Camp Pricing"])
ws4.append([])

headers4 = [
    "Sub-District / Block",
    "Key Catchment Villages & Towns",
    "Distance from Central Lab (km)",
    "Home Collection Slot Availability",
    "Recommended Camp Package (₹)",
    "Local Economic & Market Profile"
]
ws4.append(headers4)

villages_data = [
    ("Charkhi Dadri City & Immediate", "Loharu Road, Civil Hospital Area, Delhi Road, Ram Nagar, Subhash Chowk", "0–3 km", "07:00 AM – 07:00 PM (Instant)", "₹450 CBC+Sugar+Thyroid", "High density, walk-in hospital referral catchment"),
    ("Badhra Tehsil", "Badhra, Bhandwa, Berla, Kari Mod, Chandwas, Hansawas Kalan, Kubha Nagar", "15–28 km", "Morning Route (07:30 AM – 10:30 AM)", "₹600 Complete Hemogram + LFT", "Agricultural hub, high demand for diabetes & joint pain packages"),
    ("Jhojhu Kalan Sub-Tehsil", "Jhojhu Kalan, Jhojhu Khurd, Tiwala, Atela Khurd, Atela Kalan, Chandeni, Kadma", "10–22 km", "Morning Route (07:00 AM – 10:00 AM)", "₹550 Kidney & Lipid Profile", "Loharu road corridor, active defense personnel & elderly care"),
    ("Bond Kalan Sub-Tehsil", "Bond Kalan, Bond Khurd, Ranila, Sanjarwas, Missri, Asawari, Rankoli", "12–25 km", "Morning & Afternoon Route", "₹650 Senior Citizen Baseline", "Rohtak-Delhi bypass corridor, high heart & cholesterol screening"),
    ("Bhiwani Road Sector", "Rawaldhi, Imlota, Morwala, Charkhi, Samaspur, Mehrana, Dudiwala", "5–18 km", "07:00 AM – 01:00 PM", "₹450 Fever & Typhoid Profile", "Dense rural connectivity, seasonal viral & Dengue testing"),
    ("Narnaul-Kanina Sector", "Mandola, Manheru, Paintawas Kalan, Paintawas Khurd, Khatiwas, Balali", "8–20 km", "Morning Route (08:00 AM – 11:30 AM)", "₹700 Complete Vitality Profile", "Sports & wrestling youth belt, Vitamin D3, B12 & Calcium demand")
]

for v in villages_data:
    ws4.append(list(v))

# -------------------------------------------------------------
# Formatting and Polish for all sheets
# -------------------------------------------------------------
for ws, header_fill in [(ws1, fill_navy_header), (ws2, fill_blue_header), (ws3, fill_teal_header), (ws4, fill_emerald_header)]:
    ws["A1"].font = font_title
    ws["A2"].font = font_subtitle
    ws.row_dimensions[1].height = 24
    ws.row_dimensions[2].height = 18
    ws.row_dimensions[4].height = 28
    
    for col_idx in range(1, ws.max_column + 1):
        cell = ws.cell(row=4, column=col_idx)
        cell.font = font_header
        cell.fill = header_fill
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = header_border

    for r in range(5, ws.max_row + 1):
        ws.row_dimensions[r].height = 20
        for c in range(1, ws.max_column + 1):
            cell = ws.cell(row=r, column=c)
            cell.border = thin_border
            cell.font = font_data
            
            if isinstance(cell.value, (int, float)):
                cell.alignment = Alignment(horizontal="right", vertical="center")
            elif str(cell.value).startswith("="):
                cell.alignment = Alignment(horizontal="right", vertical="center")
                cell.font = font_formula
            else:
                cell.alignment = Alignment(horizontal="left", vertical="center")
                
            if r % 2 == 0:
                if cell.fill.fill_type is None:
                    cell.fill = fill_accent_soft

    for col in ws.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            val_str = str(cell.value or '')
            if not val_str.startswith("=") and len(val_str) > max_len and cell.row > 2:
                max_len = len(val_str)
        ws.column_dimensions[col_letter].width = max(max_len + 4, 12)

# Specific Highlight for Editable column in ws1
for r in range(5, ws1.max_row + 1):
    ws1.cell(row=r, column=9).fill = fill_highlight

# Save files
os.makedirs(os.path.dirname(OUT_PATH_1), exist_ok=True)
os.makedirs(os.path.dirname(OUT_PATH_2), exist_ok=True)
wb.save(OUT_PATH_1)
wb.save(OUT_PATH_2)
print(f"Successfully generated Excel file with {len(tests)} tests, {len(b2b_items)} B2B items, {len(panels)} panels!")
