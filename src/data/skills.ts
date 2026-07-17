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
