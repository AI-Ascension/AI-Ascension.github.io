# Proposed Pages artifact allowlist

Status: proposal only. The deployed workflow still uploads the repository root;
this document does not authorize, implement, or imply a public-surface change.

## Traced current public inputs

The HTML entry points are `index.html`, `404.html`, `architecture.html`,
`contributing.html`, `evidence.html`, `proof.html`, `recipes.html`, and
`repositories.html`. Their local navigation and resource links require:

- `assets/`, including identity images, CSS, JavaScript and the identity
  manifest referenced from the home page;
- `robots.txt`, `sitemap.xml`, and `.nojekyll`;
- `recipes/gateway-lease-fence/fixture.json`, whose exact bytes are embedded in
  the proof page and checked by `tests/site.test.cjs`;
- `recipes/gateway-lease-fence/` and `recipes/mcp-seam/` source, locks and
  fixtures, which `validate.yml` rebuilds to demonstrate the public recipes;
- `VERIFICATION.md`, `NOTICES.md`, and `LICENSE` when they are linked or
  intentionally published as public evidence/notices.

Repository-internal CI, tests, workflow definitions, source-control metadata,
and unreviewed build products are not public-site inputs. The live root upload
currently exposes more than this proposal; removing material can break an
external bookmark or evidence link and therefore requires the owner decision
below.

## Required owner decision before any enforcement

1. Approve the exact retained evidence/document paths, including whether recipe
   source and verification material remain browsable.
2. Run a link inventory against the proposed artifact and verify all externally
   referenced evidence URLs and Pages routing behavior.
3. Change `upload-pages-artifact` only in a reviewed change with a deliberate
   negative test showing an excluded internal path is absent while each listed
   public input remains present.
4. Roll back by restoring the previous root-artifact upload if public links or
   evidence consumers fail.

Until then the existing same-source validation dependency is the active safety
control; this proposed allowlist is intentionally not a deployment gate.
