import type { ResearchArticle } from "./research";

export const technicalStudies: ResearchArticle[] = [
  {
    slug: "two-tower-civicmatch",
    title: "Two Towers, One Connection: Building CivicMatch",
    author: "Achint Pal Singh",
    date: "2026-09-15",
    readingTimeMinutes: 8,
    summary:
      "A reproducible recommendation experiment across three public government catalogs, with trained user and item vectors and an honest look at synthetic evaluation.",
    tags: ["Two-tower models", "Recommendations", "NumPy", "Open data"],
    categories: ["Vector Search", "AI Models"],
    status: "Research",
    excerptMarkdown: `## Abstract
CivicMatch explores a practical question: can a compact two-tower retriever connect a person's interests with useful public resources? The implementation trains separate user and item encoders across Toronto recreation programs, Canadian climate and energy datasets, and Canadian employment and skills datasets. The catalogs are real; the preference profiles and relevance labels are simulated. This distinction defines what the experiment can establish.

[Try the working demo](/projects/civicmatch) · [Read the training code](https://github.com/achintarora-ai/Achint_Ai/tree/main/projects/civicmatch)

## I. Why two towers?
A user tower turns a preference profile into a vector. An item tower turns catalog features into another vector in the same space. Their dot product supplies a retrieval score. Training changes both encoders so a positive item scores above competing items. Item vectors can be computed ahead of time; only the user vector needs computing when a request arrives.

LinkedIn documents a related architecture in its content search system: separate query and post towers, with precomputed post embeddings and approximate nearest-neighbor retrieval [1]. CivicMatch borrows the architectural idea, not LinkedIn's model, data or production results. Its small catalogs use exact scoring instead of an approximate index.

Netflix is also an important reference point for personalization research [2]. That broader connection does not establish that Netflix uses this exact two-tower implementation. Recommendation systems evolve and contain many components; a company name is not evidence of architectural equivalence.

## II. Three problems, three catalogs
| Track | Public source | Items in snapshot | What is recommended |
| --- | --- | --- | --- |
| Community recreation | City of Toronto registered programs [3] | 500 | Activities to investigate with the provider |
| Climate and energy | Government of Canada catalog [4] | 277 | Datasets for exploration and analysis |
| Jobs and skills | Government of Canada catalog [4] | 291 | Employment, training and labour datasets |

The snapshot was retrieved on September 16, 2026 UTC. Recreation titles are deduplicated and capped at 500, so this is not the complete city inventory. The other tracks recommend data resources, not live job openings or personalized climate advice. Raw responses, source metadata and hashes are recorded by the training pipeline. Consult each source's terms before reusing its contents. No claim is made that these datasets have never been used by another researcher.

## III. Reproducible method
Each track uses a vocabulary of up to 80 catalog terms plus category features. Features are normalized. The towers are independent single-layer tanh encoders with 24 output dimensions. A full-catalog softmax loss, temperature 0.2, and Adam updates train both matrices for 180 epochs with seed 42.

For each of 600 simulated users, the generator mixes three item feature vectors and adds noise. A content-similarity teacher identifies ten relevant items; the highest-scoring one supplies the training target. Users are split into 420 training, 90 validation and 90 test profiles. The item catalog is shared across the splits: this tests unseen simulated users, not unseen items or temporal generalization.

The browser demo encodes typed interests with the same vocabulary, applies the trained user weights, and scores saved item vectors. Typed queries differ from the synthetic training distribution, so the demo should be explored critically rather than treated as a calibrated service.

## IV. Measured results
Recall@10 is the fraction of ten synthetic relevant items recovered in the ten returned results, averaged over the 90 test profiles.

| Track | Trained model | Untrained towers | Random retrieval | Content teacher |
| --- | --- | --- | --- | --- |
| Recreation | 0.632 | 0.011 | 0.023 | 1.000 |
| Climate / energy | 0.587 | 0.020 | 0.037 | 1.000 |
| Jobs / skills | 0.634 | 0.012 | 0.041 | 1.000 |

These are actual outputs of the committed training run. The content teacher achieves 1.000 by construction because it defines the labels. The neural model improves on random and untrained retrieval, but does not improve on that teacher. The experiment demonstrates learning and inference mechanics; it does not prove a superior recommendation method. One seed and a small synthetic holdout do not establish statistical robustness.

## V. What the engineering tests establish
Numerical finite-difference tests check gradients for both towers. A second test verifies that cached item vectors produce the same scores as directly encoded items. A third checks the Recall@10 denominator. Saved artifacts include learned weights, item vectors, vocabulary, catalog provenance and run metrics. These checks establish implementation consistency, not real-world usefulness.

## VI. Before recommending to real people
A production recreation system would need availability, geography, age eligibility, accessibility and cost constraints before ranking. A real evaluation would require consented interaction data, exposure-aware negatives, a temporal holdout, subgroup analysis and a plan for cold-start items. For the data-discovery tracks, human relevance judgments would be more meaningful than the current teacher labels. None of those results are claimed here.

The next experiment should compare strong lexical and content baselines on independently labeled queries. If a simpler method wins, it should remain the default. The value of two towers must be demonstrated for the workload, not assumed from industry adoption.

**Publication status:** Independent portfolio experiment, developed with AI assistance. Not peer-reviewed or IEEE-published. References use an IEEE-style numbered format. Training used public catalog content and simulated preferences, not private user records.

## References
[1] X. Yang et al., “Introducing Semantic Capability in LinkedIn's Content Search Engine,” LinkedIn Engineering, Aug. 14, 2024. [Official engineering article](https://www.linkedin.com/blog/engineering/search/introducing-semantic-capability-in-linkedins-content-search-engine).

[2] Netflix, “Netflix Research.” [Research program](https://research.netflix.com/).

[3] City of Toronto, “Registered Programs and Drop In Courses Offering.” [Open Data catalog](https://open.toronto.ca/dataset/registered-programs-and-drop-in-courses-offering/).

[4] Government of Canada, “Open Government.” [Data catalog](https://open.canada.ca/en/open-data).
`,
  },
  {
    slug: "evaluating-rag-beyond-retrieval",
    title: "Evaluating RAG Beyond Retrieval Accuracy",
    readingTimeMinutes: 6,
    summary:
      "A reproducible evaluation protocol that separates retrieval quality, answer grounding, and system reliability.",
    tags: ["RAG", "evaluation", "research methods"],
    categories: ["RAG", "Vector Search"],
    status: "Research",
    pdfPath: "/research/rag-evaluation-protocol.pdf",
    excerptMarkdown:
      "## Abstract\nRetrieval-augmented generation connects language generation to external evidence [1], but a relevant passage does not guarantee a correct answer. This technical study proposes an evaluation protocol that separates retrieval, generation, and operational behavior. Its contribution is an experimental design, not a new algorithm or a completed benchmark. No measured results are claimed.\n\n**Index terms:** retrieval-augmented generation, evaluation, grounded generation, reproducibility.\n\n## I. Problem formulation\nConsider an assistant answering questions over a versioned document collection. Failures can arise because the retriever misses evidence, the generator misuses available evidence, or the application retrieves material outside the user's access scope. A single aggregate answer score obscures these different causes.\n\nRagas describes reference-free evaluation across context relevance, faithfulness, and answer quality [2]. Such automated judgments are useful for iteration, but this proposed protocol also includes a human-reviewed holdout set. A model judge can share the biases and blind spots of the model it evaluates.\n\n## II. Proposed experimental design\nFreeze the corpus snapshot, parser, chunking policy, embedding revision, index settings, prompt, and generation model. Record a checksum for the corpus and a configuration identifier for every run. Split by source document or document family to reduce near-duplicate leakage between development and evaluation.\n\nConstruct questions in four groups: directly answerable, requiring multiple passages, unanswerable from the corpus, and adversarial or access-restricted. Store expected evidence identifiers and an explicit answerability label. Keep the final holdout inaccessible during prompt tuning.\n\nCompare a lexical baseline, dense retrieval, and a hybrid configuration. Change one component at a time; otherwise a better answer cannot be attributed to a better retriever. Evaluate identical queries and report paired differences with uncertainty intervals rather than just a leaderboard.\n\n## III. Measurement contract\n| Layer | Measure | Interpretation |\n| --- | --- | --- |\n| Retrieval | Recall@k | Fraction of annotated relevant units recovered |\n| Ranking | nDCG@k | Whether highly relevant evidence appears early |\n| Generation | Supported-claim fraction | Claims supported by retrieved evidence |\n| Citations | Citation precision | Cited passages actually supporting the associated claim |\n| Abstention | False-answer rate on unanswerable questions | Unsupported answers when evidence is absent |\n| Operations | p50/p95 latency, errors, cost per successful task | User-visible reliability and resource use |\n\nDefine the evidence unit before scoring. Passage-level and document-level recall answer different questions. Review a sample of citation judgments manually and record disagreement. A claim without a citation should not silently disappear from the denominator.\n\n## IV. Release decision\nPre-register acceptance criteria against the intended use case. A candidate should pass the access-isolation tests and avoid materially worsening unsupported-answer rates before speed or cost improvements count as a release benefit. Report cold and warm runs separately, and retain failed requests in reliability reporting.\n\nFor an illustrative test plan, a team might allocate 200 held-out queries across the four groups and repeat each configuration with three seeds. These are proposed design parameters, not an executed experiment or a statistically guaranteed sample size. Power and coverage depend on expected effect size and the risk of missed failures.\n\n## V. Limitations and next steps\nThis protocol cannot establish performance until implemented on a representative corpus. Labels may be incomplete, automated graders imperfect, and production traffic different from a fixed test set. Next steps are to publish an appropriately licensed corpus manifest, annotation guide, run configurations, and per-query outputs; then reproduce the comparison with uncertainty estimates.\n\n**Publication status:** Independent technical study, prepared for this portfolio with AI assistance. Not peer-reviewed, IEEE-published, or an IEEE compliance certification. Numbered references use an IEEE-style presentation.\n\n## References\n[1] P. Lewis et al., “Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks,” 2020. [arXiv:2005.11401](https://arxiv.org/abs/2005.11401).\n[2] S. Es, J. James, L. Espinosa-Anke, and S. Schockaert, “Ragas: Automated Evaluation of Retrieval Augmented Generation,” 2023, revised 2025. [arXiv:2309.15217](https://arxiv.org/abs/2309.15217).",
    author: "Achint Pal Singh",
    date: "2026-09-15",
  },
  {
    slug: "bounded-agent-workflows",
    title: "Designing Bounded Agent Workflows",
    readingTimeMinutes: 5,
    summary:
      "An engineering note on tool permissions, explicit state transitions, idempotency, and evaluating agent behavior.",
    tags: ["Agents", "reliability", "system design"],
    categories: ["Agents", "Governance"],
    status: "Guide",
    excerptMarkdown:
      "## Abstract\nAn agent's ability to choose actions does not establish permission to execute them. This article develops a proposed runtime design for bounded tool execution, drawing on ReAct's interleaving of reasoning and action [1] and the lifecycle risk-management perspective of NIST's Generative AI Profile [2]. The design is an engineering synthesis, not a claim of standards compliance or a tested security guarantee.\n\n## I. Separate planning from execution\nReAct demonstrates a pattern in which a model reasons and interacts with an environment [1]. In an application, a plan should be treated as a proposal. A deterministic execution layer should validate tool names, schemas, identities, and permitted resources before running an action.\n\nUse a narrow contract for each tool: inputs, effects, authorization scope, timeout, retry policy, and observable completion state. Reading a file and sending an email have different consequences and should have different execution policies. Retrieved content belongs in the evidence channel; it cannot grant new permissions.\n\n## II. Make state explicit\nA useful proposed lifecycle is: proposed, validated, awaiting approval when required, executing, succeeded, failed, or outcome unknown. Record transitions with a task ID, actor, timestamp, tool version, and sanitized result.\n\n“Outcome unknown” matters. If a network timeout follows a payment or message request, automatically retrying can duplicate the action. The executor should query an operation identifier or reconcile external state before deciding whether to retry. Where available, pass an idempotency key whose lifetime matches the logical action.\n\n## III. Bound the loop\nSet a maximum number of tool calls, an elapsed-time budget, and a resource budget. Stop when required context is missing, an approval expires, or a task reaches an unrecoverable error. A clear partial result is more useful than an agent cycling indefinitely.\n\nMemory writes should also be scoped. Store the provenance and owner of each durable fact, distinguish observation from inference, and support correction or removal. An old preference should not become permanent authorization for unrelated actions.\n\n## IV. Evaluation matrix\n| Test | Expected behavior |\n| --- | --- |\n| Tool output contains new instructions | Treat as data, preserve original task scope |\n| Invalid resource or tenant identifier | Reject before execution |\n| Timeout after a write | Reconcile outcome before retry |\n| Budget exhausted | Stop with a recoverable status |\n| Conflicting memory entry | Preserve provenance and request resolution when needed |\n| Expired approval | Prevent the dependent action |\n\nMeasure task success together with unauthorized-action rate, duplicate side effects, recovery success, and time to safe termination. Test deterministic execution controls independently of the model. A natural-language promise is not a substitute for a permission check.\n\n## V. Limits\nThese controls reduce particular failure modes; they do not prove that an autonomous system is safe in every environment. Tool behavior, identity boundaries, and real-world effects still require application-specific review. The NIST profile provides voluntary risk-management guidance [2]; this article does not certify conformance.\n\n**Publication status:** Independent engineering article, prepared with AI assistance. No new experimental results or peer-review status are claimed.\n\n## References\n[1] S. Yao et al., “ReAct: Synergizing Reasoning and Acting in Language Models,” ICLR, 2023. [arXiv:2210.03629](https://arxiv.org/abs/2210.03629).\n[2] C. Autio et al., “Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile,” NIST AI 600-1, 2024. [doi:10.6028/NIST.AI.600-1](https://doi.org/10.6028/NIST.AI.600-1).",
    author: "Achint Pal Singh",
    date: "2026-09-15",
  },
  {
    slug: "cost-per-successful-ai-task",
    title: "The Cost of a Successful AI Task",
    readingTimeMinutes: 4,
    summary:
      "A practical measurement framework for comparing AI workflows without hiding retries, retrieval, or human review.",
    tags: ["AI Economics", "RAG", "evaluation"],
    categories: ["AI Economics", "RAG"],
    status: "Guide",
    excerptMarkdown:
      "## Abstract\nA low token bill does not necessarily mean a low-cost AI product. This article proposes a task-level accounting model that includes failed attempts, retrieval, tools, and human review. All numeric examples are hypothetical. No current vendor pricing or measured production savings are asserted.\n\n## I. Define success before counting cost\nFor a document assistant, success might mean a correct response with supporting evidence, completed within a latency target and without disclosing unauthorized information. A fluent answer alone is not sufficient. Separating retrieval and generation quality follows the layered evaluation problem described in Ragas [1].\n\nDefine the success rubric before comparing models. Otherwise a cheaper workflow can appear efficient simply because it produces more low-quality answers that are mistakenly counted as successes.\n\n## II. Account for the whole workflow\nFor one evaluation window, let total cost include model input and output, embedding work, search and storage, external tools, infrastructure, and attributable review time. Divide this by the number of tasks meeting the predefined success rubric.\n\n**Cost per successful task = total attributable cost / successful tasks.**\n\nCount retries and failed requests in the numerator. If no task succeeds, report the measure as undefined, alongside total spend and zero successes. Do not display zero cost per success.\n\nDistinguish marginal cost from allocated fixed cost. A prototype using an already-running machine may have a small marginal bill while still consuming resources. State the traffic volume and allocation rule used.\n\n## III. Worked example\nSuppose workflow A spends $18 across 100 attempts and completes 80 tasks successfully. Its cost per success is $0.225. Workflow B spends $24 and completes 96 tasks successfully, yielding $0.25. B costs more per successful task in this example, although it completes more tasks. Whether that improvement is worthwhile depends on the consequences of failure and the service requirements.\n\nThese are arithmetic examples, not measurements or a model ranking. Adding human rework could change the ordering; that cost needs to be measured rather than assumed.\n\n## IV. Design an informative comparison\nRun the same held-out tasks through each workflow. Log model revision, prompt version, input/output tokens, cache behavior, retrieval time, tool calls, retry counts, and final outcome. Separate interactive and batch workloads. Report latency percentiles alongside success rate, cost per success, and the evaluation rubric.\n\nUse a sensitivity analysis for traffic, context length, cache hit rate, and review time. Fixed infrastructure amortization can make a system attractive at one workload and expensive at another. Recheck provider prices at the time of budgeting.\n\n## V. Limitations\nSuccess labels require judgment. Small evaluation sets can produce unstable rankings, and accounting conventions can obscure shared infrastructure costs. This framework proposes what to measure; it does not establish that one model, provider, or architecture is best.\n\n**Publication status:** Independent technical article, prepared with AI assistance; not peer-reviewed. Illustrative calculations only.\n\n## References\n[1] S. Es et al., “Ragas: Automated Evaluation of Retrieval Augmented Generation,” 2023, revised 2025. [arXiv:2309.15217](https://arxiv.org/abs/2309.15217).",
    author: "Achint Pal Singh",
    date: "2026-09-15",
  },
];
