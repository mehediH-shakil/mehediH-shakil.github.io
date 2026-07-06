const getSheetData = (workbook, name) => {
    let sheet = workbook.Sheets[name];
    return sheet ? XLSX.utils.sheet_to_json(sheet) : [];
};