from pytrends.request import TrendReq
import pandas as pd
import time

from curated_trend_skills import TREND_QUERY_MAP

# ==========================================
# CONFIG
# ==========================================

GEO = "ID"              # Indonesia
TIMEFRAME = "today 5-y"

OUTPUT_FILE = "goog.csv"

# ==========================================
# INIT GOOGLE TRENDS
# ==========================================

pytrends = TrendReq(
    hl='en-US',
    tz=360
)

all_data = []

# ==========================================
# FETCH DATA
# ==========================================

for skill_name, trend_query in TREND_QUERY_MAP.items():

    try:
        print(f"\nFetching: {skill_name} -> {trend_query}")

        pytrends.build_payload(
            [trend_query],
            timeframe=TIMEFRAME,
            geo=GEO
        )

        df = pytrends.interest_over_time()

        if df.empty:
            print(f"NO DATA: {skill_name}")
            continue

        # Reset index
        df = df.reset_index()

        # Rename trend column
        df = df.rename(columns={
            trend_query: "google_trend_score"
        })

        # Keep needed columns
        df = df[[
            "date",
            "google_trend_score"
        ]]

        # Convert weekly → monthly
        df["date"] = pd.to_datetime(df["date"])

        monthly_df = (
            df
            .set_index("date")
            .resample("M")
            .mean()
            .reset_index()
        )

        monthly_df["skill_name"] = skill_name

        monthly_df = monthly_df.rename(columns={
            "date": "date_recorded"
        })

        all_data.append(monthly_df)

        print(f"SUCCESS: {skill_name}")

        # Anti rate-limit
        time.sleep(3)

    except Exception as e:
        print(f"ERROR {skill_name}: {e}")

# ==========================================
# SAVE CSV
# ==========================================

if all_data:

    final_df = pd.concat(all_data)

    final_df["google_trend_score"] = (
        final_df["google_trend_score"]
        .fillna(0)
        .astype(int)
    )

    final_df = final_df.sort_values([
        "skill_name",
        "date_recorded"
    ])

    final_df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    print("\n====================================")
    print("GOOGLE TRENDS DATASET CREATED")
    print("====================================")

    print(final_df.head())

else:
    print("NO DATA COLLECTED")