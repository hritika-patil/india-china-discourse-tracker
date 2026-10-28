# Data and editorial guide

The public website reads `data/records.json`, and `data/records.csv` offers an export. Keep these two files aligned. Both are UTF-8 encoded (CSV includes a BOM for Excel compatibility).

## Field guide

| Field | Meaning |
|---|---|
| `id`, `masterId` | Unique claim record and internal master reference |
| `year`, `date`, `datePrecision` | Chronology; distinguish month-only or uncertain dates |
| `category` | Claim-attributed category: Government & CCP / Academia & think tanks / State media |
| `publicationCategory` | Host's broad category, which may differ from the speaker's |
| `institution` | Publication host, not necessarily the attributed author's employer |
| `attributedVoice` | Official, scholar or media author who makes the claim |
| `claimType`, `documentType` | Genre of claim and document |
| `title`, `language` | Source title and language of the underlying publication |
| `topic`, `framing` | Controlled descriptive issue / frame |
| `anchor` | Short original-source evidence anchor, or an English-language anchor when source is in English |
| `interpretation` | Researcher's English paraphrase, not a verbatim translation |
| `sourceUrl`, `access` | Link to the original or clearly identified host, and accessible source type |
| `reviewStatus`, `reviewedOn` | Researcher's review status and date |
| `caveat` | Attribution, date, republication, source and interpretation limitations |

## Coding distinctions

- **Official statement quoted in a newspaper:** Code the official claim under government, and retain the publication as host.
- **Scholar quoted in a news report:** Code the scholar's attributable assessment under academia; do not treat it as the outlet's editorial position.
- **Signed editorial:** Can be coded as state-media commentary if it directly expresses the author's/outlet's frame.
- **Mixed framing:** Some statements contain both cooperation and competition. The current pilot encodes one primary frame for browsing, and explicitly retains qualifications.
- **Data limitations:** Do not treat counts of pilot records, topics or coded frames as prevalence of attitudes in China or evidence of causal changes.

## Minimal new JSON record example

```json
{
  "id": "PV032",
  "masterId": "MNEW",
  "year": 2026,
  "date": "2026-10-20",
  "datePrecision": "Day",
  "category": "Academia & think tanks",
  "publicationCategory": "Academia & think tanks",
  "institution": "[Verified source host]",
  "attributedVoice": "[Named academic or institutional author]",
  "claimType": "Academic assessment",
  "documentType": "Article",
  "title": "[Exact title]",
  "language": "Chinese",
  "topic": "Strategic autonomy",
  "framing": "Mixed",
  "anchor": "[Short supporting Chinese-language passage]",
  "interpretation": "[Attributed, evidence-based paraphrase]",
  "sourceUrl": "https://example.org/source",
  "access": "Full page",
  "reviewStatus": "Researcher-reviewed excerpt",
  "reviewedOn": "2026-10-29",
  "caveat": "[Any limitations]"
}
```

The example above is a schema template, **not a real source**. Replace all bracketed fields and the example URL before publishing.

## Internal and public data separation

Keep the legacy master XLSX and unverified source queue private in your working storage. Only move a row into the public JSON after verifying its URL, attribution and excerpts. A record can remain internally useful even when it is not ready for publication.
