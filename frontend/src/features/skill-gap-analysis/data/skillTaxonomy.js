export const skillTaxonomy = {
  "Data Science & Artificial Intelligence": {
    "Programming": ["Python", "R", "C++", "Java", "Bash", "FastAPI", "Go", "JavaScript"],
    "Machine Learning": ["Machine Learning", "TensorFlow", "Scikit-Learn", "PyTorch", "NLP", "LLM", "Generative AI", "Deep Learning", "Computer Vision"],
    "Data Analysis": ["SQL", "Pandas", "Tableau", "Excel", "Power BI", "MySQL", "Data Analysis", "Hadoop", "Spark"],
    "DevOps & Deployment": ["Docker", "Git", "GitHub", "AWS", "Azure", "GCP", "Kubernetes", "Linux", "CI/CD"],
    "Project Management": ["Agile", "Scrum", "Agile/Scrum", "Jira", "JIRA", "Trello", "Communication", "Troubleshooting"]
  },
  "Mobile Development": {
    "Mobile Frameworks": ["Flutter", "React Native", "Android", "iOS", "React", "Android Studio", "Xcode"],
    "Programming Languages": ["Kotlin", "Swift", "Java", "Dart", "JavaScript", "Go"],
    "Backend Integration": ["Firebase", "API", "REST API", "RESTful API", "JSON", "GraphQL", "MVVM", "MySQL", "SQLite"],
    "DevOps & Version Control": ["Git", "GitHub", "GitLab", "Docker", "CI/CD"],
    "Process & Workflow": ["Agile", "Scrum", "Agile/Scrum", "QA", "Troubleshooting", "UI/UX", "Figma"]
  },
  "Cyber Security": {
    "Security Tools": ["Wireshark", "Burp Suite", "Kali Linux", "Cryptography", "Cyber Security", "Penetration Testing", "Nmap", "Metasploit", "OWASP", "SIEM", "Splunk"],
    "Scripting & Automation": ["Python", "Bash", "SQL", "API", "JavaScript", "Go"],
    "Network & OS": ["Linux", "Networking", "Routing", "Hardware", "CCNA", "Switching", "Infrastructure", "System Architecture", "Windows Server"],
    "Cloud & Management": ["Docker", "AWS", "Azure", "Cloud Computing", "GCP", "Excel", "IT Support"],
    "Process & Compliance": ["Agile", "Scrum", "Agile/Scrum", "Git", "GitHub", "Gite", "Security Compliance", "Troubleshooting", "QA", "Presentation", "Jira", "JIRA", "Trello"]
  },
  "Cloud & DevOps": {
    "Cloud Platforms": ["AWS", "Azure", "GCP", "Cloud Computing", "DigitalOcean"],
    "Containerization": ["Docker", "Kubernetes"],
    "Automation (CI/CD)": ["CI/CD", "Jenkins", "Terraform", "Ansible", "GitLab CI"],
    "Scripting & Database": ["Python", "Bash", "SQL", "Linux", "MySQL", "PostgreSQL", "Redis", "MongoDB", "Go", "Node.js"],
    "Version Control & Mgmt": ["Git", "GitHub", "GitLab", "Agile", "Scrum", "Agile/Scrum", "Jira", "JIRA", "Trello", "Networking", "Troubleshooting"]
  },
  "UI/UX Design": {
    "Design & Wireframing": ["Figma", "Adobe XD", "Wireframing", "Sketch", "UI/UX", "CSS", "HTML", "Tailwind", "Canva"],
    "User Research": ["Miro", "Maze", "User Research", "Usability Testing", "InVision"],
    "Prototyping": ["Prototyping", "Design Sprint", "Mockup"],
    "Frontend Basics": ["JavaScript", "React", "Vue", "Bootstrap"],
    "Project Management": ["Agile", "Scrum", "Agile/Scrum", "Git", "GitHub", "Docker", "Jira", "JIRA", "Trello", "QA", "Communication"]
  },
  "Quality Assurance (QA) & Testing": {
    "Testing Tools": ["Selenium", "Postman", "Cypress", "Appium", "Software Testing", "Automation", "Katalon", "JMeter", "JUnit", "Jest", "Playwright"],
    "Programming & Scripting": ["Python", "Java", "JavaScript", "SQL", "TypeScript", "Go", "JSON"],
    "Methodologies": ["Manual QA", "Automation QA", "QA", "Technical Documentation", "Unit Testing"],
    "DevOps Integration": ["Docker", "CI/CD", "Git", "GitHub", "Azure", "Jenkins", "API"],
    "Agile Process": ["Agile", "Scrum", "Agile/Scrum", "Jira", "JIRA", "Trello", "Troubleshooting", "UI/UX", "Communication"]
  },
  "Web Development": {
    "Frontend Development": ["React", "JavaScript", "HTML", "CSS", "HTML/CSS", "Vue", "Tailwind", "Tailwind CSS", "TypeScript", "Bootstrap", "Next.js"],
    "Backend Architecture": ["Node.js", "Python", "PHP", "Laravel", "Go", "Java", "API", "REST API", "Express"],
    "Database Management": ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase"],
    "DevOps & Infrastructure": ["Docker", "Git", "GitHub", "CI/CD", "Linux", "AWS", "GCP", "Azure"],
    "Project Management": ["Agile", "Scrum", "Agile/Scrum", "Jira", "JIRA", "Trello", "Troubleshooting", "Communication"]
  }
};

export const normalizeDomain = (domain) => {
  if (!domain) return "Web Development";
  const domainLower = domain.toLowerCase();
  
  if (domainLower.includes("quality assurance") || domainLower.includes("qa") || domainLower.includes("testing")) {
    return "Quality Assurance (QA) & Testing";
  }
  if (domainLower.includes("devops") || domainLower.includes("cloud")) {
    return "Cloud & DevOps";
  }
  if (domainLower.includes("data science") || domainLower.includes("ai") || domainLower.includes("analytics") || domainLower.includes("artificial")) {
    return "Data Science & Artificial Intelligence";
  }
  if (domainLower.includes("mobile") || domainLower.includes("android") || domainLower.includes("ios")) {
    return "Mobile Development";
  }
  if (domainLower.includes("ui") || domainLower.includes("ux") || domainLower.includes("design")) {
    return "UI/UX Design";
  }
  if (domainLower.includes("cyber") || domainLower.includes("security")) {
    return "Cyber Security";
  }
  
  return "Web Development";
};

export const getSkillCategory = (domain, skillName) => {
  const normDomain = normalizeDomain(domain);
  const domainData = skillTaxonomy[normDomain];
  if (!domainData) return "Umum";
  
  const skillLower = skillName.toLowerCase().trim();
  
  for (const [category, skills] of Object.entries(domainData)) {
    const skillsLower = skills.map(s => s.toLowerCase().trim());
    if (skillsLower.includes(skillLower)) {
      return category;
    }
  }
  
  // Fallback: substring matching
  for (const [category, skills] of Object.entries(domainData)) {
    for (const s of skills) {
      const sLower = s.toLowerCase().trim();
      if (skillLower.includes(sLower) || sLower.includes(skillLower)) {
        return category;
      }
    }
  }
  
  return "Umum";
};
