import os
import sys
import threading
import http.server
import socketserver
import time
from playwright.sync_api import sync_playwright, expect
import re

# Constants
PORT = 8003
DIRECTORY = "frontend"
# Handle running from root or .Jules/verification
if os.path.exists("frontend"):
    DIRECTORY = "frontend"
elif os.path.exists("../../frontend"):
    DIRECTORY = "../../frontend"
    os.chdir("../..")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    def log_message(self, format, *args):
        pass

def start_server():
    try:
        socketserver.TCPServer.allow_reuse_address = True
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except OSError:
        pass

def verify():
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    time.sleep(1)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()

        # Mock APIs
        page.route("**/api/auth/check", lambda route: route.fulfill(
            status=200, content_type="application/json",
            body='{"logged_in": true, "user": {"full_name": "Test User", "email": "test@example.com"}}'
        ))
        page.route("**/api/account/info", lambda route: route.fulfill(
            status=200, content_type="application/json",
            body='{"success": true, "has_account": true, "account": {"account_number": "1234567890", "balance": 5000.00}}'
        ))
        page.route("**/api/dashboard/stats", lambda route: route.fulfill(
            status=200, content_type="application/json",
            body='{"success": true, "stats": {"total_deposits": 1000, "total_withdrawals": 500, "total_transfers_out": 200, "total_transfers_in": 300}}'
        ))
        page.route("**/api/transactions/history*", lambda route: route.fulfill(
            status=200, content_type="application/json",
            body='{"success": true, "transactions": []}'
        ))

        print("Navigating...")
        page.goto(f"http://localhost:{PORT}/dashboard.html")

        # Click refresh
        print("Clicking refresh...")
        page.click("#refreshDashboardBtn")

        # Wait for toast
        print("Waiting for toast...")
        toast = page.locator(".mobile-toast.show")
        expect(toast).to_be_visible()

        # Screenshot
        screenshot_path = os.path.abspath(".Jules/verification/dashboard_refresh_toast.png")
        page.screenshot(path=screenshot_path)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    verify()
