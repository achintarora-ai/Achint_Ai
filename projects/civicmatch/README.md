# CivicMatch — a three-track two-tower retrieval lab

An independent, reproducible portfolio experiment by Achint Pal Singh. It trains separate user and item encoders using NumPy, exports item embeddings, and retrieves candidates with a dot product. This directory is self-contained and can become its own GitHub repository.

## The three problems

1. **Community recreation:** help residents discover activities in the City of Toronto recreation catalog.
2. **Climate and energy:** help researchers discover relevant Canadian government climate/energy data resources.
3. **Jobs and skills:** help learners and analysts discover government workforce, education, and labour-market data resources.

The last two tracks recommend datasets, not jobs, training enrollment, grants, or individual eligibility decisions.

## Quick start

Python 3.10+:

```sh
python -m venv .venv
# Activate .venv for your operating system.
pip install -r requirements.txt
python train.py --refresh
python -m unittest test_model.py
python recommend.py recreation --query swimming --category Aquatics
```

Without --refresh, training reuses the downloaded snapshot in data/catalogs.json. The released artifacts include all three trained models, retrieval exports, and metrics. On a fresh checkout, --refresh uses the newest available records; source changes can change the result. Original run hashes and retrieval catalogs are retained in artifacts. No API keys are needed.

## Architecture and objective

Item features combine an 80-token vocabulary with category one-hot features. Features are L2-normalized. Each independently trained tower computes tanh(xW), projecting into a shared 24-dimensional space. Full-catalog cross-entropy uses the highest-scoring simulated positive and a temperature of 0.2. Adam runs for 180 epochs with L2 regularization.

Offline: catalog → item features → item tower → cached item vectors.

Online: stated interests → query features → user tower → dot product → ranked source links.

This compact single-hidden-projection implementation illustrates decoupled encoders and offline indexing. It is not a production deep-learning platform. An exact matrix search is appropriate for hundreds of items; an ANN index would matter at much larger scale.

## Training data and leakage boundaries

The catalog records are real government data. **All 600 preference profiles per track are simulated.** Each profile mixes three catalog feature vectors and small noise. Content similarity generates the relevance labels. There are no observed clicks, residents, employment outcomes, or purchase histories.

Split: 420 train, 90 validation, 90 test users. Test users never update model weights. The item catalog is shared, so this is held-out-user evaluation, not a cold-item test. Vocabulary is derived from the known catalog. Hyperparameters are fixed; validation is reported, not used to select among repeated experiments.

Recall@10 measures overlap with ten synthetic relevant items. Compare random retrieval, untrained towers, trained towers, and the content-similarity oracle. The content oracle defines labels and reaches 1.0 by construction: beating it is not a meaningful goal here. The learned model demonstrates training and retrieval mechanics, not an improvement over a good content recommender.

See artifacts/metrics.json for exact measurements, snapshot hashes, source times, losses, and limitations. The numerical-gradient test independently checks both tower gradients.

## Data provenance

- City of Toronto CKAN: Registered Programs and Drop In Courses Offering, 16,529 rows retrieved in the initial run, deduplicated by activity title then capped at 500 items. This deterministic cap is not representative sampling.
- Government of Canada CKAN: package_search queries listed in each track's metrics. Climate: 277 unique resources; skills: 291.
- Initial retrieval: September 16, 2026 UTC; source modification timestamps differ.

Government resources are not “unused data.” No exclusive novelty or first-use claim is made. Provider permissions and license fields vary: Toronto's API returned “License not specified”; consult the linked catalog and applicable open-government terms before redistributing full source datasets. Raw source downloads are ignored by Git. Catalog metadata and source links in the demo remain attributed to their publishers.

## What remains before real deployment

Collect consented interaction data and useful negative examples; evaluate on real users and held-out items; validate eligibility, accessibility, location and availability constraints; review exposure fairness and feedback loops; add monitoring, model versioning and a representative ranking benchmark.

The recreation prototype does not enforce age, distance, price, dates, accessibility, or availability. Always verify those at the provider. Do not use its score as an eligibility determination.

## Publishing

Copy this directory into a new repository when its name and visibility are chosen. Do not include data/ or .venv/. The parent portfolio contains a browser demo and a sourced article; LINKEDIN-DRAFT.md is reviewable announcement copy and has not been posted.
