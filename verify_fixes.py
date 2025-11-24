import threading
import requests
import time
import sys

# Target the test server port
BASE_URL = "http://localhost:5001/api"
TEST_EMAIL = f"verify_race_{int(time.time())}@example.com"
TEST_PASSWORD = "password123"

def register_user():
    try:
        resp = requests.post(f"{BASE_URL}/auth/register", json={
            "name": "Verify Tester",
            "email": TEST_EMAIL,
            "phone": "1234567890",
            "password": TEST_PASSWORD
        })
        if resp.status_code == 200:
            return resp.json()
        print(f"Registration failed: {resp.text}")
        return None
    except Exception as e:
        print(f"Connection failed: {e}")
        return None

def login_user():
    session = requests.Session()
    resp = session.post(f"{BASE_URL}/auth/login", json={
        "email": TEST_EMAIL,
        "password": TEST_PASSWORD
    })
    if resp.status_code == 200:
        return session
    return None

def deposit(session, amount):
    resp = session.post(f"{BASE_URL}/transactions/deposit", json={"amount": amount})
    return resp.json()

def withdraw(session, amount):
    resp = session.post(f"{BASE_URL}/transactions/withdraw", json={"amount": amount})
    return resp.status_code, resp.json()

def run_verification():
    print("\n--- Starting Verification Test ---")
    
    # 1. Register and Login
    user_data = register_user()
    if not user_data:
        print("Skipping test due to registration failure")
        return

    session = login_user()
    if not session:
        print("Login failed")
        return

    # 2. Deposit Initial Amount (1000)
    deposit(session, 1000)
    print("Initial Balance: 1000")

    # 3. Concurrent Withdrawals
    # Try to withdraw 100, 15 times concurrently. Total needed: 1500. Available: 1000.
    # Expected: Exactly 10 success, 5 fail.
    
    threads = []
    results = []

    def perform_withdrawal():
        code, data = withdraw(session, 100)
        results.append(code)

    for _ in range(15):
        t = threading.Thread(target=perform_withdrawal)
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    # 4. Check Final Balance
    resp = session.get(f"{BASE_URL}/account/balance")
    final_data = resp.json()
    balance = final_data.get('balance')
    
    success_count = results.count(200)
    fail_count = results.count(400)
    
    print(f"Withdrawal Attempts: 15")
    print(f"Successful Withdrawals: {success_count}")
    print(f"Failed Withdrawals: {fail_count}")
    print(f"Final Balance: {balance}")
    
    if balance < 0:
        print("❌ CRITICAL FAIL: Balance is negative!")
    elif success_count > 10:
        print("❌ FAIL: More withdrawals succeeded than balance allowed.")
    elif success_count == 10 and fail_count == 5 and balance == 0:
        print("✅ PASS: Race condition handled correctly.")
    else:
        print(f"⚠️ UNDETERMINED: Balance {balance}, Success {success_count}")

if __name__ == "__main__":
    run_verification()
