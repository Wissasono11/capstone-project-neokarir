# scrape_glints_job_details.py

import pandas as pd
import time
import random

from playwright.sync_api import sync_playwright

# ==========================================
# CONFIG
# ==========================================

INPUT_FILE = "glints_jobs_ra.csv"
OUTPUT_FILE = "glints_jobs_detail.csv"

MAX_JOBS = 50

# ==========================================
# LOAD JOB LINKS
# ==========================================

df = pd.read_csv(INPUT_FILE)

df = df.drop_duplicates(subset=["job_link"])

df = df.head(MAX_JOBS)

# ==========================================
# STORAGE
# ==========================================

all_jobs = []

# ==========================================
# PLAYWRIGHT SCRAPER
# ==========================================

with sync_playwright() as p:

    browser = p.chromium.launch(
        headless=False
    )

    page = browser.new_page()

    for idx, row in df.iterrows():

        job_title = row["job_title"]
        job_link = row["job_link"]
        search_keyword = row["search_keyword"]

        print("\n===================================")
        print(f"[{idx+1}/{len(df)}]")
        print(f"Opening: {job_link}")

        try:

            page.goto(
                job_link,
                timeout=60000
            )

            # Tunggu page fully loaded
            page.wait_for_timeout(5000)

            # ==========================================
            # EXTRACT TEXT PAGE
            # ==========================================

            body_text = page.locator("body").inner_text()

            # ==========================================
            # EXTRACT POSTED DATE
            # ==========================================

            posted_date = None

            possible_lines = body_text.split("\n")

            for line in possible_lines:

                line_lower = line.lower()

                if (
                    "hari yang lalu" in line_lower
                    or "days ago" in line_lower
                    or "posted" in line_lower
                    or "diposting" in line_lower
                ):
                    posted_date = line.strip()
                    break

            # ==========================================
            # EXTRACT COMPANY
            # ==========================================

            company = None

            try:
                company_locator = page.locator("h2")

                if company_locator.count() > 0:
                    company = company_locator.first.inner_text()

            except:
                pass

            # ==========================================
            # EXTRACT LOCATION
            # ==========================================

            location = None

            try:
                spans = page.locator("span").all_inner_texts()

                for s in spans:

                    if any(city in s for city in [
                        "Jakarta",
                        "Bandung",
                        "Surabaya",
                        "Yogyakarta",
                        "Remote",
                        "Indonesia"
                    ]):
                        location = s
                        break

            except:
                pass

            # ==========================================
            # SAVE RESULT
            # ==========================================

            all_jobs.append({
                "search_keyword": search_keyword,
                "job_title": job_title,
                "company": company,
                "location": location,
                "posted_date": posted_date,
                "job_link": job_link,
                "job_description": body_text
            })

            print("SUCCESS")
            print(f"Posted Date: {posted_date}")
            print(f"Company: {company}")

            # ==========================================
            # ANTI BLOCK DELAY
            # ==========================================

            time.sleep(random.uniform(4, 8))

        except Exception as e:

            print(f"ERROR: {e}")

    browser.close()

# ==========================================
# SAVE CSV
# ==========================================

if all_jobs:

    out_df = pd.DataFrame(all_jobs)

    out_df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print("\n===================================")
    print("DETAIL SCRAPING FINISHED")
    print("===================================")

    print(out_df.head())

else:

    print("NO JOB DETAILS COLLECTED")