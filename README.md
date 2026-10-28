# India in China's Strategic Discourse Tracker

A self-contained, no-build, GitHub Pages website for exploring researcher-reviewed Chinese government, academic and state-media claims about India's strategic role, 2019–2026.

**Current status:** Website prototype. Its source-linked dataset is an *exploratory, purposive sample*, not a representative measure of discourse, and no independent inter-coder assessment has been completed.

## Contents

```text
china-india-discourse-site/
├── index.html                 # Overview, topic chart, year/category chart, featured sources
├── explore.html               # Searchable, filterable and downloadable source library
├── timeline.html              # Eight-year chronology with source links
├── methodology.html           # Codebook, methodology and publication caveats
├── 404.html                   # Friendly not-found page
├── .nojekyll                  # Use static HTML without Jekyll processing
├── data/
│   ├── records.json           # Data powering the website
│   └── records.csv            # Spreadsheet-friendly export
└── assets/
    ├── css/style.css          # Responsive design
    ├── js/site.js             # Charts, filters, search and CSV export
    └── mark.svg               # Locally drawn icon
```

There is **no npm install, Python hosting service, paid account or API key**. The website loads `data/records.json` directly in the browser. It uses relative paths to work at `https://USERNAME.github.io/REPOSITORY/`.

## Publish on GitHub Pages (free)

1. Go to https://github.com/new and create a **public** repository, for example `india-china-discourse-tracker`.
2. Download and **extract** the ZIP file. Upload the **contents of this folder** to the repository root. `index.html` must be directly in the root, not inside another `china-india-discourse-site` folder.
   - On GitHub: **Add file → Upload files**, drag in the extracted files and folders, and commit to `main`. Alternatively use Git/GitHub Desktop.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**. Choose `main` and `/(root)`, then click **Save**.
5. Your website will appear at `https://YOUR-USERNAME.github.io/india-china-discourse-tracker/` (replace the placeholders). This is an example address, not a deployed link.
6. You can update your website by editing and committing the public data and site files. GitHub Pages republishes branch changes.

Official GitHub documentation: https://docs.github.com/en/pages/quickstart

**Privacy:** Everything pushed to a public repository is public. The bundled sample has only public-source URLs and research annotations. Do not upload the internal 172-source inventory, private research notes, credentials or confidential drafts unless you explicitly intend to publish them.

## Preview locally

Opening `index.html` by double-clicking may block `fetch('./data/records.json')` because browsers restrict file-based fetches. Instead open a terminal inside this folder and run:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000 . (Or use VS Code Live Server.)

## Update the dataset

1. Review the original document and confirm the **attributed voice**, **publication host**, **date**, **institutional category**, **topic** and **framing**.
2. Add a record to `data/records.json` in the same structure as existing items. Each record needs a unique `id`, original `sourceUrl` and source-attributed interpretation. Keep a date-precision flag when relevant.
3. Keep `data/records.csv` synchronised (see `DATA_GUIDE.md`).
4. Review the changes locally, then commit the updated files.
5. Do not use year-level claim proportions as representative trends unless you change the sampling design and document that methodology.

### How this starter sample was selected

31 distinct source-linked entries from the **Priority Reviewed Claims** sheet in `india_china_strategic_discourse_MASTER_verified_queue_2026-10-29.xlsx`. One source per entry; evidence was previously subjected to researcher-led spot checks. Original claim comments and caveats are retained. 2024 record `PV024` is coded as academic commentary because its claim is attributed to a scholar interviewed in *The Paper*. These entries **have not been independently double-coded**. The remaining records in the 172-URL master inventory are **not included** in this public prototype.

The current dashboard charts **sample coverage** and **research topics**. It intentionally does not display a sentiment score or infer population-level trends.

## Website content and branding

The site is marked as an independent research prototype. It does not claim institutional affiliation or approval. You can add approved PIC branding or an institutional footer later, after clearance. The site does not collect visitor input, require login, or call third-party analytics.

## Next expansion ideas

- Manually review and import more source entries (including under-sampled 2026 coverage).
- Add a separate industry/business collection once a comparable sample exists.
- Introduce multi-label coding rather than treating a document's primary frame as its only perspective.
- Add a downloadable methodology protocol and researcher-facing changelog.
- Create a controlled update workflow with review before publication.
