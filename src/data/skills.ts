export type SkillGroup = {
  id: string;
  title: string;
  description: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "programming-backend",
    title: "Programming and Backend",
    description: "Building APIs and application backends that power AI products.",
    items: [
      "Python",
      "SQL",
      "FastAPI",
      "Flask",
      "Django",
      "REST APIs",
      "API integration",
      "Object-oriented programming",
    ],
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Turning raw data into analysis-ready features and insights.",
    items: [
      "NumPy",
      "Pandas",
      "Data cleaning",
      "Exploratory data analysis",
      "Feature engineering",
      "Probability",
      "Probability distributions",
      "Central limit theorem",
      "Statistical reasoning",
      "Data visualization",
      "Matplotlib",
      "Seaborn",
      "Power BI",
    ],
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "Classical ML workflows from preprocessing through evaluation.",
    items: [
      "Supervised learning",
      "Unsupervised learning",
      "Classification",
      "Regression",
      "Clustering",
      "Model selection",
      "Preprocessing",
      "Train/test splitting",
      "Cross-validation",
      "scikit-learn pipelines",
      "Model evaluation",
      "Model persistence with Joblib",
      "Inference workflows",
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Neural network foundations and experimentation frameworks.",
    items: [
      "Neural networks",
      "Perceptrons",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "MNIST experimentation",
      "Deep-learning terminology and training workflows",
    ],
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    description: "LLMs, retrieval systems, agents, and model evaluation.",
    items: [
      "Large Language Models",
      "Retrieval-Augmented Generation",
      "Semantic search",
      "Embeddings",
      "Vector databases",
      "Prompt engineering",
      "AI agents",
      "Model evaluation",
      "Model routing",
      "GPT-family integrations",
      "Claude integrations",
      "Gemini integrations",
      "OpenRouter",
    ],
  },
  {
    id: "mlops-engineering",
    title: "MLOps and Engineering",
    description: "Shipping, monitoring, and collaborating on AI systems.",
    items: [
      "Docker",
      "Git",
      "GitHub",
      "Branching strategies",
      "Pull requests",
      "Resolving merge conflicts",
      "CI/CD concepts",
      "Model deployment",
      "Monitoring",
      "Environment management",
      "Conda",
      "VS Code",
      "Cursor",
      "Cloud Code",
      "Google Colab",
    ],
  },
];

/** Official / recognizable logos via Simple Icons CDN where available. */
export const skillIconSlugs: Record<string, string> = {
  Python: "python",
  SQL: "mysql",
  FastAPI: "fastapi",
  Flask: "flask",
  Django: "django",
  NumPy: "numpy",
  Pandas: "pandas",
  "Power BI": "powerbi",
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  Keras: "keras",
  Docker: "docker",
  Git: "git",
  GitHub: "github",
  Conda: "anaconda",
  "VS Code": "visualstudiocode",
  Cursor: "cursor",
  "Google Colab": "googlecolab",
  OpenRouter: "openai",
  "GPT-family integrations": "openai",
  "Claude integrations": "anthropic",
  "Gemini integrations": "googlegemini",
  "scikit-learn pipelines": "scikitlearn",
  Databricks: "databricks",
};

export type LearningPlatform = {
  name: string;
  url: string;
  description: string;
  iconSlug: string;
};

export const learningPlatforms: LearningPlatform[] = [
  {
    name: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/",
    description:
      "Used for data structures, algorithms, Python, and interview-style practice during CS study.",
    iconSlug: "geeksforgeeks",
  },
  {
    name: "W3Schools",
    url: "https://www.w3schools.com/",
    description:
      "Reference learning for web fundamentals, SQL, and practical coding examples.",
    iconSlug: "w3schools",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/",
    description:
      "Problem-solving practice for algorithms, coding patterns, and technical interview readiness.",
    iconSlug: "leetcode",
  },
];

export const dataScienceHandbook = {
  title: "Data Science Journey Handbook",
  description:
    "A study handbook from Achint’s data science learning path — shared so aspiring data scientists can download and use it as a practical companion alongside coursework and projects.",
  path: "/resources/data-science-handbook.pdf",
  filename: "data-science-handbook.pdf",
};

export type CloudProvider = {
  id: string;
  name: string;
  knowledgeLevel: string;
  groups: { title: string; items: string[] }[];
};

export const cloudProviders: CloudProvider[] = [
  {
    id: "gcp",
    name: "Google Cloud",
    knowledgeLevel: "Hands-on through production deployment work",
    groups: [
      {
        title: "Compute",
        items: ["Compute Engine", "Cloud Run", "Cloud Functions"],
      },
      {
        title: "AI and ML",
        items: [
          "Vertex AI",
          "AutoML",
          "Vision AI",
          "Natural Language AI",
          "Speech-to-Text",
          "Text-to-Speech",
          "Translation AI",
        ],
      },
      {
        title: "Data",
        items: [
          "BigQuery",
          "Dataflow",
          "Dataproc",
          "Pub/Sub",
          "Data Fusion",
          "Cloud SQL",
          "Cloud Storage",
        ],
      },
      {
        title: "Networking",
        items: ["VPC", "Cloud Load Balancing", "Cloud DNS"],
      },
      {
        title: "Security and Operations",
        items: [
          "IAM",
          "Service accounts",
          "Secret Manager",
          "Cloud Monitoring",
          "Cloud Logging",
          "Cloud SDK",
        ],
      },
    ],
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    knowledgeLevel: "Working knowledge with research and platform comparison work",
    groups: [
      {
        title: "Compute and Applications",
        items: [
          "Virtual Machines",
          "App Service",
          "Azure Functions",
          "Container registries",
        ],
      },
      {
        title: "AI and Data",
        items: [
          "Azure Machine Learning",
          "AutoML",
          "Azure AI Foundry",
          "Azure Databricks",
          "Synapse Analytics",
          "Data Factory",
          "Azure SQL",
          "Blob Storage",
        ],
      },
      {
        title: "Networking and Identity",
        items: ["Virtual Network", "Load Balancer", "Microsoft Entra ID"],
      },
      {
        title: "DevOps and Monitoring",
        items: [
          "Azure CLI",
          "Azure Portal",
          "Azure Monitor",
          "Azure Pipelines",
          "Azure DevOps",
        ],
      },
    ],
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    knowledgeLevel: "Foundational / working knowledge",
    groups: [
      {
        title: "Core Services",
        items: [
          "EC2",
          "Lambda",
          "S3",
          "RDS",
          "VPC",
          "IAM",
          "SageMaker",
          "CloudWatch",
          "API Gateway",
          "Container and deployment concepts",
        ],
      },
    ],
  },
];
