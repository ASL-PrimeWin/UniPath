UniPath Free-Tier Data Integration

Source: uploaded Google Sheets export:
UNIPATH - College basic info(Free)).csv

Integrated into data.js as structured institution records and programme entries.
The dataset contains 906 institution records and 2,661 programme rows across the supplied sections.

Updated pages:
- College Search: searches the full dataset and filters by category/programme/fee text.
- College Details: shows every supplied programme field.
- Compare: compares records using the supplied dataset.
- Find My College: uses the dataset for shortlist matching.
- Dashboard: reports the integrated dataset size.
- NIRF Categories: shows supplied category records without inventing rank numbers.

The spreadsheet does not provide a complete official NIRF rank column, so rank numbers are not fabricated.
Fees/admission/eligibility should be verified with the institution before publishing or applying.

Deployment:
Upload the contents of this folder to the root of the UniPath GitHub Pages repository, replacing the old website files. Keep the .github folder/workflows.
