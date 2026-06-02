import pandas as pd

try:
    df_jobs = pd.read_csv('data/master_job_catalog.csv')
    # Jaga-jaga jika Data Scientist belum menambahkan kolom company
    if 'company' not in df_jobs.columns:
        df_jobs['company'] = "TechCorp Indonesia"
        
    import ast
    # Ubah string menjadi list asli Python
    df_jobs['required_skills'] = df_jobs['required_skills'].apply(ast.literal_eval)
except FileNotFoundError:
    print("Error: Pastikan file CSV sudah ditaruh di folder 'data/'")
    df_jobs = pd.DataFrame()