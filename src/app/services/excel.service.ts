import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  public exportAsExcelFile(jsonData: number[][], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(jsonData);
    const workbook: XLSX.WorkBook = {Sheets: { 'data': worksheet }, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});

    console.log(jsonData);
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});

    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
