import http.server
import socketserver
import threading
import time
import json
import os
from playwright.sync_api import sync_playwright, expect

PORT = 8002
API_BASE_URL = "/api"

class MockHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith(API_BASE_URL):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            if self.path == "/api/auth/check":
                self.wfile.write(json.dumps({
                    "logged_in": True,
                    "user": {"full_name": "Test User", "email": "test@example.com"}
                }).encode())
            elif self.path == "/api/account/info":
                self.wfile.write(json.dumps({
                    "success": True,
                    "has_account": True,
                    "account": {"account_number": "1234567890123", "balance": 5000.00}
                }).encode())
            elif self.path == "/api/dashboard/stats":
                self.wfile.write(json.dumps({
                    "success": True,
                    "stats": {
                        "total_deposits": 10000,
                        "total_withdrawals": 5000,
                        "total_transfers_out": 0,
                        "total_transfers_in": 0
                    }
                }).encode())
            elif "/api/transactions/history" in self.path:
                self.wfile.write(json.dumps({"success": True, "transactions": []}).encode())
            else:
                self.wfile.write(json.dumps({"success": True}).encode())
            return

        super().do_GET()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), MockHandler) as httpd:
        httpd.serve_forever()

def verify():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 812}, is_mobile=True)
        page = context.new_page()

        try:
            page.goto(f"http://localhost:{PORT}/frontend/dashboard.html")

            # Wait for button
            refresh_btn = page.locator("#refreshDashboardBtn")
            expect(refresh_btn).to_be_visible()
            expect(refresh_btn).to_have_attribute("aria-label", "Refresh balance")

            # Click
            refresh_btn.click()

            # Wait for toast
            toast = page.locator(".mobile-toast")
            expect(toast).to_be_visible()
            expect(toast).to_have_class(re.compile(r"show"))

            # Take screenshot
            screenshot_path = ".Jules/verification/refresh_toast.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

        finally:
            browser.close()

if __name__ == "__main__":
    import re
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()
    time.sleep(1)
    verify()
