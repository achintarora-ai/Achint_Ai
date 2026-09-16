# Draft — review before posting

Two vectors. One useful connection.

I've been working with two-tower recommendation architectures, and I wanted to make the mechanics visible in a public-data experiment.

CivicMatch explores three use cases:
- discovering Toronto recreation activities;
- finding Canadian climate and energy data resources;
- finding workforce and learning-related government datasets.

One tower encodes a person's stated interests. The other encodes a catalog item. Item vectors are computed ahead of time; a query becomes a vector that retrieves nearby candidates.

I trained a small NumPy implementation, exported its embeddings, and compared it against random, untrained, and content-based retrieval. Both tower gradients are checked numerically.

The critical caveat: the catalogs are real, but the preferences are simulated. This is a reproducible engineering study, not a claim of improved outcomes for real residents. The content baseline is also the synthetic-label generator and outperforms the learned model.

That's the part worth sharing: not just a score, but what the score does and does not tell us.

Next: consented interaction data, richer eligibility constraints, and evaluation on genuinely held-out items.

Repository: https://github.com/achintarora-ai/Achint_Ai/tree/main/projects/civicmatch
Article: https://achint-ai.vercel.app/blogs/two-tower-civicmatch

#RecommendationSystems #MachineLearning #TwoTower #OpenData #AIEngineering
