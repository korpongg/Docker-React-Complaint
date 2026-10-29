
import styled from "styled-components";

export const ComplaintViewStyle = styled.div`

/* =========================================================
   DESIGN SYSTEM
========================================================= */

  --cv-bg: #f6f8fa;
  --cv-surface: #ffffff;
  --cv-surface-soft: #f8fafc;
  --cv-surface-muted: #f1f5f9;

  --cv-border: #e2e8f0;
  --cv-border-soft: #edf1f5;

  --cv-text: #172033;
  --cv-text-secondary: #334155;
  --cv-text-muted: #64748b;
  --cv-text-light: #94a3b8;

  --cv-primary: #0f766e;
  --cv-primary-dark: #115e59;
  --cv-primary-soft: #ecfdf5;
  --cv-primary-border: #a7f3d0;

  --cv-warning: #a16207;
  --cv-warning-soft: #fffbeb;
  --cv-warning-border: #fde68a;

  --cv-danger: #b91c1c;
  --cv-danger-soft: #fef2f2;
  --cv-danger-border: #fecaca;

  --cv-success: #15803d;
  --cv-success-soft: #f0fdf4;
  --cv-success-border: #bbf7d0;

  --cv-info: #0369a1;
  --cv-info-soft: #f0f9ff;
  --cv-info-border: #bae6fd;

  --cv-radius-sm: 8px;
  --cv-radius-md: 12px;
  --cv-radius-lg: 16px;

  --cv-shadow-sm:
    0 1px 2px rgba(15, 23, 42, 0.03),
    0 4px 12px rgba(15, 23, 42, 0.025);

  --cv-shadow-md:
    0 2px 4px rgba(15, 23, 42, 0.03),
    0 10px 28px rgba(15, 23, 42, 0.045);

  box-sizing: border-box;
  width: 100%;

  font-family:
    "Mali",
    "Noto Sans Thai",
    "Tahoma",
    sans-serif;

  color: var(--cv-text);
  background: var(--cv-bg);

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }


/* =========================================================
   PAGE
========================================================= */

  .general-info-page {
    width: 100%;
    max-width: 1480px;

    margin: 0 auto;
    padding: 22px 24px 60px;
  }


/* =========================================================
   TOP TOOLBAR
========================================================= */

  .general-info-toolbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    margin-bottom: 18px;
  }

  .edit-report-button {
    min-height: 40px !important;

    padding: 0 18px !important;

    border-radius: 9px !important;

    background: #facc15 !important;
    border: 1px solid #eab308 !important;

    color: #422006 !important;

    font-family: inherit !important;
    font-size: 13px !important;
    font-weight: 700 !important;

    text-transform: none !important;

    box-shadow:
      0 2px 5px rgba(161, 98, 7, 0.12) !important;

    transition:
      background .18s ease,
      border-color .18s ease,
      box-shadow .18s ease,
      transform .18s ease !important;
  }

  .edit-report-button:hover {
    background: #fde047 !important;
    border-color: #ca8a04 !important;

    transform: translateY(-1px);

    box-shadow:
      0 5px 14px rgba(161, 98, 7, 0.16) !important;
  }


/* =========================================================
   PAGE HEADER
========================================================= */

  .complaint-detail-wrapper {
    width: 100%;
    margin-bottom: 18px;
  }

  .complaint-detail-card {
    width: 100%;

    overflow: hidden;

    background: var(--cv-surface);

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-lg);

    box-shadow: var(--cv-shadow-sm);
  }

  .complaint-detail-top {
    min-height: 92px;

    padding: 20px 24px;

    display: flex;
    align-items: center;
    gap: 18px;

    background: #ffffff;
  }

  .complaint-step-number {
    width: 48px;
    height: 48px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #dbe3e8;
    border-radius: 11px;

    background: #f8fafc;

    color: var(--cv-primary);

    font-size: 17px;
    font-weight: 800;
  }

  .complaint-detail-heading {
    position: static;

    min-width: 0;
    flex: 1;

    transform: none;

    text-align: left;
  }

  .complaint-detail-label {
    margin-bottom: 3px;

    color: var(--cv-primary);

    font-size: 10px;
    font-weight: 800;

    letter-spacing: .13em;
    text-transform: uppercase;
  }

  .complaint-detail-title {
    margin: 0;

    color: var(--cv-text);

    font-size: 20px;
    line-height: 1.4;
    font-weight: 750;
    letter-spacing: -.01em;
  }

  .complaint-detail-description {
    margin-top: 4px;

    color: var(--cv-text-light);

    font-size: 12px;
    line-height: 1.5;
  }

  .complaint-current-step {
    flex-shrink: 0;

    display: inline-flex;
    align-items: center;
    gap: 8px;

    min-height: 34px;

    padding: 7px 11px;

    border: 1px solid var(--cv-border);
    border-radius: 8px;

    background: var(--cv-surface-soft);

    color: var(--cv-text-secondary);

    font-size: 11px;
    font-weight: 700;
  }

  .complaint-current-dot {
    width: 7px;
    height: 7px;

    flex-shrink: 0;

    border-radius: 50%;

    background: #d97706;

    box-shadow:
      0 0 0 3px rgba(217, 119, 6, .10);
  }

  .complaint-detail-accent {
    width: 100%;
    height: 3px;

    background: var(--cv-primary);
  }

  .complaint-detail-divider {
    display: none;
  }

  .complaint-detail-content {
    padding: 0;

    background: transparent;
  }

  .complaint-report-comment {
    margin-top: 18px;
  }


/* =========================================================
   MAIN STACK
========================================================= */

  .cv-container {
    width: 100%;

    padding: 0;

    background: transparent;

    color: var(--cv-text);
  }

  .cv-stack {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }


/* =========================================================
   COMMON SECTION / CARD
========================================================= */

  .cv-container .section,
  .section {
    position: relative;

    width: 100%;

    padding: 0;

    overflow: hidden;

    background: var(--cv-surface);

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-lg);

    box-shadow: var(--cv-shadow-sm);

    transition:
      border-color .18s ease,
      box-shadow .18s ease;
  }

  .cv-container .section:hover {
    border-color: #d7dee6;

    box-shadow: var(--cv-shadow-md);
  }


/* =========================================================
   SECTION TITLE
========================================================= */

  .cv-container .section-title,
  .section-title {
    position: relative;

    display: flex;
    align-items: center;

    margin: 0 !important;




    background: #ffffff;

    color: var(--cv-text);

    font-family: inherit;

    font-size: 15px;
    line-height: 1.4;
    font-weight: 750;
  }

  .cv-container .section-title::before {
    content: "";

    position: absolute;

    left: 22px;
    top: 50%;

    width: 4px;
    height: 20px;

    transform: translateY(-50%);

    border-radius: 999px;

    background: var(--cv-primary);
  }


/* =========================================================
   INFO ROW
========================================================= */

  .cv-container .info-row {
    display: grid;

    grid-template-columns: 180px minmax(0, 1fr);

    align-items: center;

    min-height: 48px;

    margin: 0 22px;

    padding: 9px 0;

    border-bottom: 1px solid #f1f5f9;
  }

  .cv-container .info-row:last-child {
    border-bottom: none;
  }

  .cv-container .info-row-label {
    padding-right: 18px;

    color: var(--cv-text-muted);

    font-family: inherit;

    font-size: 12px;
    font-weight: 650;
  }

  .cv-container .info-row-value {
    min-width: 0;

    color: var(--cv-text-secondary);

    font-family: inherit;

    font-size: 13px;
    font-weight: 600;

    line-height: 1.7;

    word-break: break-word;
  }

  .cv-container .info-row-value strong {
    color: var(--cv-text);
    font-weight: 750;
  }

  .cv-container .info-row-value.text-long {
    margin: 5px 0;

    padding: 12px 14px;

    background: var(--cv-surface-soft);

    border: 1px solid var(--cv-border-soft);
    border-radius: 9px;

    line-height: 1.8;
  }


/* =========================================================
   EMPTY
========================================================= */

  .cv-container .empty-value,
  .empty-information {
    color: var(--cv-text-light);

    font-style: normal;
  }

  .empty-information {
    padding: 13px 15px;

    background: #fafbfc;

    border: 1px dashed #dce3e8;
    border-radius: 9px;

    font-size: 13px;
  }


/* =========================================================
   TAG GROUP
========================================================= */

  .cv-container .tag-group {
    display: grid;

    grid-template-columns: 165px minmax(0, 1fr);

    align-items: center;

    min-height: 54px;

    margin: 0 22px;

    padding: 9px 0;

    border-bottom: 1px solid #f1f5f9;
  }

  .cv-container .tag-group:last-child {
    border-bottom: none;
  }

  .cv-container .tag-group-title {
    color: var(--cv-text-muted);

    font-family: inherit;

    font-size: 12px;
    font-weight: 700;
  }

  .cv-container .tag-group-items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    gap: 7px;
  }

  .cv-container .tag {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    min-height: 29px;

    padding: 5px 10px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;
    border-radius: 7px;

    color: #475569;

    font-family: inherit;

    font-size: 11px;
    font-weight: 650;

    line-height: 1.4;

    transition:
      background .16s ease,
      border-color .16s ease;
  }

  .cv-container .tag:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }


/* =========================================================
   STATUS
========================================================= */

  .cv-container .status-badge {
    display: inline-flex;
    align-items: center;

    width: fit-content;

    min-height: 29px;

    padding: 5px 10px;

    background: var(--cv-danger-soft);

    border: 1px solid var(--cv-danger-border);
    border-radius: 999px;

    color: var(--cv-danger);

    font-family: inherit;

    font-size: 11px;
    font-weight: 750;
  }


/* =========================================================
   GENERAL INFORMATION / OLD CARD COMPATIBILITY
========================================================= */

  .complaint-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 16px;

    width: 100%;
  }

  .complaint-card {
    min-width: 0;

    overflow: hidden;

    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-lg);

    box-shadow: var(--cv-shadow-sm);
  }

  .complaint-card-full {
    grid-column: 1 / -1;
  }

  .complaint-card-header {
    display: flex;
    align-items: center;

    min-height: 56px;

    padding: 14px 20px;

    background: #ffffff;

    border-bottom: 1px solid var(--cv-border-soft);
  }

  .complaint-card-title {
    position: relative;

    padding-left: 15px;

    color: var(--cv-text);

    font-size: 15px;
    font-weight: 750;
  }

  .complaint-card-title::before {
    content: "";

    position: absolute;

    left: 0;
    top: 50%;

    width: 4px;
    height: 19px;

    transform: translateY(-50%);

    border-radius: 999px;

    background: var(--cv-primary);
  }

  .complaint-card-body {
    padding: 14px 20px;
  }


/* =========================================================
   INFO ROW NEW
========================================================= */

  .info-row-new {
    display: grid;

    grid-template-columns: 155px minmax(0, 1fr);

    align-items: start;

    min-height: 45px;

    padding: 10px 0;

    border-bottom: 1px solid #f1f5f9;

    gap: 16px;
  }

  .info-row-new:last-child {
    border-bottom: none;
  }

  .info-label-new {
    width: auto;

    color: var(--cv-text-light);

    font-size: 11px;
    font-weight: 650;
  }

  .info-value-new {
    min-width: 0;

    color: var(--cv-text-secondary);

    font-size: 13px;
    font-weight: 650;

    line-height: 1.65;

    word-break: break-word;
  }


/* =========================================================
   PEOPLE PANEL
========================================================= */

  .people-card,
  .people-panel {
    grid-column: 1 / -1;

    overflow: hidden;

    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-lg);

    box-shadow: var(--cv-shadow-sm);
  }

  .people-content,
  .people-layout {
    display: grid;

    grid-template-columns:
      minmax(0, .85fr)
      minmax(0, 1.15fr);

    min-height: 215px;
  }

  .people-block,
  .person-column {
    min-width: 0;

    padding: 24px 26px;
  }

  .people-patient,
  .patient-column {
    padding-left: 28px;

    border-left: 1px solid var(--cv-border-soft);

    background:
      linear-gradient(
        90deg,
        #fbfcfd 0%,
        #ffffff 100%
      );
  }

  .people-block-title,
  .person-heading {
    display: flex;
    align-items: center;
    gap: 9px;

    margin-bottom: 13px;

    color: #475569;

    font-size: 13px;
    font-weight: 750;
  }

  .people-block-title::before {
    content: "";

    width: 4px;
    height: 18px;

    flex-shrink: 0;

    border-radius: 4px;

    background: var(--cv-primary);
  }

  .person-heading-line {
    width: 4px;
    height: 18px;

    flex-shrink: 0;

    border-radius: 4px;

    background: var(--cv-primary);
  }

  .people-name,
  .person-name {
    margin-bottom: 15px;

    color: var(--cv-text);

    font-size: 18px;
    line-height: 1.45;
    font-weight: 750;

    word-break: break-word;
  }

  .people-meta,
  .person-details {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 8px;
  }

  .patient-details {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .people-meta-item,
  .person-detail {
    min-width: 0;

    padding: 10px 12px;

    background: #f8fafc;

    border: 1px solid #edf1f5;
    border-radius: 9px;
  }

  .people-meta-label,
  .person-detail-label {
    display: block;

    margin-bottom: 4px;

    color: var(--cv-text-light);

    font-size: 10px;
    font-weight: 600;
  }

  .people-meta-value,
  .person-detail-value {
    display: block;

    color: var(--cv-text-secondary);

    font-size: 13px;
    line-height: 1.55;
    font-weight: 650;

    word-break: break-word;
  }


/* =========================================================
   COMPLAINT FOCUS
   MAIN IMPORTANT AREA
========================================================= */

  .complaint-focus-panel {
    grid-column: 1 / -1;

    overflow: hidden;

    background: #ffffff;

    border: 1px solid #dfe8e6;
    border-radius: var(--cv-radius-lg);

    box-shadow:
      0 2px 5px rgba(15, 118, 110, .025),
      0 10px 28px rgba(15, 118, 110, .035);
  }

  .complaint-focus-header {
    min-height: 64px;

    display: flex;
    align-items: center;

    padding: 16px 22px;

    background:
      linear-gradient(
        180deg,
        #ffffff 0%,
        #f8fbfa 100%
      );

    border-bottom: 1px solid #e5eeec;
  }

  .complaint-focus-header .section-title {
    padding: 0 0 0 15px;

    min-height: auto;

    border-bottom: none;
    background: transparent;
  }

  .focus-section {
    padding: 22px 24px;

    border-bottom: 1px solid #edf1f2;
  }

  .focus-section:last-child {
    border-bottom: none;
  }

  .focus-section-header {
    margin-bottom: 14px;
  }

  .focus-section-title {
    display: flex;
    align-items: center;
    gap: 9px;

    color: var(--cv-text-secondary);

    font-size: 14px;
    line-height: 1.45;
    font-weight: 750;
  }

  .focus-section-title::before {
    content: "";

    width: 4px;
    height: 18px;

    flex-shrink: 0;

    border-radius: 4px;

    background: var(--cv-primary);
  }


/* =========================================================
   CONTACT INFORMATION
========================================================= */

  .focus-information-grid {
    display: grid;

    grid-template-columns:
      repeat(3, minmax(0, 1fr));

    gap: 9px;
  }

  .focus-information {
    min-height: 70px;

    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 11px 14px;

    background: #f8fafc;

    border: 1px solid #edf1f5;
    border-radius: 10px;

    transition:
      border-color .16s ease,
      background .16s ease;
  }

  .focus-information:hover {
    background: #ffffff;
    border-color: #dce4ea;
  }

  .focus-label {
    margin-bottom: 5px;

    color: var(--cv-text-light);

    font-size: 10px;
    font-weight: 650;
  }

  .focus-value {
    color: var(--cv-text-secondary);

    font-size: 13px;
    line-height: 1.5;
    font-weight: 700;
  }

  .status-required {
    color: var(--cv-success);
  }

  .status-normal {
    color: var(--cv-text-muted);
  }

  .urgent-value {
    color: var(--cv-danger);
  }

  .normal-value {
    color: var(--cv-success);
  }


/* =========================================================
   CONTACT OLD COMPATIBILITY
========================================================= */

  .contact-card {
    border-color: #dfe8e6;
  }

  .contact-card .complaint-card-header {
    background: #f8fbfa;
  }

  .contact-status {
    display: inline-flex;
    align-items: center;

    min-height: 28px;

    padding: 5px 9px;

    border-radius: 7px;

    font-size: 11px;
    font-weight: 700;
  }

  .contact-status.required {
    color: #166534;

    background: var(--cv-success-soft);

    border: 1px solid var(--cv-success-border);
  }

  .contact-status.not-required {
    color: #64748b;

    background: #f8fafc;

    border: 1px solid #e2e8f0;
  }

  .contact-value-urgent {
    color: var(--cv-danger);
    font-weight: 750;
  }

  .contact-value-normal {
    color: var(--cv-success);
    font-weight: 700;
  }


/* =========================================================
   APPEAL / INVOLVED PERSON TABLE
========================================================= */

  .modern-table-wrapper,
  .appeal-table {
    width: 100%;

    overflow-x: auto;

    background: #ffffff;

    border: 1px solid #e5e9ee;
    border-radius: 10px;
  }

  .modern-appeal-table,
  .appeal-table table {
    width: 100%;

    margin: 0 !important;

    border-collapse: separate !important;
    border-spacing: 0 !important;
  }

  .modern-appeal-table thead th,
  .appeal-table thead th {
    padding: 11px 14px;

    background: #f8fafc;

    border: none !important;
    border-bottom: 1px solid #e5e9ee !important;

    color: #64748b;

    font-size: 11px;
    font-weight: 750;

    white-space: nowrap;
  }

  .modern-appeal-table tbody td,
  .appeal-table tbody td {
    padding: 12px 14px;

    border: none !important;
    border-bottom: 1px solid #f0f2f5 !important;

    color: #475569;

    font-size: 13px;

    vertical-align: middle;
  }

  .modern-appeal-table tbody tr:last-child td,
  .appeal-table tbody tr:last-child td {
    border-bottom: none !important;
  }

  .modern-appeal-table tbody tr:hover,
  .appeal-table tbody tr:hover {
    background: #fafdfc;
  }

  .table-index {
    width: 55px;

    color: #94a3b8 !important;

    font-size: 11px !important;
    font-weight: 700;
  }

  .table-name {
    color: #1e293b !important;

    font-weight: 700 !important;
  }


/* =========================================================
   SUMMARY / PART 1
========================================================= */

  .summary-focus-section {
    background:
      linear-gradient(
        180deg,
        #fffdf7 0%,
        #ffffff 100%
      );
  }

  .summary-heading-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;

    margin-bottom: 14px;
  }

  .summary-heading-row .focus-section-header {
    margin-bottom: 0;
  }

  .severity-display {
    display: inline-flex;
    align-items: center;

    gap: 6px;

    flex-shrink: 0;

    min-height: 31px;

    padding: 6px 10px;

    border-radius: 8px;

    background: var(--severity-bg);
    color: var(--severity-color);

    font-size: 11px;
    font-weight: 650;
  }

  .severity-display strong {
    font-size: 13px;
    font-weight: 800;
  }

  .summary-content,
  .main-summary-content {
    min-height: 118px;

    padding: 16px 17px;

    background: #ffffff;

    border: 1px solid #f0e5c4;
    border-radius: 10px;

    color: #334155;

    font-size: 14px;
    line-height: 1.9;

    white-space: pre-line;
    word-break: break-word;
  }


/* =========================================================
   OLD SUMMARY CARD COMPATIBILITY
========================================================= */

  .complaint-summary-card,
  .main-summary-card {
    border: 1px solid var(--cv-warning-border);

    background:
      linear-gradient(
        180deg,
        #fffdf7 0%,
        #ffffff 100%
      );
  }

  .complaint-summary-header,
  .main-summary-card .complaint-card-header {
    background: var(--cv-warning-soft);

    border-bottom: 1px solid var(--cv-warning-border);
  }

  .summary-left {
    display: flex;
    align-items: center;

    gap: 12px;
  }

  .summary-subtitle {
    margin-bottom: 3px;

    color: #a16207;

    font-size: 10px;
    font-weight: 800;

    letter-spacing: .12em;
    text-transform: uppercase;
  }


/* =========================================================
   OTHER DETAILS
========================================================= */

  .details-panel {
    overflow: hidden;

    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-lg);

    box-shadow: var(--cv-shadow-sm);
  }

  .details-panel-header {
    min-height: 60px;

    display: flex;
    align-items: center;

    padding: 15px 22px;

    background: #ffffff;

    border-bottom: 1px solid var(--cv-border-soft);
  }

  .detail-section {
    padding: 21px 24px;

    border-bottom: 1px solid #edf1f4;
  }

  .detail-section-last {
    border-bottom: none;
  }

  .detail-section-heading {
    display: flex;
    align-items: center;
    gap: 9px;

    margin-bottom: 13px;

    color: var(--cv-text-secondary);

    font-size: 14px;
    font-weight: 750;
  }

  .detail-heading-line {
    width: 4px;
    height: 18px;

    flex-shrink: 0;

    border-radius: 4px;

    background: var(--cv-primary);
  }

  .detail-section-content {
    padding-left: 13px;
  }


/* =========================================================
   LONG TEXT
========================================================= */

  .long-text-box,
  .text-box {
    min-height: 70px;

    padding: 14px 16px;

    background: #f8fafc;

    border: 1px solid #edf1f5;
    border-radius: 9px;

    color: #475569;

    font-size: 14px;
    line-height: 1.85;

    white-space: pre-line;
    word-break: break-word;
  }


/* =========================================================
   ACHIEVEMENT
========================================================= */

  .achievement-display {
    display: flex;
    align-items: center;

    gap: 14px;

    margin-left: 13px;

    padding: 12px 14px;

    background: #f8fafc;

    border: 1px solid #edf1f5;
    border-radius: 9px;
  }

  .achievement-label {
    color: var(--cv-text-light);

    font-size: 11px;
    font-weight: 650;
  }

  .achievement-value {
    color: var(--cv-text-secondary);

    font-size: 14px;
    font-weight: 750;
  }


/* =========================================================
   ANALYSIS
========================================================= */

  .analysis-card {
    overflow: hidden;

    margin-top: 15px;

    background: #ffffff;

    border: 1px solid #dbe4ea;
    border-radius: var(--cv-radius-lg);

    box-shadow: var(--cv-shadow-sm);
  }

  .analysis-header {
    padding: 16px 20px;

    background: #f0fdf4;

    border-bottom: 1px solid #dcfce7;
  }

  .analysis-main {
    color: #166534;

    font-size: 15px;
    line-height: 1.6;
    font-weight: 750;
  }

  .analysis-detail {
    padding: 18px 20px;
  }

  .detail-label {
    margin-bottom: 7px;

    color: var(--cv-text-muted);

    font-size: 11px;
    font-weight: 700;
  }

  .detail-text {
    padding: 14px 16px;

    background: #f8fafc;

    border: 1px solid #edf1f5;
    border-left: 3px solid #22c55e;

    border-radius: 9px;

    color: #1e293b;

    font-size: 14px;
    line-height: 1.85;
  }


/* =========================================================
   UPLOAD
========================================================= */

  .upload-section {
    padding: 18px;

    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-md);
  }

  .upload-title {
    display: flex;
    align-items: center;

    gap: 9px;

    margin-bottom: 13px;

    color: var(--cv-text-secondary);

    font-size: 14px;
    font-weight: 750;
  }

  .upload-title i {
    width: 32px;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 9px;

    background: var(--cv-primary-soft);

    color: #16a34a;
  }

  .upload-title span {
    color: var(--cv-text-light);

    font-size: 12px;
    font-weight: 500;
  }

  .upload-label {
    margin-bottom: 10px;

    color: var(--cv-text-secondary);

    font-size: 13px;
    font-weight: 700;
  }

  .upload-input {
    width: 100%;

    padding: 13px !important;

    background: #f8fafc;

    border: 1px dashed #cbd5e1 !important;
    border-radius: 10px !important;

    font-family: inherit;

    transition:
      background .18s ease,
      border-color .18s ease;
  }

  .upload-input:hover {
    background: #f0fdf4;

    border-color: #86efac !important;
  }

  .upload-input::file-selector-button {
    margin-right: 12px;

    padding: 8px 14px;

    border: none;
    border-radius: 8px;

    background: #059669;

    color: #ffffff;

    font-family: inherit;

    font-size: 12px;
    font-weight: 700;

    cursor: pointer;
  }

  .upload-text {
    margin-top: 7px;

    color: var(--cv-text-light);

    font-size: 11px;
  }


/* =========================================================
   IMAGE PREVIEW
========================================================= */

  .image-preview-list {
    display: grid;

    grid-template-columns:
      repeat(auto-fill, minmax(170px, 1fr));

    gap: 14px;

    margin-top: 18px;
  }

  .image-preview-item {
    position: relative;

    height: 170px;

    overflow: hidden;

    background: #f8fafc;

    border: 1px solid var(--cv-border);
    border-radius: 12px;

    box-shadow: var(--cv-shadow-sm);

    transition:
      transform .18s ease,
      box-shadow .18s ease;
  }

  .image-preview-item:hover {
    transform: translateY(-2px);

    box-shadow: var(--cv-shadow-md);
  }

  .image-preview {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
  }

  .image-delete-btn {
    position: absolute;

    top: 8px;
    right: 8px;

    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;

    border: none;
    border-radius: 50%;

    background: rgba(220, 38, 38, .92);

    color: #ffffff;

    font-size: 18px;
    font-weight: 700;

    cursor: pointer;

    box-shadow:
      0 3px 10px rgba(0, 0, 0, .18);

    transition:
      transform .16s ease,
      background .16s ease;
  }

  .image-delete-btn:hover {
    background: #dc2626;

    transform: scale(1.06);
  }


/* =========================================================
   IMAGE GALLERY
========================================================= */

  .image-gallery {
    display: grid;

    grid-template-columns:
      repeat(auto-fill, minmax(180px, 1fr));

    gap: 14px;
  }

  .image-gallery-item {
    height: 180px;

    overflow: hidden;

    background: #f8fafc;

    border: 1px solid var(--cv-border);
    border-radius: 12px;

    cursor: zoom-in;
  }

  .image-gallery-item img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

    transition: transform .22s ease;
  }

  .image-gallery-item:hover img {
    transform: scale(1.035);
  }


/* =========================================================
   IMAGE MODAL
========================================================= */

  .image-modal {
    position: fixed;

    inset: 0;

    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 40px;

    background: rgba(15, 23, 42, .88);

    cursor: zoom-out;
  }

  .image-modal-preview {
    max-width: 90vw;
    max-height: 90vh;

    object-fit: contain;

    border-radius: 8px;

    box-shadow:
      0 24px 70px rgba(0, 0, 0, .45);

    cursor: default;
  }

  .image-modal-close {
    position: absolute;

    top: 20px;
    right: 24px;

    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0;

    border: 1px solid rgba(255,255,255,.2);
    border-radius: 50%;

    background: rgba(255,255,255,.12);

    color: #ffffff;

    font-size: 28px;
    line-height: 1;

    cursor: pointer;

    transition:
      background .18s ease,
      transform .18s ease;
  }

  .image-modal-close:hover {
    background: rgba(255,255,255,.2);

    transform: scale(1.05);
  }


/* =========================================================
   DOCUMENT LIST
========================================================= */

  .view-document-list {
    display: flex;
    flex-direction: column;

    gap: 8px;

    width: 100%;

    margin-top: 14px;
  }

  .view-document-item {
    width: 100%;
    min-height: 60px;

    display: flex;
    align-items: center;

    gap: 11px;

    padding: 9px 11px;

    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: 10px;

    transition:
      border-color .18s ease,
      box-shadow .18s ease,
      background .18s ease;
  }

  .view-document-item:hover {
    background: #fbfcfd;

    border-color: #cbd5e1;

    box-shadow:
      0 3px 10px rgba(15, 23, 42, .05);
  }

  .view-document-icon {
    width: 38px;
    height: 38px;

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--cv-border);

    border-radius: 9px;

    background: #f8fafc;

    font-size: 19px;
  }

  .view-document-icon .bi-file-earmark-word {
    color: #2563eb;
  }

  .view-document-icon .bi-file-earmark-excel {
    color: #16a34a;
  }

  .view-document-icon .bi-file-earmark-pdf {
    color: #dc2626;
  }

  .view-document-info {
    flex: 1;

    min-width: 0;
  }

  .view-document-name {
    overflow: hidden;

    color: var(--cv-text-secondary);

    font-family: inherit;

    font-size: 12px;
    font-weight: 700;

    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .view-document-type {
    margin-top: 2px;

    color: var(--cv-text-light);

    font-family: inherit;

    font-size: 10px;
  }

  .view-document-action {
    display: flex;
    align-items: center;

    gap: 5px;

    flex-shrink: 0;
  }

  .view-document-open,
  .view-document-download {
    width: 32px;
    height: 32px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    border-radius: 8px;

    text-decoration: none;

    transition:
      background .16s ease,
      color .16s ease;
  }

  .view-document-open {
    color: #047857;

    background: #ecfdf5;

    border: 1px solid #a7f3d0;
  }

  .view-document-open:hover {
    color: #065f46;
    background: #d1fae5;
  }

  .view-document-download {
    color: #2563eb;

    background: #eff6ff;

    border: 1px solid #bfdbfe;
  }

  .view-document-download:hover {
    color: #1d4ed8;
    background: #dbeafe;
  }

  .view-document-action i {
    font-size: 12px;
  }


/* =========================================================
   LEGACY SUPPORT
========================================================= */

  .page-bg {
    background: var(--cv-bg);
    padding: 16px;
  }

  .card-section {
    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-md);

    padding: 18px;
  }

  .cv-container .section:has(.tag-group) {
    background: #ffffff;
  }

  .tag-group {
    margin-top: 0;
  }

  .tag-list,
  .badge-wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
  }

  .tag {
    display: inline-flex;
    align-items: center;

    padding: 6px 10px;

    border-radius: 7px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;

    color: #475569;

    font-size: 11px;
    font-weight: 650;
  }

  .tag-dept {
    display: inline-flex;
    align-items: center;

    padding: 6px 10px;

    border-radius: 7px;

    background: var(--cv-info-soft);

    border: 1px solid var(--cv-info-border);

    color: #075985;

    font-size: 11px;
    font-weight: 650;
  }

  .dept-aff-list {
    display: flex;
    flex-wrap: wrap;

    gap: 7px;

    margin-top: 5px;
  }

  .dept-aff {
    display: inline-flex;
    align-items: center;

    gap: 5px;

    padding: 6px 10px;
    margin-right:10px;
    background: #f0f9ff;

    border: 1px solid #bae6fd;
    border-radius: 7px;

    color: #075985;

    font-size: 11px;
    font-weight: 650;

    transition:
      background .16s ease,
      border-color .16s ease;
  }

  .dept-aff:hover {
    background: #e0f2fe;
    border-color: #7dd3fc;
  }

  .dept-aff.active {
    background: var(--cv-primary-soft);

    border-color: #86efac;

    color: #166534;
  }

  .dept-aff-label {
    margin-bottom: 4px;

    color: var(--cv-text-muted);

    font-size: 11px;
  }


/* =========================================================
   OLD VIEW SYSTEM
========================================================= */

  .view-page {
    display: flex;
    flex-direction: column;

    gap: 16px;
  }

  .view-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-height: 58px;

    padding: 13px 18px;

    background: #f0fdf4;

    border: 1px solid #bbf7d0;
    border-left: 4px solid #16a34a;

    border-radius: 11px;
  }

  .view-title-main {
    display: flex;
    align-items: center;

    gap: 8px;

    color: #14532d;

    font-weight: 750;
  }

  .view-stack {
    display: flex;
    flex-direction: column;

    gap: 16px;
  }

  .view-section {
    display: flex;
    flex-direction: column;

    gap: 12px;

    padding: 18px;

    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-md);
  }

  .view-title {
    display: flex;
    align-items: center;

    gap: 9px;

    color: var(--cv-text-secondary);

    font-weight: 700;
  }

  .badge {
    display: inline-flex;
    align-items: center;

    min-height: 28px;

    padding: 5px 10px;

    background: #f8fafc;

    border: 1px solid #e2e8f0;
    border-radius: 7px;

    color: #475569;

    font-size: 11px;
    font-weight: 650;
  }

  .badge.active {
    background: var(--cv-success-soft);

    border-color: #86efac;

    color: #166534;
  }

  .sub-box,
  .info-box {
    padding: 12px 14px;

    background: #f8fafc;

    border: 1px solid #edf1f5;
    border-radius: 9px;
  }

  .sub-title {
    margin-bottom: 5px;

    color: var(--cv-text-secondary);

    font-weight: 700;
  }

  .info-box {
    color: #475569;

    font-size: 13px;
  }


/* =========================================================
   SIMPLE SECTION COMPATIBILITY
========================================================= */

  .complaint-section {
    padding: 18px 20px;

    margin-bottom: 16px;

    background: #ffffff;

    border: 1px solid var(--cv-border);
    border-radius: var(--cv-radius-md);

    box-shadow: var(--cv-shadow-sm);
  }

  .section-header {
    display: flex;
    align-items: center;

    gap: 9px;

    margin-bottom: 12px;

    color: var(--cv-text-secondary);

    font-size: 15px;
    font-weight: 750;
  }

  .section-content {
    color: var(--cv-text-secondary);

    font-size: 14px;
    line-height: 1.8;
  }

  .text-content {
    padding-left: 3px;

    white-space: pre-line;
  }


/* =========================================================
   RESPONSIVE — 1100
========================================================= */

  @media (max-width: 1100px) {

    .people-content,
    .people-layout {
      grid-template-columns: 1fr;
    }

    .people-patient,
    .patient-column {
      padding-left: 26px;

      border-left: none;
      border-top: 1px solid var(--cv-border-soft);
    }

    .patient-details {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .focus-information-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .basic-information {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .basic-information-item {
      border-right: none;
      border-bottom: 1px solid var(--cv-border-soft);
    }
  }


/* =========================================================
   RESPONSIVE — 768
========================================================= */

  @media (max-width: 768px) {

    .general-info-page {
      padding: 14px 12px 36px;
    }

    .general-info-toolbar {
      margin-bottom: 12px;
    }

    .complaint-detail-top {
      min-height: auto;

      padding: 18px;

      align-items: flex-start;
    }

    .complaint-step-number {
      width: 42px;
      height: 42px;

      font-size: 15px;
    }

    .complaint-detail-title {
      font-size: 17px;
    }

    .complaint-detail-description {
      font-size: 11px;
    }

    .complaint-current-step {
      display: none;
    }

    .complaint-grid {
      grid-template-columns: 1fr;
    }

    .complaint-card-full {
      grid-column: auto;
    }

    .complaint-card-header {
      min-height: 53px;

      padding: 13px 16px;
    }

    .complaint-card-body {
      padding: 12px 16px;
    }

    .info-row-new {
      grid-template-columns: 1fr;

      gap: 3px;

      padding: 9px 0;
    }

    .info-label-new {
      font-size: 10px;
    }

    .info-value-new {
      font-size: 12px;
    }

    .people-content,
    .people-layout {
      grid-template-columns: 1fr;
    }

    .people-block,
    .person-column {
      padding: 20px 18px;
    }

    .people-patient,
    .patient-column {
      padding-left: 18px;
      padding-top: 20px;

      border-left: none;
      border-top: 1px solid var(--cv-border-soft);
    }

    .people-meta,
    .person-details,
    .patient-details {
      grid-template-columns: 1fr;
    }

    .people-name,
    .person-name {
      font-size: 16px;
    }

    .focus-section,
    .detail-section {
      padding: 18px;
    }

    .focus-information-grid {
      grid-template-columns: 1fr;
    }

    .summary-heading-row {
      align-items: flex-start;

      flex-direction: column;

      gap: 9px;
    }

    .severity-display {
      align-self: flex-start;
    }

    .detail-section-content {
      padding-left: 0;
    }

    .achievement-display {
      align-items: flex-start;

      flex-direction: column;

      gap: 4px;

      margin-left: 0;
    }

    .cv-container .section-title {
      min-height: 53px;

      padding: 14px 17px 14px 33px;

      font-size: 14px;
    }

    .cv-container .section-title::before {
      left: 17px;
    }

    .cv-container .info-row {
      grid-template-columns: 1fr;

      gap: 4px;

      margin: 0 17px;

      padding: 10px 0;
    }

    .cv-container .info-row-label {
      padding-right: 0;

      font-size: 10px;
    }

    .cv-container .info-row-value {
      font-size: 12px;
    }

    .cv-container .tag-group {
      grid-template-columns: 1fr;

      gap: 6px;

      margin: 0 17px;

      padding: 10px 0;
    }

    .cv-container .tag-group-title {
      font-size: 10px;
    }

    .image-gallery {
      grid-template-columns:
        repeat(2, minmax(0, 1fr));

      gap: 10px;
    }

    .image-gallery-item {
      height: 150px;
    }

    .image-preview-list {
      grid-template-columns:
        repeat(2, minmax(0, 1fr));

      gap: 10px;
    }

    .image-preview-item {
      height: 145px;
    }

    .upload-section {
      padding: 15px;
    }

    .image-modal {
      padding: 20px;
    }

    .image-modal-preview {
      max-width: 94vw;
      max-height: 85vh;
    }

    .image-modal-close {
      top: 14px;
      right: 14px;
    }
  }


/* =========================================================
   RESPONSIVE — 480
========================================================= */

  @media (max-width: 480px) {

    .general-info-page {
      padding: 10px 8px 28px;
    }

    .complaint-detail-top {
      gap: 12px;

      padding: 15px;
    }

    .complaint-step-number {
      width: 38px;
      height: 38px;

      border-radius: 9px;

      font-size: 14px;
    }

    .complaint-detail-label {
      font-size: 9px;
    }

    .complaint-detail-title {
      font-size: 16px;
    }

    .complaint-detail-description {
      font-size: 10px;
    }

    .people-block,
    .person-column {
      padding: 17px 15px;
    }

    .people-patient,
    .patient-column {
      padding-left: 15px;
    }

    .focus-section,
    .detail-section {
      padding: 15px;
    }

    .focus-section-title {
      font-size: 13px;
    }

    .summary-content,
    .main-summary-content {
      padding: 13px;

      font-size: 13px;
    }

    .image-gallery-item {
      height: 125px;
    }

    .image-preview-item {
      height: 125px;
    }

    .view-document-item {
      min-height: 56px;

      padding: 8px;
    }

    .view-document-action {
      gap: 3px;
    }

    .view-document-open,
    .view-document-download {
      width: 29px;
      height: 29px;
    }
  }
/* =========================================================
   GENERAL INFO VIEW
   Clinical Enterprise UI
   ========================================================= */

.general-info-page {
  --gi-bg: #f5f7fa;
  --gi-surface: #ffffff;
  --gi-surface-soft: #f8fafc;

  --gi-text: #172033;
  --gi-text-secondary: #5d6879;
  --gi-text-muted: #8a94a6;

  --gi-border: #e7ebf0;
  --gi-border-strong: #d9dee7;

  --gi-primary: #1f5f63;
  --gi-primary-dark: #174b4f;
  --gi-primary-soft: #edf7f6;

  --gi-gold: #b8871d;
  --gi-gold-dark: #8b650e;
  --gi-gold-soft: #fff8e7;

  width: 100%;
  min-height: 100vh;

  padding: 28px 34px 60px;

  box-sizing: border-box;

  background: var(--gi-bg);

  color: var(--gi-text);

  font-family:
    "DB-Helvethaica-X",
    "Kanit",
    "Noto Sans Thai",
    Arial,
    sans-serif;
}


/* =========================================================
   TOP ACTION
   ========================================================= */

.gi-toolbar {
  width: 100%;

  display: flex;
  justify-content: flex-end;

  margin-bottom: 18px;
}

.gi-edit-button {
  border: 1px solid #d4a72c !important;

  border-radius: 9px !important;

  background: #ffffff !important;

  color: #795b12 !important;

  box-shadow:
    0 2px 5px rgba(31, 41, 55, 0.05) !important;

  padding: 9px 17px !important;

  font-size: 0.9rem !important;
  font-weight: 700 !important;

  text-transform: none !important;

  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease !important;
}

.gi-edit-button:hover {
  background: #fffaf0 !important;

  border-color: #b8871d !important;

  box-shadow:
    0 5px 14px rgba(184, 135, 29, 0.14) !important;

  transform: translateY(-1px);
}


/* =========================================================
   PAGE HEADER
   ========================================================= */

.gi-page-header {
  width: 100%;
  max-width: 1420px;

  margin: 0 auto 30px;

  background: var(--gi-surface);

  border: 1px solid var(--gi-border);

  border-radius: 14px;

  padding: 25px 28px;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;

  box-shadow:
    0 2px 7px rgba(15, 23, 42, 0.035);
}

.gi-page-header-left {
  display: flex;
  align-items: center;

  gap: 18px;

  min-width: 0;
}

.gi-page-number {
  width: 46px;
  height: 46px;

  flex: 0 0 46px;

  border-radius: 11px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f2f5f7;

  color: var(--gi-primary);

  font-size: 0.95rem;
  font-weight: 800;

  letter-spacing: 0.04em;
}

.gi-page-kicker {
  margin-bottom: 3px;

  color: var(--gi-primary);

  font-size: 0.75rem;
  font-weight: 800;

  letter-spacing: 0.1em;

  text-transform: uppercase;
}

.gi-page-title {
  margin: 0;

  color: var(--gi-text);

  font-size: clamp(1.35rem, 2vw, 1.75rem);

  line-height: 1.25;

  font-weight: 800;
}

.gi-page-description {
  margin-top: 5px;

  color: var(--gi-text-muted);

  font-size: 0.9rem;

  line-height: 1.5;
}

.gi-page-status {
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;

  gap: 8px;

  padding: 8px 13px;

  border-radius: 999px;

  background: #f5f7f8;

  color: var(--gi-text-secondary);

  font-size: 0.78rem;
  font-weight: 700;
}

.gi-page-status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;

  background: #3f8b72;
}


/* =========================================================
   CONTENT WIDTH
   ========================================================= */

.gi-content {
  width: 100%;
  max-width: 1420px;

  margin: 0 auto;
}


/* =========================================================
   SECTION
   ========================================================= */

.gi-section {
  margin-bottom: 28px;
}

.gi-section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 13px;

  padding: 0 3px;
}

.gi-section-heading {
  margin: 0;

  color: #263244;

  font-size: 1.03rem;
  font-weight: 800;

  line-height: 1.3;
}

.gi-section-caption {
  margin-top: 3px;

  color: var(--gi-text-muted);

  font-size: 0.8rem;
}


/* =========================================================
   GENERAL INFORMATION
   ========================================================= */

.gi-general-panel {
  background: var(--gi-surface);

  border: 1px solid var(--gi-border);

  border-radius: 13px;

  overflow: hidden;

  box-shadow:
    0 2px 7px rgba(15, 23, 42, 0.025);
}

.gi-general-columns {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(0, 1fr);

  gap: 0;
}

.gi-general-group {
  padding: 24px 27px 26px;
}

.gi-general-group + .gi-general-group {
  border-left: 1px solid var(--gi-border);
}

.gi-group-title {
  display: flex;
  align-items: center;

  gap: 9px;

  margin-bottom: 18px;

  color: #2d394b;

  font-size: 0.9rem;
  font-weight: 800;
}

.gi-group-title::before {
  content: "";

  width: 4px;
  height: 19px;

  border-radius: 4px;

  background: var(--gi-primary);
}

.gi-group-subtitle {
  margin-top: -11px;
  margin-bottom: 15px;
  padding-left: 13px;

  color: var(--gi-text-muted);

  font-size: 0.75rem;
}


/* =========================================================
   INFORMATION ROW
   ========================================================= */

.gi-info-list {
  display: flex;
  flex-direction: column;
}

.gi-info-row {
  display: grid;

  grid-template-columns: 150px minmax(0, 1fr);

  align-items: baseline;

  gap: 20px;

  padding: 11px 0;

  border-bottom: 1px solid #f0f2f5;
}

.gi-info-row:first-child {
  padding-top: 0;
}

.gi-info-row:last-child {
  border-bottom: 0;

  padding-bottom: 0;
}

.gi-info-label {
  color: var(--gi-text-muted);

  font-size: 0.78rem;
  font-weight: 600;
}

.gi-info-value {
  color: #253044;

  font-size: 0.91rem;
  font-weight: 700;

  line-height: 1.55;

  overflow-wrap: anywhere;
}

.gi-info-empty {
  color: #a4acb8;
}


/* =========================================================
   PEOPLE SECTION
   ========================================================= */

.gi-people-panel {
  background: var(--gi-surface);

  border: 1px solid var(--gi-border);

  border-radius: 13px;

  overflow: hidden;

  box-shadow:
    0 2px 7px rgba(15, 23, 42, 0.025);
}

.gi-people-columns {
  display: grid;

  grid-template-columns:
    minmax(0, 0.8fr)
    minmax(0, 1.2fr);
}

.gi-person-panel {
  padding: 26px 28px;
}

.gi-person-panel + .gi-person-panel {
  border-left: 1px solid var(--gi-border);
}

.gi-person-header {
  display: flex;
  align-items: center;

  gap: 12px;

  margin-bottom: 20px;
}

.gi-person-icon {
  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: var(--gi-primary-soft);

  color: var(--gi-primary);

  font-size: 0.9rem;
  font-weight: 800;
}

.gi-person-title {
  color: #293548;

  font-size: 0.95rem;
  font-weight: 800;
}

.gi-person-name {
  margin-bottom: 20px;

  color: #172033;

  font-size: 1.15rem;
  font-weight: 800;
}

.gi-person-details {
  display: grid;

  grid-template-columns:
    repeat(2, minmax(0, 1fr));

  gap: 14px 28px;
}

.gi-person-detail {
  min-width: 0;
}

.gi-person-label {
  display: block;

  margin-bottom: 3px;

  color: var(--gi-text-muted);

  font-size: 0.75rem;
  font-weight: 600;
}

.gi-person-value {
  color: #344054;

  font-size: 0.88rem;
  font-weight: 700;

  line-height: 1.5;

  overflow-wrap: anywhere;
}


/* =========================================================
   IMPORTANT COMPLAINT PANEL
   This is the visual hero of the page
   ========================================================= */

.gi-focus {
  position: relative;

  margin-bottom: 30px;

  background: #ffffff;

  border: 1px solid #d9d2bf;

  border-radius: 16px;

  overflow: hidden;

  box-shadow:
    0 8px 28px rgba(66, 52, 24, 0.08);
}

.gi-focus::before {
  content: "";

  position: absolute;

  top: 0;
  left: 0;
  right: 0;

  height: 4px;

  background: #b8871d;
}

.gi-focus-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  gap: 30px;

  padding: 27px 30px 24px;

  background: #fffdf8;

  border-bottom: 1px solid #eee8da;

}

.gi-focus-title-wrap {
  min-width: 0;
    margin: 0 auto;
}

.gi-focus-kicker {
  margin-bottom: 4px;

  color: #9b7622;

  font-size: 0.72rem;
  font-weight: 800;

  letter-spacing: 0.08em;

  text-transform: uppercase;
}

.gi-focus-title {
  margin: 0;

  color: #332b1d;

  font-size: 1.3rem;
  font-weight: 850;

  line-height: 1.3;
}

.gi-focus-description {
  margin-top: 5px;

  color: #827963;

  font-size: 0.82rem;

  line-height: 1.5;
}


/* =========================================================
   FOCUS SUBSECTION
   ========================================================= */

.gi-focus-section {
  padding: 25px 30px;

  border-bottom: 1px solid #eeeae2;
}

.gi-focus-section:last-child {
  border-bottom: 0;
}

.gi-focus-section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 17px;
}

.gi-focus-section-title-text {
  display: flex;
  align-items: center;

  gap: 10px;

  color: #354052;

  font-size: 0.92rem;
  font-weight: 800;
}


/* =========================================================
   CONTACT INFORMATION
   ========================================================= */

.gi-contact-grid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 12px;
}

.gi-contact-item {
  min-width: 0;

  padding: 15px 17px;

  background: #fafbfc;

  border: 1px solid #e8ebef;

  border-radius: 10px;
}

.gi-contact-label {
  margin-bottom: 6px;

  color: #8b94a3;

  font-size: 0.74rem;
  font-weight: 700;
}

.gi-contact-value {
  color: #303b4e;

  font-size: 0.88rem;
  font-weight: 750;

  line-height: 1.45;
}


/* =========================================================
   STATUS
   ========================================================= */

.gi-status {
  display: inline-flex;
  align-items: center;

  gap: 7px;

  font-weight: 800;
}

.gi-status-dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;
}

.gi-status-required {
  color: #a86411;
}

.gi-status-required .gi-status-dot {
  background: #d89326;
}

.gi-status-normal {
  color: #55705f;
}

.gi-status-normal .gi-status-dot {
  background: #72a182;
}

.gi-urgent {
  color: #b63a31;
}

.gi-urgent .gi-status-dot {
  background: #cf5147;
}


/* =========================================================
   APPEAL / PEOPLE TABLE
   ========================================================= */

.gi-table-wrapper {
  width: 100%;

  overflow-x: auto;

  border: 1px solid #e5e8ec;

  border-radius: 10px;
}

.gi-table {
  width: 100%;

  margin: 0 !important;

  border-collapse: collapse !important;

  font-size: 0.86rem;
}

.gi-table thead th {
  padding: 12px 15px !important;

  background: #f7f8fa !important;

  color: #697386 !important;

  border: 0 !important;
  border-bottom: 1px solid #e4e7eb !important;

  font-size: 0.74rem !important;
  font-weight: 800 !important;

  white-space: nowrap;
}

.gi-table tbody td {
  padding: 13px 15px !important;

  color: #344054 !important;

  border: 0 !important;
  border-bottom: 1px solid #f0f2f4 !important;

  vertical-align: middle !important;
}

.gi-table tbody tr:last-child td {
  border-bottom: 0 !important;
}

.gi-table tbody tr:hover td {
  background: #fbfcfd !important;
}

.gi-table-index {
  width: 55px;

  color: #929aa7 !important;

  text-align: center;
}

.gi-table-name {
  color: #263244 !important;

  font-weight: 750;
}

.gi-empty {
  padding: 28px 15px !important;

  color: #929aa7 !important;

  text-align: center;
}


/* =========================================================
   SUMMARY
   ========================================================= */

.gi-summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 20px;

  margin-bottom: 15px;
}

.gi-severity {
  display: inline-flex;
  align-items: center;

  gap: 7px;

  flex: 0 0 auto;

  padding: 7px 12px;

  border-radius: 8px;

  background: var(--severity-bg);

  color: var(--severity-color);

  font-size: 0.78rem;
  font-weight: 700;
}

.gi-severity strong {
  font-size: 0.95rem;
}

.gi-summary {
  padding: 19px 21px;

  background: #fafafa;

  border-left: 3px solid #c39935;

  border-radius: 0 9px 9px 0;

  color: #394457;

  font-size: 0.92rem;

  line-height: 1.85;

  white-space: pre-wrap;

  min-height: 80px;
}


/* =========================================================
   ATTACHMENTS
   ========================================================= */

.gi-attachments {
  margin-bottom: 30px;
}

.gi-attachment-panel {
  background: #ffffff;

  border: 1px solid var(--gi-border);

  border-radius: 13px;

  overflow: hidden;
}

.gi-attachment-header {
  padding: 20px 24px;

  border-bottom: 1px solid var(--gi-border);

  background: #fafbfc;
}

.gi-attachment-title {
  color: #293548;

  font-size: 0.96rem;
  font-weight: 800;
}


/* =========================================================
   OVERRIDE EXISTING ImageGallery VISUAL CLASSES
   ========================================================= */

.gi-attachment-panel .image-gallery {
  display: grid;

  grid-template-columns:
    repeat(auto-fill, minmax(170px, 1fr));

  gap: 14px;

  padding: 22px;
}

.gi-attachment-panel .image-gallery-item {
  aspect-ratio: 4 / 3;

  overflow: hidden;

  border-radius: 10px;

  background: #f3f5f7;

  border: 1px solid #e3e7eb;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.gi-attachment-panel .image-gallery-item:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(15, 23, 42, 0.12);
}

.gi-attachment-panel .image-gallery-item img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}

.gi-attachment-panel .view-document-list {
  display: flex;
  flex-direction: column;

  gap: 9px;

  padding: 20px 22px;
}

.gi-attachment-panel .view-document-item {
  display: flex;
  align-items: center;

  gap: 13px;

  padding: 12px 14px;

  background: #fafbfc;

  border: 1px solid #e5e8ec;

  border-radius: 9px;
}


/* =========================================================
   ACTION / RESULT
   ========================================================= */

.gi-result-panel {
  background: #ffffff;

  border: 1px solid var(--gi-border);

  border-radius: 13px;

  overflow: hidden;
}

.gi-result-header {
  padding: 21px 25px;

  background: #fafbfc;

  border-bottom: 1px solid var(--gi-border);
}

.gi-result-title {
  color: #293548;

  font-size: 0.98rem;
  font-weight: 800;
}

.gi-result-section {
  display: grid;

  grid-template-columns: 500px minmax(0, 1fr);

  gap: 28px;

  padding: 24px 25px;

  border-bottom: 1px solid #eef0f3;
}

.gi-result-section:last-child {
  border-bottom: 0;
}

.gi-result-label {
  position: relative;

  padding-left: 18px;

  color: #344054;

  font-size: 0.86rem;
  font-weight: 800;

  line-height: 1.45;
}

.gi-result-label::before {
  content: "";

  position: absolute;

  left: 0;
  top: 2px;

  width: 4px;
  height: 17px;

  border-radius: 4px;

  background: var(--gi-primary);
}

.gi-result-content {
  min-width: 0;

  color: #4a5568;

  font-size: 0.9rem;

  line-height: 1.8;

  white-space: pre-wrap;
}

.gi-achievement {
  display: inline-flex;
  align-items: center;

  padding: 8px 13px;

  background: var(--gi-primary-soft);

  border-radius: 8px;

  color: var(--gi-primary-dark);

  font-size: 0.84rem;
  font-weight: 800;
}


/* =========================================================
   IMAGE MODAL
   ========================================================= */

.general-info-page .image-modal {
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 30px;

  background: rgba(15, 23, 42, 0.82);

  backdrop-filter: blur(5px);
}

.general-info-page .image-modal-preview {
  max-width: min(1100px, 92vw);
  max-height: 88vh;

  object-fit: contain;

  border-radius: 10px;

  box-shadow:
    0 25px 60px rgba(0, 0, 0, 0.35);
}

.general-info-page .image-modal-close {
  position: absolute;

  top: 22px;
  right: 25px;

  width: 40px;
  height: 40px;

  border: 0;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.12);

  color: #ffffff;

  font-size: 28px;
  line-height: 1;

  cursor: pointer;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1000px) {

  .general-info-page {
    padding: 22px 20px 45px;
  }

  .gi-people-columns {
    grid-template-columns: 1fr;
  }

  .gi-person-panel + .gi-person-panel {
    border-left: 0;

    border-top: 1px solid var(--gi-border);
  }

  .gi-contact-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .gi-result-section {
    grid-template-columns: 190px minmax(0, 1fr);
  }
}


@media (max-width: 760px) {

  .general-info-page {
    padding: 16px 12px 35px;
  }

  .gi-page-header {
    padding: 20px;

    align-items: flex-start;

    flex-direction: column;
  }

  .gi-page-status {
    align-self: flex-start;
  }

  .gi-general-columns {
    grid-template-columns: 1fr;
  }

  .gi-general-group + .gi-general-group {
    border-left: 0;

    border-top: 1px solid var(--gi-border);
  }

  .gi-person-details {
    grid-template-columns: 1fr;
  }

  .gi-contact-grid {
    grid-template-columns: 1fr;
  }

  .gi-focus-header {
    padding: 23px 20px;

    flex-direction: column;
  }

  .gi-focus-section {
    padding: 21px 20px;
  }

  .gi-summary-header {
    align-items: flex-start;

    flex-direction: column;
  }

  .gi-result-section {
    grid-template-columns: 1fr;

    gap: 10px;
  }

  .gi-info-row {
    grid-template-columns: 125px minmax(0, 1fr);

    gap: 12px;
  }

  .gi-attachment-panel .image-gallery {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    padding: 15px;
  }
}


@media (max-width: 480px) {

  .gi-page-header-left {
    align-items: flex-start;
  }

  .gi-page-number {
    width: 38px;
    height: 38px;

    flex-basis: 38px;
  }

  .gi-page-title {
    font-size: 1.25rem;
  }

  .gi-general-group,
  .gi-person-panel {
    padding: 20px;
  }

  .gi-info-row {
    display: block;

    padding: 10px 0;
  }

  .gi-info-label {
    margin-bottom: 2px;
  }

  .gi-focus-title {
    font-size: 1.15rem;
  }

  .gi-table-wrapper {
    margin-left: -3px;
    margin-right: -3px;

    width: calc(100% + 6px);
  }

  .gi-attachment-panel .image-gallery {
    grid-template-columns: 1fr;
  }
}
/* =========================================================
   SECTION 3 — ANALYSIS / RESULT
========================================================= */

.gi-analysis-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}


/* ---------------------------------------------------------
   Analysis Card
--------------------------------------------------------- */

.gi-analysis-card {
  position: relative;

  background: #ffffff;

  border: 1px solid #e4e8e9;
  border-radius: 14px;

  box-shadow:
    0 3px 12px rgba(0, 0, 0, 0.035);

  overflow: hidden;

  transition:
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.gi-analysis-card:hover {
  transform: translateY(-1px);

  box-shadow:
    0 7px 20px rgba(0, 0, 0, 0.06);
}


/* ---------------------------------------------------------
   Card Header
--------------------------------------------------------- */

.gi-analysis-card-header {
  display: flex;
  align-items: center;

  gap: 12px;

  padding: 18px 20px;

  border-bottom: 1px solid #edf0f1;

  background: #fafbfb;
}


/* เลข 01 / 02 / 03 */

.gi-analysis-number {
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  height: 34px;

  border-radius: 9px;

  background: rgba(180, 130, 25, 0.12);

  color: #9a6b00;

  font-size: 12px;
  font-weight: 800;

  letter-spacing: 0.04em;
}


/* ---------------------------------------------------------
   Kicker
--------------------------------------------------------- */

.gi-analysis-kicker {
  margin-bottom: 3px;

  color: #9a6b00;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.1em;
}


/* ---------------------------------------------------------
   Title
--------------------------------------------------------- */

.gi-analysis-title {
  margin: 0;

  color: #26373c;

  font-size: 16px;
  font-weight: 700;

  line-height: 1.4;
}


/* ---------------------------------------------------------
   Body
--------------------------------------------------------- */

.gi-analysis-body {
  min-height: 80px;

  padding: 20px 22px;

  color: #46565b;

  font-size: 15px;
  line-height: 1.85;

  white-space: pre-wrap;
}


/* ---------------------------------------------------------
   กล่องที่ 03 เป็นพระเอก
--------------------------------------------------------- */

.gi-analysis-card-main {
  grid-column: 1 / -1;

  border-color: #d9c58c;

  box-shadow:
    0 5px 18px rgba(140, 105, 25, 0.08);
}

.gi-analysis-card-main .gi-analysis-card-header {
  background: #fcfaf4;

  border-bottom-color: #eadfbd;
}

.gi-analysis-card-main .gi-analysis-number {
  background: #b98a24;

  color: #ffffff;
}

.gi-analysis-card-main .gi-analysis-body {
  min-height: 170px;

  color: #38484d;
}


/* =========================================================
   Responsive
========================================================= */

@media (max-width: 900px) {

  .gi-analysis-grid {
    grid-template-columns: 1fr;
  }

  .gi-analysis-card-main {
    grid-column: auto;
  }

}


@media (max-width: 600px) {

  .gi-analysis-card-header {
    padding: 15px 16px;
  }

  .gi-analysis-body {
    padding: 17px 18px;

    font-size: 14px;
  }

}
  /* =========================================================
   RESPONSE INFORMATION
========================================================= */

.gi-response-list {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap: 12px;
}


/* แต่ละข้อมูลเป็น mini information card */

.gi-response-item {
  min-width: 0;

  padding: 16px 17px;

  background: #fafbfc;

  border: 1px solid #e7eaee;

  border-radius: 10px;
}


/* label ด้านบน */

.gi-response-label {
  margin-bottom: 7px;

  color: #8a94a3;

  font-size: 0.74rem;
  font-weight: 700;
}


/* value */

.gi-response-value {
  color: #293548;

  font-size: 0.88rem;
  font-weight: 750;

  line-height: 1.55;

  overflow-wrap: anywhere;
}


/* วันที่ให้ดูเป็นข้อมูลสำคัญนิดหนึ่ง */

.gi-response-date {
  color: #8f6a18;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 900px) {

  .gi-response-list {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

}


@media (max-width: 600px) {

  .gi-response-list {
    grid-template-columns: 1fr;
  }

}


/* =========================================================
   PAGE 04 : FINAL ANALYSIS
   ========================================================= */

.gi-final-analysis {
  padding: 20px 21px;
  background: #fafbfc;
  border: 1px solid #e5e8ec;
  border-radius: 12px;
}

.gi-final-analysis-label {
  margin-bottom: 7px;
  color: #8a94a3;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.gi-final-analysis-main {
  color: #8f6a18;
  font-size: 0.98rem;
  font-weight: 800;
  line-height: 1.65;
}

.gi-final-analysis-divider {
  height: 1px;
  margin: 17px 0;
  background: #e7eaee;
}

.gi-final-analysis-detail {
  color: #293548;
  font-size: 0.9rem;
  font-weight: 650;
  line-height: 1.7;
}


/* =========================================================
   EXTRA ANALYSIS
   ========================================================= */

.gi-analysis-extra {
  margin-top: 16px;
  padding: 19px 20px;
  background: #fff;
  border: 1px solid #e4e7eb;
  border-radius: 12px;
}

.gi-analysis-extra-header {
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 16px;
}

.gi-analysis-extra-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(180, 130, 25, 0.12);
  color: #9a6b00;
  font-size: 0.72rem;
  font-weight: 800;
}

.gi-analysis-extra-kicker {
  margin-bottom: 2px;
  color: #a0a8b3;
  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.gi-analysis-extra-title {
  color: #2d394b;
  font-size: 0.9rem;
  font-weight: 800;
}


/* =========================================================
   COMMITTEE CONTENT
   ========================================================= */

.gi-analysis-extra-content {
  padding: 15px 16px;
  background: #fafbfc;
  border: 1px solid #e8ebef;
  border-radius: 9px;
  color: #394557;
  font-size: 0.88rem;
  line-height: 1.7;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}


/* =========================================================
   CAUSE LIST
   ========================================================= */

.gi-cause-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;
}

.gi-cause-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
  padding: 12px 13px;
  background: #fafbfc;
  border: 1px solid #e8ebef;
  border-radius: 9px;
}

.gi-cause-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 25px;
  height: 25px;
  border-radius: 6px;
  background: #f0f2f4;
  color: #7d8794;
  font-size: 0.68rem;
  font-weight: 800;
}

.gi-cause-text {
  min-width: 0;
  padding-top: 3px;
  color: #394557;
  font-size: 0.82rem;
  font-weight: 650;
  line-height: 1.5;
  overflow-wrap: anywhere;
}


/* =========================================================
   ANALYSIS PERSON
   ========================================================= */

.gi-analysis-person {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 13px;
}

.gi-analysis-person-item {
  padding: 12px 14px;
  background: #fafbfc;
  border: 1px solid #e8ebef;
  border-radius: 9px;
}

.gi-analysis-person-label {
  margin-bottom: 5px;
  color: #929ba7;
  font-size: 0.7rem;
  font-weight: 800;
}

.gi-analysis-person-value {
  color: #303c4e;
  font-size: 0.84rem;
  font-weight: 750;
  overflow-wrap: anywhere;
}


/* =========================================================
   SUGGESTION PANEL
   ========================================================= */

.gi-suggestion-panel {
  padding: 20px 21px;
  background: linear-gradient(
    180deg,
    #fffdf7 0%,
    #fbfaf6 100%
  );
  border: 1px solid #e8dfc7;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(80, 65, 30, 0.05);
}

.gi-suggestion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 17px;
  border-bottom: 1px solid #eee7d7;
}

.gi-suggestion-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(180, 130, 25, 0.13);
  color: #9a6b00;
  font-size: 0.73rem;
  font-weight: 800;
}

.gi-suggestion-kicker {
  margin-bottom: 2px;
  color: #aa986f;
  font-size: 0.67rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.gi-suggestion-title {
  margin: 0;
  color: #3b3a35;
  font-size: 0.92rem;
  font-weight: 800;
}

.gi-suggestion-content {
  min-height: 100px;
  padding-top: 18px;
  color: #41464e;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.8;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {

  .gi-cause-list {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 600px) {

  .gi-analysis-person {
    grid-template-columns: 1fr;
  }

  .gi-final-analysis {
    padding: 17px;
  }

  .gi-analysis-extra {
    padding: 16px;
  }

  .gi-suggestion-panel {
    padding: 17px;
  }

}


@media (max-width: 480px) {

  .gi-final-analysis-main {
    font-size: 0.9rem;
  }

  .gi-final-analysis-detail,
  .gi-suggestion-content {
    font-size: 0.84rem;
  }

}
/* =========================================================
   SECTION 04 : RESULT SUMMARY
   ========================================================= */

.gi-result-summary {
  padding: 18px 20px;
  margin-bottom: 12px;
  background: #fafbfc;
  border: 1px solid #e5e8ec;
  border-left: 4px solid #b48619;
  border-radius: 9px;
}

.gi-result-summary-label {
  margin-bottom: 6px;
  color: #8b95a2;
  font-size: 0.72rem;
  font-weight: 800;
}

.gi-result-summary-title {
  color: #303b4c;
  font-size: 0.94rem;
  font-weight: 800;
  line-height: 1.65;
}


/* =========================================================
   REASON
   ========================================================= */

.gi-result-reason {
  padding: 16px 18px;
  margin-bottom: 12px;
  background: #fff;
  border: 1px solid #e6e9ed;
  border-radius: 9px;
}

.gi-result-reason-label {
  margin-bottom: 7px;
  color: #8b95a2;
  font-size: 0.72rem;
  font-weight: 800;
}

.gi-result-reason-text {
  color: #3b4656;
  font-size: 0.87rem;
  line-height: 1.7;
}


/* =========================================================
   EXTRA INFORMATION
   ========================================================= */

.gi-result-extra {
  padding: 16px 18px;
  margin-top: 12px;
  background: #fafbfc;
  border: 1px solid #e6e9ed;
  border-radius: 9px;
}

.gi-result-extra-label {
  margin-bottom: 9px;
  color: #8b95a2;
  font-size: 0.72rem;
  font-weight: 800;
}

.gi-result-extra-value {
  color: #303b4c;
  font-size: 0.87rem;
  font-weight: 650;
  line-height: 1.65;
}


/* =========================================================
   CAUSE TAGS
   ========================================================= */

.gi-cause-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.gi-cause-tag {
  display: inline-flex;
  align-items: center;
  padding: 7px 11px;
  background: #f7f4eb;
  border: 1px solid #e9dfc6;
  border-radius: 7px;
  color: #705716;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.4;
}


/* =========================================================
   PERSON
   ========================================================= */

.gi-result-person {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(140px, 1fr);
  gap: 10px;
  margin-top: 14px;
}

.gi-result-person > div {
  padding: 11px 13px;
  background: #fff;
  border: 1px solid #e6e9ed;
  border-radius: 8px;
}

.gi-result-person-label {
  margin-bottom: 4px;
  color: #929aa5;
  font-size: 0.69rem;
  font-weight: 800;
}

.gi-result-person-value {
  color: #303b4c;
  font-size: 0.83rem;
  font-weight: 750;
  overflow-wrap: anywhere;
}


@media (max-width: 600px) {
  .gi-result-person {
    grid-template-columns: 1fr;
  }
}
.tag-group {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-top: 10px;
}

.tag-title {
  flex: 0 0 auto;
  min-width: 100px;

  padding-top: 4px;

  font-size: 13px;
  font-weight: 600;
  color: #555;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.tag {
  padding: 4px 10px;
  border-radius: 6px;

  background: #f7f7f8;
  border: 1px solid #e2e3e5;

  color: #3f4348;
  font-size: 12px;
  font-weight: 500;
}
.thai-date {
  display: inline-block;

  color: #111827;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.5;

  white-space: nowrap;

  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  margin-left:10px;
}
  /* ประเภทข้อร้องเรียน/ข้อเสนอแนะ */
.gi-category-panel {
  padding: 20px 24px;
  background: #ffffff;
  border: 1px solid #dce9df;
  border-radius: 14px;
}

.gi-category-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.gi-category-badge {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  padding: 9px 15px;
  border: 1px solid #c7dfce;
  border-radius: 999px;
  background: #edf7ef;
  color: #21643b;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  overflow-wrap: anywhere;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.gi-category-badge:hover {
  background: #dff0e3;
  border-color: #91c6a0;
}


/* =========================================
   Risk Severity - View Only
========================================= */
.gi-risk-view {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 4px;
}

.gi-risk-type {
  min-width: 0;
  padding: 20px;
  border: 1px solid #d7e8dc;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 3px 12px rgba(32, 89, 52, 0.04);
}

.gi-risk-type-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e8f1eb;
}

.gi-risk-type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: #e5f4e9;
  color: #267344;
  font-size: 18px;
  font-weight: 700;
}

.gi-risk-type-title {
  color: #245b38;
  font-size: 15px;
  font-weight: 700;
}

.gi-risk-type-subtitle {
  margin-top: 3px;
  color: #7a9682;
  font-size: 12px;
}

.gi-risk-selected {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-top: 16px;
  padding: 14px;
  border: 1px solid #d8eade;
  border-radius: 10px;
  background: #f3faf5;
}

.gi-risk-code {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 64px;
  padding: 7px 10px;
  border: 1px solid #c8e2d0;
  border-radius: 8px;
  background: #e4f3e8;
  color: #21683b;
  font-size: 13px;
  font-weight: 700;
}

.gi-risk-detail {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
}

.gi-risk-group {
  color: #38744c;
  font-size: 12px;
  font-weight: 700;
}

.gi-risk-description {
  color: #3d5143;
  font-size: 13px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.gi-risk-badge {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 5px 10px;
  border: 1px solid #cde5d3;
  border-radius: 999px;
  background: #e6f5e9;
  color: #286b40;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
  overflow-wrap: anywhere;
}

.gi-risk-empty {
  grid-column: 1 / -1;
  padding: 20px;
  border: 1px dashed #d4e4d8;
  border-radius: 12px;
  background: #f8fbf8;
  color: #829287;
  font-size: 13px;
  text-align: center;
}

@media (max-width: 768px) {
  .gi-risk-view {
    grid-template-columns: minmax(0, 1fr);
  }
}
  .required-badge {
  background: #fee2e2;
  color: #b91c1c;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 999px;
}


/* =========================================
   GENERAL INFO — PREMIUM HOSPITAL UI
========================================= */

.general-info-page {
  --gi-navy: #183b65;
  --gi-blue: #2878c7;
  --gi-blue-soft: #eff6fd;
  --gi-green: #16865b;
  --gi-green-soft: #eff9f4;
  --gi-gold: #b58a35;
  --gi-gold-soft: #fff9ed;
  --gi-text: #25364b;
  --gi-muted: #7c8ca1;
  --gi-border: #e4eaf1;
  --gi-surface: #ffffff;

  width: 100%;
  min-width: 0;
  padding: 26px 28px 34px;
  color: var(--gi-text);
  font-family: "Mali", "Kanit", sans-serif;
  font-size: 14px;
  line-height: 1.65;
  box-sizing: border-box;
}

.general-info-page *,
.general-info-page *::before,
.general-info-page *::after {
  box-sizing: border-box;
}

.gi-content {
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
}

/* =========================================
   PAGE HEADER
========================================= */

.gi-page-header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 19px;
  min-height: 132px;
  padding: 25px 28px;
  margin-bottom: 30px;
  overflow: hidden;

  background:
    radial-gradient(
      circle at 100% 0%,
      rgba(69, 151, 225, 0.13),
      transparent 36%
    ),
    linear-gradient(115deg, #f0f7ff 0%, #ffffff 72%);

  border: 1px solid #dfeaf6;
  border-radius: 16px;
  box-shadow: 0 5px 18px rgba(30, 65, 105, 0.035);
}

.gi-page-header::after {
  position: absolute;
  content: "";
  right: -45px;
  bottom: -85px;
  width: 230px;
  height: 145px;
  background: rgba(51, 132, 207, 0.055);
  border-radius: 50%;
  pointer-events: none;
}

.gi-page-icon {
  position: relative;
  z-index: 1;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;
  color: #ffffff;
  background: var(--gi-navy);
  border-radius: 15px;
  box-shadow: 0 5px 12px rgba(24, 59, 101, 0.15);
}

.gi-page-heading {
  position: relative;
  z-index: 1;
  flex: 1;
  min-width: 0;
}

.gi-eyebrow {
  margin-bottom: 4px;
  color: var(--gi-blue);
  font-family: "Nunito", "Kanit", sans-serif;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.gi-page-heading h2 {
  margin: 0;
  color: var(--gi-navy);
  font-size: clamp(19px, 2vw, 25px);
  font-weight: 700;
  line-height: 1.45;
}

.gi-page-heading p {
  margin: 5px 0 0;
  color: var(--gi-muted);
  font-size: 12px;
}

.gi-status {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  flex-shrink: 0;
  padding: 8px 13px;

  color: var(--gi-green);
  background: #f0faf5;
  border: 1px solid #d2ecdf;
  border-radius: 8px;

  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
}

/* =========================================
   SECTION LAYOUT
========================================= */

.gi-section {
  margin-bottom: 28px;
}

.gi-section-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 17px;
}

.gi-section-icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 43px;
  height: 43px;
  border-radius: 12px;
}

.gi-section-icon-blue {
  color: var(--gi-blue);
  background: #edf5ff;
  border: 1px solid #e0edfc;
}

.gi-section-icon-gold {
  color: #a67b22;
  background: #fff7e5;
  border: 1px solid #f6e8c5;
}

.gi-section-heading {
  flex: 1;
  min-width: 0;
}

.gi-section-heading h3 {
  margin: 0;
  color: var(--gi-navy);
  font-size: 17px;
  font-weight: 700;
  line-height: 1.5;
}

.gi-section-heading p {
  margin: 3px 0 0;
  color: var(--gi-muted);
  font-size: 11px;
  line-height: 1.6;
}

.gi-section-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;

  color: #788ba1;
  background: #f5f8fb;
  border: 1px solid #e9eef4;
  border-radius: 9px;

  font-family: "Nunito", sans-serif;
  font-size: 12px;
  font-weight: 800;
}

/* =========================================
   ANALYSIS CARD
========================================= */

.gi-analysis-card {
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 20px;

  background: var(--gi-surface);
  border: 1px solid var(--gi-border);
  border-radius: 13px;
  box-shadow: 0 3px 12px rgba(27, 52, 80, 0.025);
}

/* Main result */

.gi-result-card {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;

  background: var(--gi-green-soft);
  border: 1px solid #dcefe5;
  border-left: 4px solid var(--gi-green);
  border-radius: 10px;
}

.gi-result-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 39px;
  height: 39px;
  margin-top: 2px;

  color: #ffffff;
  background: var(--gi-green);
  border-radius: 11px;
}

.gi-result-body {
  flex: 1;
  min-width: 0;
}

.gi-field-label {
  margin-bottom: 6px;
 color: var(--gi-green);
  font-size: 13px;
  font-weight: 700;
}

.gi-field-label2 {
  margin-bottom: 6px;
  color: var(--gi-blue);
  font-size: 13px;
  font-weight: 700;
}


.gi-result-title {
  font-size: 14px;
  font-weight: 700;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

.gi-result-badge {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: 5px 9px;
  margin-top: 2px;

  color: var(--gi-green);
  background: #ffffff;
  border: 1px solid #dcefe5;
  border-radius: 6px;

  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}

/* Reason / details */

.gi-detail-card {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 19px 20px;

  background: #f7faff;
  border: 1px solid #e4edf9;
  border-radius: 10px;

  border-left: 4px solid var(--gi-blue);
}




.gi-detail-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 39px;
  height: 39px;
  color: #ffffff;
   background: var(--gi-blue);
  border-radius: 9px;
}

.gi-detail-body {
  flex: 1;
  min-width: 0;
  padding-top: 1px;
}

.gi-detail-text {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.8;
  overflow-wrap: anywhere;
}

/* =========================================
   ADDITIONAL DETAILS
========================================= */

.gi-extra-card {
  padding: 19px;
  background: #fbfcfe;
  border: 1px solid #e8edf4;
  border-radius: 10px;
}

.gi-extra-heading {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 14px;

  color: var(--gi-navy);
  font-size: 13px;
  font-weight: 700;
}

.gi-extra-heading svg {
  color: var(--gi-blue);
}

.gi-extra-value {
  padding: 13px 15px;
  color: var(--gi-text);
  background: #ffffff;
  border: 1px solid var(--gi-border);
  border-radius: 8px;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.gi-cause-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.gi-cause-tag {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  padding: 7px 11px;

  color: #355b83;
  background: #eff6fd;
  border: 1px solid #dce9f7;
  border-radius: 7px;

  font-size: 11px;
  line-height: 1.7;
  overflow-wrap: anywhere;
}

.gi-info-empty {
  color: var(--gi-muted);
  font-size: 12px;
}

/* Staff information */

.gi-person-card {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #e7edf4;
}

.gi-person-heading {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 13px;

  color: var(--gi-navy);
  font-size: 12px;
  font-weight: 700;
}

.gi-person-heading svg {
  color: var(--gi-blue);
}

.gi-person-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.65fr);
  gap: 12px;
}

.gi-person-field {
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 12px 14px;

  background: #ffffff;
  border: 1px solid var(--gi-border);
  border-radius: 8px;
}

.gi-person-value {
  display: flex;
  align-items: center;
  gap: 4px;
  color: var(--gi-text);
  font-size: 12px;
  font-weight: 600;
  overflow-wrap: anywhere;
}

/* =========================================
   SUGGESTIONS
========================================= */

.gi-suggestion-section {
  margin-top: 30px;
}

.gi-suggestion-card {
  position: relative;
  padding: 22px 24px;

  background: linear-gradient(135deg, #fffdf8 0%, #ffffff 100%);
  border: 1px solid #eee3ca;
  border-left: 4px solid #d6aa51;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(117, 88, 35, 0.035);
}

.gi-suggestion-top {
  display: flex;
  align-items: center;
  gap: 13px;
}

.gi-suggestion-number {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 43px;
  height: 43px;
  color: #956b1d;
  background: #fff3d5;
  border: 1px solid #f4e5bd;
  border-radius: 10px;

  font-family: "Nunito", sans-serif;
  font-size: 17px;
  font-weight: 800;
}

.gi-suggestion-heading {
  min-width: 0;
}

.gi-suggestion-kicker {
  display: block;
  margin-bottom: 3px;

  color: #a17a32;
  font-family: "Nunito", sans-serif;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
}

.gi-suggestion-heading h4 {
  margin: 0;
  color: var(--gi-navy);
  font-size: 14px;
  font-weight: 700;
}

.gi-suggestion-divider {
  height: 1px;
  margin: 17px 0;
  background: #eee6d6;
}

.gi-suggestion-content {
  min-height: 100px;
  color: #465b72;
  font-size: 13px;
  line-height: 1.9;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

/* =========================================
   RESPONSIVE
========================================= */

@media (min-width: 1200px) {
  .general-info-page {
    padding-right: 34px;
    padding-left: 34px;
  }
}

@media (max-width: 768px) {
  .general-info-page {
    padding: 18px 14px 26px;
  }

  .gi-page-header {
    gap: 13px;
    min-height: auto;
    padding: 20px 17px;
    margin-bottom: 24px;
    border-radius: 13px;
  }

  .gi-page-icon {
    width: 47px;
    height: 47px;
    border-radius: 12px;
  }

  .gi-page-heading h2 {
    font-size: 18px;
  }

  .gi-page-heading p {
    font-size: 11px;
  }

  .gi-status {
    align-self: flex-start;
    gap: 5px;
    padding: 6px 8px;
    font-size: 10px;
  }

  .gi-section {
    margin-bottom: 24px;
  }

  .gi-section-header {
    gap: 11px;
    margin-bottom: 13px;
  }

  .gi-section-heading h3 {
    font-size: 15px;
  }

  .gi-section-heading p {
    font-size: 10px;
  }

  .gi-section-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
  }

  .gi-section-index {
    width: 30px;
    height: 30px;
  }

  .gi-analysis-card {
    gap: 11px;
    padding: 12px;
  }

  .gi-result-card {
    gap: 11px;
    padding: 15px 13px;
  }

  .gi-result-icon {
    width: 33px;
    height: 33px;
    border-radius: 9px;
  }

  .gi-result-title {
    font-size: 12px;
  }

  .gi-result-badge {
    display: none;
  }

  .gi-detail-card {
    gap: 10px;
    padding: 15px 13px;
  }

  .gi-detail-icon {
    width: 32px;
    height: 32px;
     border-radius: 9px;
  }

  .gi-detail-text {
    font-size: 12px;
  }

  .gi-extra-card {
    padding: 15px;
  }

  .gi-person-grid {
    grid-template-columns: 1fr;
  }

  .gi-suggestion-section {
    margin-top: 24px;
  }

  .gi-suggestion-card {
    padding: 18px 16px;
  }
}

@media (max-width: 480px) {
  .general-info-page {
    padding-right: 10px;
    padding-left: 10px;
  }

  .gi-page-header {
    flex-wrap: wrap;
    padding: 17px 14px;
  }

  .gi-page-heading {
    flex-basis: calc(100% - 62px);
  }

  .gi-page-heading h2 {
    font-size: 16px;
  }

  .gi-status {
    margin-left: 60px;
  }

  .gi-section-index {
    display: none;
  }

  .gi-analysis-card {
    padding: 9px;
  }

  .gi-result-card {
    gap: 9px;
    padding: 13px 10px;
  }

  .gi-detail-card {
    padding: 13px 10px;
  }

  .gi-field-label {
    font-size: 10px;
  }

  .gi-cause-tags {
    gap: 6px;
  }

  .gi-cause-tag {
    padding: 6px 8px;
    font-size: 10px;
  }

  .gi-suggestion-card {
    padding: 16px 13px;
  }

  .gi-suggestion-content {
    font-size: 12px;
  }
}

`;
