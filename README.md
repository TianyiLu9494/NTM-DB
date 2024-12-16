# NTM-DB: Non-Tuberculous Mycobacteria Database  

NTM-DB is a specialized database designed for **Non-Tuberculous Mycobacteria (NTM)** research and clinical applications. This resource integrates vast genomic and bioinformatics data, supporting tasks like genome assembly, multi-locus sequence typing (MLST), resistance and virulence gene annotation, and cross-species phylogenomic analysis.  

The database is accessible through an interactive web portal: [NTM-DB Website](https://ngdc.cncb.ac.cn/ntmdb).

## Project Overview  
This repository primarily hosts the **website source code** and **data analysis scripts** used for NTM-DB development.  

### Contents:  
- **`Django_code/`**: Contains the website backend and frontend code for NTM-DB.  
- **`analysis/`**: Stores scripts and tools for data analysis, including evolutionary analysis, MLST typing, pan-genome analysis, and virulence/drug-resistance gene annotation.  

---

## Directory Structure  

### 1. `Django_code/` - Website Code  
This directory contains the main backend code built with **Django**. It supports data visualization, querying, online analysis, and file downloads.  

#### Structure:  
- **`api/`**: Backend logic for data management, including APIs for NTM-DB functionalities.  
- **`frontend/`**: Contains templates, static files (CSS/JS), and other frontend components.  
- **`sever_NTMDB/`**: Django server configuration and settings.  
- **`manage.py`**: Django management script for database migrations, running servers, etc.  

---

### 2. `Data_analysis_code/` - Data Analysis Code  
This directory stores scripts for various genomic analyses implemented in NTM-DB:  

- **Evolutionary Analysis**: Tools for constructing phylogenetic trees and cross-species comparisons.  
- **MLST Typing**: Scripts for multi-locus sequence typing (MLST) analysis of NTM strains.  
- **Pan-Genome Analysis**: Methods for pan-genomic analysis, including core and accessory gene identification.  
- **Virulence & Resistance Annotation**: Tools for identifying virulence and drug-resistance genes within NTM genomes.  

---

## Key Features  
- **Interactive Website**: Intuitive interface for browsing, searching, and analyzing NTM genomic data.  
- **Comprehensive Genomic Data**: Includes 16,469 genome assemblies, resistance/virulence genes, and MLST profiles.  
- **Custom Online Tools**: Supports genotyping, pan-genomic analysis, and drug resistance annotations.  

---

## License  
This project is licensed under the **MIT License**.  

---

## Contact  
For any questions or contributions, please contact:  
**Tianyi Lu**  
**tianyi9494@gmail.com**
