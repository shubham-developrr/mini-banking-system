from playwright.sync_api import sync_playwright

def verify_dashboard_refresh():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use mobile viewport
        context = browser.new_context(viewport={'width': 375, 'height': 812})
        page = context.new_page()

        # Mocks
        page.route("**/api/account/info", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "has_account": true, "account": {"account_number": "1234567890", "balance": 5000.00}, "user": {"full_name": "Test User"}}'
        ))

        page.route("**/api/dashboard/stats", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "stats": {"total_deposits": 10000, "total_withdrawals": 5000, "total_transfers_in": 0, "total_transfers_out": 0}}'
        ))

        page.route("**/api/transactions/history*", lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "transactions": []}'
        ))

        # IMPORTANT: auth.js checks data.logged_in
        page.route("**/api/auth/check", lambda route: route.fulfill(
             status=200,
             content_type="application/json",
             body='{"success": true, "logged_in": true, "user": {"id": 1, "username": "test", "full_name": "Test User"}}'
        ))

        print("Navigating to dashboard...")
        page.goto("http://localhost:8000/frontend/dashboard.html")

        print("Waiting for network idle...")
        page.wait_for_load_state("networkidle")

        # Check if we were redirected to login
        if "login" in page.url:
            print("FAILED: Redirected to login page. Auth mock failed.")
            browser.close()
            return

        print("Looking for refresh button...")
        refresh_btn = page.locator("#refreshDashboardBtn")

        # Force wait
        page.wait_for_timeout(2000)

        if refresh_btn.count() == 0:
            print("Button not found by ID")
        else:
            print("Button found!")

            # Check aria-label
            aria_label = refresh_btn.get_attribute("aria-label")
            print(f"Aria-label: {aria_label}")
            if aria_label != "Refresh account balance":
                print("FAILED: Incorrect aria-label")
            else:
                print("PASSED: aria-label is correct")

            # Click
            refresh_btn.click()

            # Check spinner
            page.wait_for_timeout(100)
            icon_class = refresh_btn.locator("i").get_attribute("class")
            print(f"Icon class: {icon_class}")
            if "fa-spin" in icon_class:
                print("PASSED: Spinner active")
            else:
                print("FAILED: Spinner not active")

            page.screenshot(path=".Jules/verification/refresh_loading.png")

            # Check toast
            page.wait_for_timeout(1000)
            toast = page.locator(".mobile-toast")
            if toast.count() > 0:
                print("PASSED: Toast appeared")
                page.screenshot(path=".Jules/verification/refresh_complete.png")
            else:
                print("FAILED: Toast did not appear")
                page.screenshot(path=".Jules/verification/refresh_failed.png")

        browser.close()

if __name__ == "__main__":
    verify_dashboard_refresh()
