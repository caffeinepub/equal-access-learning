# Equal Access Learning

## Current State
Previous versions have had deployment/access issues. Rebuilding from scratch.

## Requested Changes (Diff)

### Add
- Full site rebuild: all pages and features from scratch

### Modify
- N/A (fresh build)

### Remove
- N/A

## Implementation Plan

### Pages
1. **Home** - Hero with site title, mission statement, "Test Your Knowledge" quiz link (red font), nav
2. **The Issue** - 8 barriers to learning (cost, transportation, time/schedule, selectivity, awareness, disability/accessibility, language, technology), each with expanded facts and statistics
3. **Survey** - 5-section survey: barriers identification, rating scales/opinions, statistics reactions, values questions, open reflection. Option bubbles outlined in red.
4. **Quiz** - "Test Your Knowledge" with category and difficulty (easy/medium/hard) selection, multiple-choice questions, score display. No leaderboard or score sharing.
5. **Resources** - Links to external resources organized by category
6. **Advocate & Serve** - 8 action cards (volunteer, petition, fundraise, mentor, donate, spread awareness, tutor, advocate locally). Petition section with: name + optional message form, goal counter (100 signatures), share buttons (X, Facebook), copy-link button, live feed of recent signers (pre-populated with sample names).

### Design
- Red accents throughout (nav, buttons, hero, option bubbles outlined in red)
- Clean white/light background
- Professional, educational look
- "Made with Caffeine AI" badge blends into footer (nearly invisible)
- NO QR code, NO Copy QR Code button

### Backend
- Store survey responses
- Store petition signatures (name, optional message, timestamp)
- Quiz questions data
- Sample petition signatures pre-loaded
