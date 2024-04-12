chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extractData") {
        console.log("Received message:", message);
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

            // Send the combined data back as the response
            console.log(comparisonResult);
            sendResponse({ success: true, data: comparisonResult });
        } catch (error) {
            console.error("Error processing data:", error);
            // Send an error response back
            sendResponse({ success: false, error: error.toString() });
        }
    }
    return true;
});


function extractTableDataByName(tableName) {
    const allTds = document.querySelectorAll('td');
    let filteredCaseIDs = [];
    allTds.forEach(td => {
        if (tableName === td.textContent.trim()) {
            console.log("MATCH FOUND: " + td.textContent.trim() + "AND: " + tableName);
            const tbody = td.closest('tbody');
            const rows = tbody.querySelectorAll('tr:not(:first-child)');
            const caseRows = Array.from(rows).filter((row) => row.classList.contains('tableroweven') || row.classList.contains('tablerowodd'));
            // Extract data from each row
            const tableData = Array.from(caseRows).flatMap(row => {
                const reportLinkNodeList = row.querySelectorAll('.report_link');
                const caseIDs = Array.from(reportLinkNodeList).map(report =>
                    report.innerText
                );
                return caseIDs;
            });
            filteredCaseIDs = tableData.filter(str => str.match(/^\d{2}-\d{7}$/));
        }
    });
    return filteredCaseIDs;
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