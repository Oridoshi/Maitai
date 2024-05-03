import React, { useState } from 'react';
import XLSX from 'xlsx-style';

function ExcelViewer() {
  const [excelData, setExcelData] = useState(null);

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(jsonData);
    };
    reader.readAsArrayBuffer(fileObj);
  };

  return (
    <div>
      <input type="file" onChange={fileHandler} accept=".xls,.xlsx" />
      {excelData && (
        <table>
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExcelViewer;
