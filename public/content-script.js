chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractData") {
        let combinedData = [];

        try {
            // Process each table name and extract data
            message.tables.forEach((tableName) => {
                const tableData = extractTableDataByName(tableName);
                if (tableData) {
                    combinedData = combinedData.concat(tableData);
                } else {
                    console.error(`No data found for table: ${tableName}`);
                }
            });

            const comparisonResult = compareExtractedAndExcel(combinedData, message.excelText)

            sendResponse({ success: true, data: comparisonResult });
        } catch (error) {
            console.error("Error processing data:", error);
            sendResponse({ success: false, error: error.toString() });
        }
    }
    return true;
});

function extractTableDataByName(grantName) {
    const grantData = [];
    const grantNameElements = document.querySelectorAll('td[style*="margin-left: 30px;"]');
    for (const elem of grantNameElements) {
      if (elem.textContent.trim() === grantName) {
        let row = elem.closest('tr').nextElementSibling;
        
        while (row) {
          if (row.classList.contains("tableroweven") || row.classList.contains("tablerowodd")) {
            const caseIdLink = row.querySelector('td > a.report_link');
            const caseId = caseIdLink ? caseIdLink.textContent.trim() : null;
            if (caseId && caseId.match(/^\d{2}-\d{7}$/)) {
              grantData.push(caseId);
            }
          } else {
            break;
          }
          row = row.nextElementSibling;
        }
        break;
      }
    }
    return grantData;
  }
  
function compareExtractedAndExcel(extracted, excel) {
    let missingExcelValues = [];
    let missingLSValues = [];
    const cleanedExcelInput = cleanExcelInput(excel);
    extracted.forEach((caseID) => {
        if (!cleanedExcelInput.includes(caseID)) {
            missingExcelValues.push(caseID);
        }
    })
    cleanedExcelInput.forEach((caseID) => {
        if (!extracted.includes(caseID)) {
            missingLSValues.push(caseID);
        }
    })
    return { missingExcelValues, missingLSValues };
}

function cleanExcelInput(excel) {
    if (excel.includes('CASE NUMBER')) {
        excel = excel.substr(12);
    }
    return excel.split(' ').filter((id) => id !== '');
}