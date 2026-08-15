# GradeForge: Rebranding, Distribution Strategy & Attribution Architecture

## 1. Executive Summary
- **New Name**: **GradeForge** (An academic notebook & calculation forge for university students).
- **Core Value Proposition**: Private, browser-local SGPA/CGPA calculations, target what-if planning, multi-university presets, and printable transcripts.
- **Distribution Focus**: Engineering student communities (VTU, Anna University, Mumbai Univ, KTU), WhatsApp/Telegram exam result groups, Reddit, and search engine SEO.
- **Attribution Strategy**: First-party privacy-first attribution tracking (UTM capture, referrer stitching, self-reported attribution, and trackable share link generator).

---

## 2. Brand Identity: GradeForge
- **Name**: GradeForge
- **Tagline**: *Calculate SGPA and CGPA without a spreadsheet.*
- **Logomark**: GradeForge signature step-grade logo with gold trajectory and target indicator.
- **Domain & URLs**: `gradeforge.poorvithmp.com` / `poorvithmp.com/gradeforge`

---

## 3. Multi-Channel Distribution Strategy

```
                          ┌────────────────────────────┐
                          │   GradeForge Distribution   │
                          └──────────────┬─────────────┘
                                         │
       ┌──────────────────┬──────────────┼────────────────┬──────────────────┐
       ▼                  ▼              ▼                ▼                  ▼
┌──────────────┐   ┌──────────────┐┌──────────────┐┌──────────────┐   ┌──────────────┐
│  WhatsApp &  │   │  Search SEO  ││ Viral Share  ││   Reddit &   │   │  Product     │
│   Telegram   │   │  (Keywords)  ││  Transcripts ││ Communities  │   │ Hunt / Social│
└──────────────┘   └──────────────┘└──────────────┘└──────────────┘   └──────────────┘
```

### Channel 1: University Student Groups (WhatsApp / Telegram / Discord)
- **Timing**: Release during Semester Exam Result days (high search & anxiety moments).
- **Message Framing**: *"Tired of messing up SGPA credit calculations on Excel? Built a free, ad-free calculator for VTU / Anna Univ with Target CGPA planning."*
- **UTM Tagging**: `utm_source=whatsapp&utm_medium=student_group&utm_campaign=vtu_results_2026`

### Channel 2: Organic Search & High-Intent SEO
- **Priority Keywords**:
  - `VTU SGPA calculator 2022 scheme`
  - `Anna University CGPA calculator`
  - `CGPA to percentage converter VTU`
  - `Target CGPA calculator what if`
  - `KTU SGPA calculator CBCS`
- **Asset**: Dedicated formulas and university schema in `/docs` and `/calculator`.

### Channel 3: Viral Built-In Referral Mechanics
- **Printable Report Card**: Footer badge: *"Calculated with GradeForge (gradeforge.poorvithmp.com)"*.
- **Share Link Tool**: Students can generate one-click copy links to send to classmates.

### Channel 4: Reddit & Developer / Student Communities
- Subreddits: `r/Btechtards`, `r/VTU`, `r/AnnaUniversity`, `r/EngineeringStudents`.
- Post style: Honest developer showcase focusing on privacy and math accuracy.

---

## 4. Attribution & Measurement Architecture (Pillar A & Pillar B)

### First-Party Local Attribution Model
1. **UTM & Referrer Persistence**:
   - On initial page load, extract `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `document.referrer`.
   - Store in localStorage under `gradeforge_attribution_v1` (with `$initial_*` keys).
2. **Self-Reported Attribution Survey ("How did you discover GradeForge?")**:
   - Non-intrusive 1-click dropdown in the calculator summary/footer:
     - WhatsApp / Telegram student group
     - Reddit / Discord
     - Friend / Classmate recommendation
     - Google Search / SEO
     - LinkedIn / Twitter
     - Other
   - Captures dark social channels that UTMs structurally miss.
3. **Share Link Builder**:
   - Lets students copy their own custom share link with automatic attribution tags (`utm_source=share&utm_medium=direct_referral`).

---

## 5. Implementation Roadmap
1. Rename all instances of **GradePath** to **GradeForge** across code, metadata, JSON-LD, and documentation.
2. Build the `AttributionContext` and `ShareModal` component.
3. Add the Self-Reported Discovery widget.
4. Run production build, verify, and push to GitHub.
