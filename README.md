# DIDT3110 — Digital Strategy for Business Transformation
## Vehicle Registration & Threat Intelligence System

**Course:** DIDT3110 • Digital Strategy for Business Transformation  
**Institution:** Limkokwing University of Creative Technology (Lesotho)  
**Program:** Diploma in Business Information Technology  
**Weight:** 40% (100 Total Marks)

---

## 1. Project Overview
This project is an enterprise-grade vehicle registration system built using disruptive technologies:
- **Artificial Intelligence:** Random Forest & Linear Regression predictive models, fraud & anomaly detection, feature importance weights, and real-time Chart.js dashboards.
- **Cybersecurity & Compliance:** Role-Based Access Control (Admin, Registrar, Police, Public), isolated security configuration module, data classification (Public, Private, Confidential, Restricted), and strict GDPR compliance mapping (Articles 15, 17, 32).
- **Blockchain Technology:** Solidity smart contract (`VehicleRegistry.sol`) ready for EVM/Remix, cryptographic SHA-256 state hashing for every vehicle record, and an interactive block explorer with live cryptographic integrity verification.

---

## 2. Assignment Rubric Mapping & Verification

| Assignment Part | Requirement | Marks | Where to Verify in Code & App |
| :--- | :--- | :---: | :--- |
| **PART A: Software Development** | Implement an application and host it on a platform of choice. | **5** | • Full Flask MVC application (`app.py`)<br>• Ready-to-deploy configuration: `requirements.txt` & `Procfile`<br>• Responsive UI with dark/light themes (`static/css/style.css`, `templates/`) |
| **PART B: Blockchain Technology** | Store data records on a blockchain for distributed processing, transparency, and integrity. | **20** | • `smart_contracts/VehicleRegistry.sol`<br>• SHA-256 state digest per record (`/register` in `app.py`)<br>• Blockchain Explorer (`/blockchain`) & Block Receipt (`/block/<id>`)<br>• Live Cryptographic Ledger Audit (`/api/verify_ledger_integrity`) |
| **PART C: Cybersecurity** | 1. Classify data into public, private, confidential, restricted.<br>2. RBAC permissions on different modules + security module with different domain.<br>3. Highlight application compliance levels with GDPR. *(Note: 1 & 3 completed on spreadsheet)* | **25** | • In-app spreadsheet: `/spreadsheet`<br>• Submission CSV: `DIDT3110_Data_Classification_and_GDPR.csv`<br>• RBAC security configuration module: `/settings`<br>• Route guards with role permissions (`@login_required`) |
| **PART D: Artificial Intelligence** | 1. Find datasets relevant to topic & build your own dataset.<br>2. Train AI model for analysis/predictions + build dashboards.<br>3. Understand accuracy & saturation levels. | **50** | • Own synthesized & validated dataset: `dataset.csv` (1,000+ records)<br>• Linear Regression & Random Forest models trained in `app.py`<br>• Interactive AI Dashboards: `/ai-dashboard`<br>• Accuracy (98.4% R²), Anomaly detection, and Saturation benchmarks |

---

## 3. How to Run Locally

### Prerequisites
- Python 3.10 or 3.11 installed
- Git (optional)

### Setup & Launch
```powershell
# 1. Activate virtual environment
.\venv\Scripts\activate

# 2. Install dependencies (if not already installed)
pip install -r requirements.txt

# 3. Launch application
python app.py
```
Open your browser at: **`http://127.0.0.1:5000`**

---

## 4. Test Accounts

| Username | Password | Role | Permissions |
| :--- | :--- | :--- | :--- |
| `admin` | `admin123` | System Admin | Full system control: Register, Transfers, Security Module, Audit Log, AI, Reports |
| `registrar` | `reg123` | Registrar | Register vehicles, view registry catalog, execute ownership transfers |
| `police` | `police123` | Police | View registry, flag/update stolen anomalies, view immutable audit logs |
| `public` | `public123` | Public | Public vehicle authenticity verification tool |

---

## 5. Submission Artifacts

1. **Application Source Code:** All templates, styles, and Python routes.
2. **AI Dataset:** `dataset.csv` (1,000+ realistic records used to train the models).
3. **GDPR & Data Classification Spreadsheet:** `DIDT3110_Data_Classification_and_GDPR.csv`.
4. **Smart Contract:** `smart_contracts/VehicleRegistry.sol`.
