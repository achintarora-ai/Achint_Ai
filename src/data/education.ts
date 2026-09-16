export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  range: string;
  start: string;
  end: string;
  logo?: string;
  grade?: string;
  activities?: string[];
  description: string;
  skills?: string[];
};

/** Education aligned to Achint's LinkedIn profile. */
export const education: EducationItem[] = [
  {
    id: "algoma",
    school: "Algoma University",
    degree: "Bachelor's degree, Computer Science",
    start: "September 2023",
    end: "April 2026",
    range: "September 2023 – April 2026",
    logo: "/images/education/algoma-university.png",
    activities: [
      "Computer Science Student Association",
      "Coding Club",
      "AI and Data Science projects",
      "Hackathons",
      "Research Initiatives",
      "Cloud Computing and Machine Learning communities",
    ],
    description:
      "Combined academic learning with industry experience at Predictive Tech Labs, applying AI technologies such as Python, Machine Learning, LLMs, Databricks, Azure, and GCP to real-world projects and enterprise use cases. Built a strong foundation in machine learning while contributing to research and applied AI systems work.",
    skills: [
      "Research Skills",
      "Python",
      "Machine Learning",
      "LLMs",
      "Databricks",
      "Azure",
      "GCP",
    ],
  },
];
