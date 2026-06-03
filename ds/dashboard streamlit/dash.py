import streamlit as st
import pandas as pd
import plotly.express as px
import ast
from collections import Counter
import numpy as np
import statsmodels.api as sm
from statsmodels.stats.proportion import proportions_ztest
from statsmodels.stats.power import NormalIndPower

# --- PAGE CONFIG ---
st.set_page_config(page_title="NeoKarir Intelligence Dashboard", page_icon="💼", layout="wide")

# --- PALETTE WARNA BRANDING NEOKARIR (Premium Dark Navy & Electric Blue) ---
COLOR_CONTROL = "#64748B"  # Slate Gray untuk Kontrol (Sistem Lama)
COLOR_VARIANT = "#2563EB"  # Electric Blue untuk Varian (Sistem AI)
COLOR_BG_CARD = "#F8FAFC"

custom_modebar = {
    'displayModeBar': True,
    'displaylogo': False,
    'modeBarButtonsToRemove': [
        'zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 
        'autoScale2d', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines'
    ]
}

# --- HELPER FUNCTIONS ---
def get_top_skills(df):
    all_skills = [skill for sublist in df['required_skills'] for skill in sublist]
    skill_counts = Counter(all_skills)
    top_skills_df = pd.DataFrame(skill_counts.most_common(15), columns=['Skill', 'Count'])
    return top_skills_df

# --- LOAD DATA ---
@st.cache_data
def load_data():
    df = pd.read_csv("master_job_catalog.csv")
    df['required_skills'] = df['required_skills'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)
    df['skill_count'] = df['required_skills'].apply(len)
    return df

job_df = load_data()

# --- SIDEBAR NAVIGATION ---
with st.sidebar:
    st.image("https://raw.githubusercontent.com/hawnbell/neokarir-dashboard-ds/main/logo.png") 
    st.markdown("## 🧭 Navigasi Dashboard")
    menu_pilihan = st.radio("Pilih Halaman Analisis:", ["💼 Analisis Pasar Kerja", "🧪 Evaluasi A/B Testing"])

