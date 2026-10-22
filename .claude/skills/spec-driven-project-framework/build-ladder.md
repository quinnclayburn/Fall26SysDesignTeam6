# Build Ladder: From Template to Final Design

How a project goes from a freshly copied template to a built design, with a front-end test build in the middle and tiered features driving each rung. The full operating instructions are in `template/docs/reference/build-and-test-guide.md`; this is the map.

```
Template copied
   │  fill Business Case, Spec (P1/P2/P3 scenarios), Style Guide, Data & API, Plan (ADR-00), Tasks
   ▼
Rung 1  Prototype test      Tier 1 scenario, faked; 3–5 users; update Evidence; fix Spec
   ▼
Rung 2  Validation build    FRONT END over simulated data, Tier 1 tasks only, folder validation/
   │                        output: gap log in tasks.md §3
   ▼
Rung 3  Fix and re-run      owners fix docs, bump versions, fresh agent session, same tasks
   ▼
Rung 4  Final build         repo root; P1 → gate → P2 → gate → P3; real backend swaps in behind the same contract
```

## What the front-end test build must prove

- Every entity and field name matches `data-api-design.md` §1; one sample-data file per entity.
- One data-access module holds one function per endpoint (§4), returning the documented response shape and error codes; screens call only those functions.
- Roles and login are stubbed (a "log in as…" picker), with no real credentials.
- Screens are exactly the Plan's list, styled by the Style Guide.
- Anything that can't be proven in a simulation is marked **simulated** with its requirement ID in the Build Notes.

The front-end technology is whatever ADR-00 records. For non-screen projects, stub the outputs instead (see `adapting.md`).

## Tier gates

| Gate | Passes when |
|---|---|
| Tier 1 → Tier 2 | All P1 tasks Done; all P1 acceptance tests re-run; screens and data match the docs; recorded in `tasks.md` |
| Tier 2 → Tier 3 | Same for P2 |
| Final | Every built tier passed; Build Notes list where it runs, what's simulated, and what's not built (P2/P3 only) |

## Moving to a real backend

Swap the data-access module for real calls without changing any field name, status code, or response shape. If one must change, change `data-api-design.md` first, bump its version, re-approve it, then update the code and re-run the affected acceptance tests.
