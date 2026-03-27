const SPREADSHEET_ID = "1bqkKT8CTVe2ClJCVp4hkODdIWBW-w6QUUOv6PDERmjc";
const SHEET_NAME = "Sheet1";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const email = String(payload.email || "").trim();
    const source = String(payload.source || "").trim();

    if (!email) {
      return jsonResponse({ ok: false, error: "Missing email." });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      return jsonResponse({ ok: false, error: "Sheet not found." });
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Email", "Source"]);
    }

    sheet.appendRow([new Date(), email, source]);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: "otravez-signups" });
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