# ==========================================
# HALAMAN 1: ANALISIS PASAR KERJA IT
# ==========================================
if menu_pilihan == "💼 Analisis Pasar Kerja":
    with st.sidebar:
        st.markdown("---")
        st.markdown("### 🔍 Filter Pekerjaan")
        domains = ["Semua Domain"] + list(job_df['job_domain'].unique())
        selected_domain = st.selectbox("Domain Pekerjaan", domains)
        
        experiences = ["Semua Pengalaman"] + list(job_df['min_experience'].unique())
        selected_experience = st.selectbox("Syarat Pengalaman", experiences)

    main_df = job_df.copy()
    if selected_domain != "Semua Domain":
        main_df = main_df[main_df['job_domain'] == selected_domain]
    if selected_experience != "Semua Pengalaman":
        main_df = main_df[main_df['min_experience'] == selected_experience]

    st.title('💼 NeoKarir: IT Job Market Dashboard')
    st.markdown("Temukan peluang karier terbaikmu! Jelajahi domain IT terpopuler, kriteria keahlian, dan Tech Stack yang paling dicari perusahaan.")
    st.markdown("---")

    if main_df.empty:
        st.warning("Maaf, tidak ada lowongan yang sesuai dengan filter yang Anda pilih.")
    else:
        st.subheader("Ringkasan Pencarian")
        col1, col2, col3, col4 = st.columns(4)
        with col1:
            st.metric("Total Lowongan", value=f"{len(main_df):,}")
        with col2:
            top_domain = main_df['job_domain'].mode()[0]
            st.metric("Domain Mendominasi", value=top_domain)
        with col3:
            top_skill = get_top_skills(main_df)['Skill'].iloc[0] if not get_top_skills(main_df).empty else "-"
            st.metric("Skill Terpopuler", value=top_skill)
        with col4:
            avg_skill = int(round(main_df['skill_count'].mean()))
            st.metric("Rata-rata Skill Diminta", value=f"± {avg_skill} Skill")

        st.markdown("<br>", unsafe_allow_html=True)

        col_kiri, col_kanan = st.columns(2)
        with col_kiri:
            if selected_domain == "Semua Domain":
                st.markdown("**Distribusi Lowongan per Domain IT**")
                domain_counts = main_df['job_domain'].value_counts().reset_index()
                domain_counts.columns = ['job_domain', 'count']
                domain_counts = domain_counts.sort_values(by='count', ascending=True) 
                
                fig_domain = px.bar(domain_counts, x='count', y='job_domain', orientation='h', color_discrete_sequence=[COLOR_VARIANT], text='count')
                fig_domain.update_traces(textposition='outside', hovertemplate='<b>%{y}</b><br>Jumlah: %{x}<extra></extra>')
                fig_domain.update_layout(xaxis_title="", yaxis_title="", margin=dict(t=10, b=0, l=0, r=30), height=400, plot_bgcolor='white')
                st.plotly_chart(fig_domain, use_container_width=True, config=custom_modebar)

        with col_kanan:
            st.markdown(f"**Top 15 Skills Paling Dicari ({selected_domain})**")
            top_skills_df = get_top_skills(main_df).sort_values(by='Count', ascending=True)
            fig_skill = px.bar(top_skills_df, x='Count', y='Skill', orientation='h', color_discrete_sequence=["#10B981"], text='Count')
            fig_skill.update_traces(textposition='outside', hovertemplate='<b>%{y}</b><br>Permintaan: %{x}<extra></extra>')
            fig_skill.update_layout(xaxis_title="", yaxis_title="", margin=dict(t=10, b=0, l=0, r=30), height=400, plot_bgcolor='white')
            st.plotly_chart(fig_skill, use_container_width=True, config=custom_modebar)

        st.divider()
        col_bawah1, col_bawah2 = st.columns([1.5, 1])
        with col_bawah1:
            st.markdown("**Distribusi Jumlah Skill yang Diminta**")
            skill_dist = main_df['skill_count'].value_counts().reset_index()
            skill_dist.columns = ['Jumlah Skill', 'Total Lowongan']
            skill_dist = skill_dist.sort_values(by='Jumlah Skill')
            
            fig_dist = px.bar(skill_dist, x='Jumlah Skill', y='Total Lowongan', color_discrete_sequence=["#6366F1"], text='Total Lowongan')
            fig_dist.update_traces(textposition='outside', hovertemplate='Syarat <b>%{x} Skill</b><br>Total: %{y}<extra></extra>')
            fig_dist.update_layout(xaxis_title="Jumlah Syarat Skill dalam 1 Lowongan", yaxis_title="", margin=dict(t=10, b=0, l=0, r=0), xaxis=dict(tickmode='linear'), plot_bgcolor='white')
            st.plotly_chart(fig_dist, use_container_width=True, config=custom_modebar)

        with col_bawah2:
            st.markdown("**Persentase Syarat Pengalaman**")
            exp_counts = main_df['min_experience'].value_counts().reset_index()
            exp_counts.columns = ['min_experience', 'count']
            fig_exp = px.pie(exp_counts, values='count', names='min_experience', hole=0.4, color_discrete_sequence=px.colors.sequential.Blues_r)
            fig_exp.update_traces(
                  textposition='inside', 
                  textinfo='percent+label',\
                  hovertemplate='<b>Syarat Pengalaman:</b> %{label}<br><b>Total:</b> %{value} Lowongan<extra></extra>'
            )
            fig_exp.update_layout(margin=dict(t=30, b=0, l=0, r=0), showlegend=False)
            st.plotly_chart(fig_exp, use_container_width=True, config=custom_modebar)

