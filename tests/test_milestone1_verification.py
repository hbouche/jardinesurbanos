#!/usr/bin/env python3
"""
test_milestone1_verification.py
Automated Verification Suite for Milestone 1: Activos, Entorno y Mockups IA
Validates:
1. Scaffolding directory tree
2. Integrity of 33 official photos (bytes & SHA-256 match)
3. Exclusion of external reference images
4. Existence and validity of 9 AI mockups
5. Media manifest completeness and schema compliance
"""

import os
import csv
import json
import hashlib
from PIL import Image

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SITE_ROOT = os.path.join(PROJECT_ROOT, "site")
ASSETS_DIR = os.path.join(SITE_ROOT, "assets")
IMG_DIR = os.path.join(ASSETS_DIR, "img")
MOCKUPS_DIR = os.path.join(ASSETS_DIR, "mockups")
ROOT_MOCKUPS_DIR = os.path.join(PROJECT_ROOT, "assets", "mockups")
VERIF_CSV = os.path.join(PROJECT_ROOT, "imagenes", "VERIFICACION.csv")

def test_directories():
    required_dirs = [
        os.path.join(SITE_ROOT, "css"),
        os.path.join(SITE_ROOT, "js"),
        os.path.join(SITE_ROOT, "pages"),
        IMG_DIR,
        MOCKUPS_DIR,
        ROOT_MOCKUPS_DIR
    ]
    for d in required_dirs:
        assert os.path.isdir(d), f"Required directory missing: {d}"
    print("[PASS] All required directories exist.")

def test_official_photos_integrity():
    assert os.path.exists(VERIF_CSV), "VERIFICACION.csv missing"
    
    verified_count = 0
    with open(VERIF_CSV, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            filepath_in_csv = row["archivo"]
            if "01_sitio_oficial" in filepath_in_csv:
                filename = os.path.basename(filepath_in_csv)
                target_file = os.path.join(IMG_DIR, filename)
                assert os.path.isfile(target_file), f"Missing official image: {target_file}"
                
                with open(target_file, "rb") as img_f:
                    data = img_f.read()
                
                # Check byte count
                expected_bytes = int(row["bytes"])
                assert len(data) == expected_bytes, f"Byte mismatch for {filename}: expected {expected_bytes}, got {len(data)}"
                
                # Check SHA256
                calc_sha = hashlib.sha256(data).hexdigest().upper()
                expected_sha = row["sha256"].upper()
                assert calc_sha == expected_sha, f"SHA256 mismatch for {filename}: expected {expected_sha}, got {calc_sha}"
                
                # Validate image header with PIL
                with Image.open(target_file) as img:
                    assert img.size[0] == int(row["ancho"]), f"Width mismatch for {filename}"
                    assert img.size[1] == int(row["alto"]), f"Height mismatch for {filename}"
                
                verified_count += 1
                
    assert verified_count == 33, f"Expected 33 official photos, got {verified_count}"
    print(f"[PASS] All {verified_count} official photos verified with 100% SHA-256 and byte parity.")

def test_exclusion_of_external_references():
    ref_dir = os.path.join(PROJECT_ROOT, "imagenes", "02_referencias_externas")
    ref_files = os.listdir(ref_dir)
    
    for root, dirs, files in os.walk(SITE_ROOT):
        for f in files:
            assert f not in ref_files, f"CRITICAL INTEGRITY VIOLATION: Reference file '{f}' found in site assets: {os.path.join(root, f)}"
            
    print("[PASS] External reference files strictly excluded from public site assets.")

def test_mockups():
    expected_mockups = [
        "talud_antes_erosion.jpg",
        "talud_despues_hidrosiembra.jpg",
        "jardin_antes_tierra.jpg",
        "jardin_despues_zoysia.jpg",
        "guayacan_arbol.jpg",
        "arbol_panama.jpg",
        "roble_sabanero.jpg",
        "palma_viajera.jpg",
        "calathea_bijao.jpg"
    ]
    
    for dir_path in [ROOT_MOCKUPS_DIR, MOCKUPS_DIR]:
        for mockup_name in expected_mockups:
            full_path = os.path.join(dir_path, mockup_name)
            assert os.path.isfile(full_path), f"Mockup file missing: {full_path}"
            size = os.path.getsize(full_path)
            assert size > 50000, f"Mockup file suspiciously small ({size} bytes): {full_path}"
            with Image.open(full_path) as img:
                w, h = img.size
                assert w >= 800 and h >= 800, f"Mockup dimensions too small ({w}x{h}): {full_path}"
                
    print(f"[PASS] All {len(expected_mockups)} AI mockups exist, mirrored, and validated in both directories.")

def test_media_manifest():
    json_path = os.path.join(ASSETS_DIR, "media_manifest.json")
    js_path = os.path.join(ASSETS_DIR, "media_manifest.js")
    
    assert os.path.isfile(json_path), f"Manifest JSON missing: {json_path}"
    assert os.path.isfile(js_path), f"Manifest JS missing: {js_path}"
    
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    assert data["summary"]["totalItems"] == 42, f"Expected 42 total items, got {data['summary']['totalItems']}"
    assert data["summary"]["officialPhotosCount"] == 33
    assert data["summary"]["mockupsCount"] == 9
    assert len(data["items"]) == 42
    
    for item in data["items"]:
        assert "filename" in item
        assert "relativePath" in item
        assert "sourceTag" in item
        assert "dimensions" in item
        assert "category" in item
        assert item["fileSize"] > 0
        if item["isOfficial"]:
            assert item["sourceTag"] == "[Foto Oficial Finca JUSA]"
            assert os.path.isfile(os.path.join(SITE_ROOT, item["relativePath"]))
        else:
            assert item["sourceTag"] == "[Variedad de Finca • Imagen Referencial]"
            assert os.path.isfile(os.path.join(SITE_ROOT, item["relativePath"]))
            
    print("[PASS] Media manifest is valid, comprehensive, and conformant with 42 items.")

if __name__ == "__main__":
    test_directories()
    test_official_photos_integrity()
    test_exclusion_of_external_references()
    test_mockups()
    test_media_manifest()
    print("\n>>> ALL MILESTONE 1 VERIFICATIONS PASSED SUCCESSFULLY! <<<")
