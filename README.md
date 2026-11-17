#  Digital Strategy for Business Transformation
## Vehicle Registration & Threat Intelligence System

**Course:** Digital Strategy for Business Transformation  
**Institution:** Limkokwing University of Creative Technology  
**Program:** Diploma in Business Information Technology  


---

##  Project Overview
This project is an enterprise-grade vehicle registration system built using disruptive technologies:
- **Artificial Intelligence:** Random Forest & Linear Regression predictive models, fraud & anomaly detection, feature importance weights, and real-time Chart.js dashboards.
- **Cybersecurity & Compliance:** Role-Based Access Control (Admin, Registrar, Police, Public), isolated security configuration module, data classification (Public, Private, Confidential, Restricted), and strict GDPR compliance mapping (Articles 15, 17, 32).
- **Blockchain Technology:** Solidity smart contract (`VehicleRegistry.sol`) ready for EVM/Remix, cryptographic SHA-256 state hashing for every vehicle record, and an interactive block explorer with live cryptographic integrity verification.

##  How to Run Locally

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
3. **GDPR & Data Classification Spreadsheet:** `DBITY3_Data_Classification_and_GDPR.csv`.
4. **Smart Contract:** `smart_contracts/VehicleRegistry.sol`.