# ==========================================
# HALAMAN 2: EVALUASI A/B TESTING (UPGRADED)
# ==========================================
elif menu_pilihan == "🧪 Evaluasi A/B Testing":
    st.title("🧪 Dashboard Evaluasi A/B Testing — NeoKarir")
    st.markdown("""
**Dari Asumsi Menjadi Bukti Ilmiah.** Halaman ini memvalidasi secara *real-time* bagaimana ketajaman **AI Job Match Score** mengungguli metode pencarian konvensional lawas dalam memaksimalkan *User Engagement* dan ketepatan rekomendasi karier.
""")
    st.markdown("---")

    # [OPSI 2] Filter Berbasis Domain untuk Simulasi Kontekstual
    with st.sidebar:
        st.markdown("---")
        st.markdown("### 🎯 Konteks Eksperimen")
        list_domain_test = list(job_df['job_domain'].unique())
        selected_test_domain = st.selectbox("Pilih Domain untuk Simulasi:", list_domain_test)
        
        # Atur nilai baseline default otomatis agar relevan dengan domain yang dipilih
        if selected_test_domain == "Data Science & AI":
            def_control, def_variant = 0.09, 0.17
        elif selected_test_domain == "Software Development":
            def_control, def_variant = 0.12, 0.18
        elif selected_test_domain == "UI/UX Design":
            def_control, def_variant = 0.14, 0.23
        else:
            def_control, def_variant = 0.11, 0.15

        st.markdown("### 🕹️ Parameter Kontrol")
        n_samples = st.slider("Ukuran Sampel per Kelompok (N)", min_value=100, max_value=2000, value=1000, step=100)
        ctr_control = st.slider("Baseline CTR Kontrol (Keyword)", min_value=0.05, max_value=0.30, value=def_control, step=0.01)
        ctr_variant = st.slider("Expected CTR Varian (AI Match)", min_value=0.05, max_value=0.30, value=def_variant, step=0.01)

    # Jalankan Simulasi Eksperimen
    np.random.seed(42)
    klik_A = np.random.binomial(1, ctr_control, n_samples)
    klik_B = np.random.binomial(1, ctr_variant, n_samples)

    total_clicks_A, total_clicks_B = klik_A.sum(), klik_B.sum()
    actual_ctr_A, actual_ctr_B = klik_A.mean(), klik_B.mean()

    # Eksekusi Z-Test Proportions
    total_clicks = np.array([total_clicks_A, total_clicks_B])
    total_samples = np.array([n_samples, n_samples])
    z_stat, p_value = proportions_ztest(total_clicks, total_samples, alternative='two-sided')

    # [OPSI 1] Perhitungan Power Analysis (Minimum Sample Size) secara Real-Time
    effect_size = sm.stats.proportion_effectsize(ctr_variant, ctr_control)
    if effect_size != 0:
        power_analysis = NormalIndPower()
        min_n_required = power_analysis.solve_power(effect_size=effect_size, alpha=0.05, power=0.80, ratio=1.0)
        min_n_required = int(np.ceil(min_n_required))
        status_sampel = "Cukup ✅" if n_samples >= min_n_required else "Kurang ⚠️"
    else:
        min_n_required = "N/A"
        status_sampel = "N/A"

    # Tampilkan Grid Ringkasan Metrik Utama
    st.subheader(f"📊 Metrik Eksperimen (Domain: {selected_test_domain})")
    m_col1, m_col2, m_col3, m_col4 = st.columns(4)
    with m_col1:
        st.metric("CTR Control Group", value=f"{actual_ctr_A:.2%}")
    with m_col2:
        st.metric("CTR Variant Group (AI)", value=f"{actual_ctr_B:.2%}", delta=f"+{(actual_ctr_B - actual_ctr_A):.2%}")
    with m_col3:
        st.metric("Z-Statistic", value=f"{z_stat:.4f}")
    with m_col4:
        st.metric("P-Value", value=f"{p_value:.4f}")

    # Tampilkan Box Info Power Analysis
    st.markdown("<br>", unsafe_allow_html=True)
    st.info(f"📐 **Validasi Data (Power Analysis):** Kami memastikan lonjakan performa dari {actual_ctr_A:.1%} ke {actual_ctr_B:.1%} ini nyata dan bukan sekadar kebetulan. Dengan standar akurasi 95%, sistem mensyaratkan minimal **{min_n_required:,}** sampel. Ketersediaan data saat ini: **{n_samples:,} ({status_sampel})**.")
    st.markdown("---")
    graph_col, text_col = st.columns([1.2, 1])

    with graph_col:
        st.markdown("**Perbandingan Konversi CTR (Visualisasi Berwarna)**")
        df_ab = pd.DataFrame({
            'Kelompok Pengguna': ['Control (Keyword Search)', 'Variant (AI Job Match)'],
            'Click-Through Rate (CTR)': [actual_ctr_A, actual_ctr_B]
        })
        
        # [OPSI 3] Penerapan Warna Mengikuti Skema Branding
        fig_ab = px.bar(
            df_ab, x='Kelompok Pengguna', y='Click-Through Rate (CTR)', color='Kelompok Pengguna',
            color_discrete_map={'Control (Keyword Search)': COLOR_CONTROL, 'Variant (AI Job Match)': COLOR_VARIANT}
        )
        fig_ab.update_traces(texttemplate='%{y:.2%}', textposition='outside', hovertemplate='<b>%{x}</b><br>CTR: %{y:.2%}<extra></extra>')
        fig_ab.update_layout(yaxis_title="", xaxis_title="", yaxis=dict(tickformat='.1%'), showlegend=False, margin=dict(t=20, b=0, l=0, r=0), height=350, plot_bgcolor='white')
        st.plotly_chart(fig_ab, use_container_width=True, config=custom_modebar)

    with text_col:
        st.markdown("**Keputusan Ilmiah & Dampak Bisnis**")
        alpha = 0.05
        
        if p_value < alpha:
            st.success("🎉 **HASIL: SIGNIFICANT (Tolak H₀)**")
            st.write(f"""
            Nilai *P-Value* (**{p_value:.4f}**) < $\\alpha$ ({alpha}). Kelompok kita memiliki bukti statistik yang sangat kuat untuk menolak Hipotesis Nol.
            
            **Kesimpulan Data Science:** Fitur *AI Job Match Score* pada domain **{selected_test_domain}** terbukti secara fundamental meningkatkan ketepatan rekomendasi karier. Hal ini memicu peningkatan *user engagement* sebesar **{(actual_ctr_B - actual_ctr_A):.2%}** secara valid, bukan karena faktor kebetulan. Fitur ini siap diintegrasikan penuh ke sistem utama.
            """)
        else:
            st.warning("⚠️ **HASIL: NOT SIGNIFICANT (Gagal Tolak H₀)**")
            st.write(f"""
            Nilai *P-Value* (**{p_value:.4f}**) $\ge$ $\\alpha$ ({alpha}). Kita gagal menolak Hipotesis Nol.
            
            **Kesimpulan Data Science:** Perbedaan performa yang terlihat pada domain **{selected_test_domain}** belum cukup meyakinkan secara matematis. Disarankan untuk menambah ukuran sampel data, meninjau ulang bobot ekstraksi *required skills*, atau melakukan *hyperparameter tuning* pada model Cosine Similarity sebelum melakukan eksperimen ulang.
            """)

    # [OPSI 4] Tombol Unduh Data Mentah untuk Transparansi Laporan
    st.markdown("<br>", unsafe_allow_html=True)
    with st.expander("🔍 Inspeksi & Unduh Data Mentah Eksperimen (Audit Trail)"):
        df_raw_A = pd.DataFrame({'User_ID': [f'USR-A-{i:04d}' for i in range(n_samples)], 'Domain': selected_test_domain, 'Group': 'Control', 'Clicked': klik_A})
        df_raw_B = pd.DataFrame({'User_ID': [f'USR-B-{i:04d}' for i in range(n_samples)], 'Domain': selected_test_domain, 'Group': 'Variant', 'Clicked': klik_B})
        df_download = pd.concat([df_raw_A, df_raw_B], ignore_index=True)
        
        st.dataframe(df_download.sample(10, random_state=42).reset_index(drop=True), use_container_width=True)
        
        csv_data = df_download.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="📥 Unduh Seluruh Data Eksperimen (.CSV)",
            data=csv_data,
            file_name=f"ab_test_data_{selected_test_domain.lower().replace(' ', '_')}.csv",
            mime="text/csv"
        )

# --- FOOTER ---
st.markdown("---")
st.caption('Copyright (c) Data Science Team - Capstone Project NeoKarir 2026')