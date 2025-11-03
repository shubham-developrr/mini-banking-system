# -*- coding: utf-8 -*-
"""
Simple Server Launcher for Mini Banking System
This script starts the backend server without Unicode issues on Windows
"""

import sys
import os

# Set UTF-8 encoding for Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

# Import the broken app
try:
    with open('app.py.broken', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace all Unicode emojis with ASCII
    replacements = {
        '\u2705': '[OK]',      # ✅
        '\u274c': '[ERROR]',   # ❌
        '\u26a0\ufe0f': '[WARN]',  # ⚠️
        '\u26a0': '[WARN]',    # ⚠
        '\u20b9': 'Rs.',       # ₹
        '\U0001f4cb': '[INFO]', # 📋
    }
    
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    # Write fixed version
    with open('app_fixed.py', 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Fixed app.py created as app_fixed.py")
    print("Starting server...")
    
    # Execute the fixed app
    exec(compile(content, 'app_fixed.py', 'exec'))
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
