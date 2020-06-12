import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from "@angular/core";
import { ExcelService } from './services/excel.service';
import { MatExpansionPanel, MatExpansionPanelHeader, MatAccordion, MatFormField, MatOption, MatSelect, MatChipInput, MatChipInputEvent } from "@angular/material";
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { DialogComponent } from './dialog/dialog.component';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "GROUP DIVIDER";

  maxNumber: number;
  numberOfGroup: number;
  tempNumbers: number[] = []; // 번호를 담을 bucket
  results: number[][] = []; // 최종 결과
  disableButton: boolean = true;

  // 제외할 번호 input-form 관련 변수들
  numbersToExclude: number[] = [];
  visible = true;
  removable = true;
  addOnBlur = true;
  selectable = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private excelService: ExcelService,
    private dialog: MatDialog) { 
  } // end of constructor


  exportAsXLSX(): void {
    const data = _.cloneDeep(this.results);
    data.forEach((group: any[], index: number) => {
      group.unshift(++index + "조");
    });
    this.excelService.exportAsExcelFile(data, 'sample');
  }

  checkButtonStatus() {
    if (this.hasAllInputs() && this.hasProperNumbers()) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  /**
   * 모든 input에 입력했는지 확인
   */
  hasAllInputs(): boolean {
    return this.maxNumber > 0 && this.numberOfGroup > 0;
  }

  /**
   * 입력한 숫자가 올바른지 확인
   *
   * 최대인원수 >= 조 개수
   */
  hasProperNumbers(): boolean {
    return this.maxNumber >= this.numberOfGroup;
  }

  divide() {
    this.reset();
    this.generateNumbers();

    let total: number = this.tempNumbers.length;
    let numberOfGroup: number = this.numberOfGroup; // 조 개수
    let numberPerGroup: number = total / numberOfGroup; // 한 조당 조원수
    let rest: number = total % numberOfGroup; // 남은 아이들

    for (let i = 1; i <= numberOfGroup; i++) {
      const group: number[] = this.divideFirst(numberPerGroup);
      this.results.push(group);
    }

    this.divideRest(rest);
  }

  divideFirst(numberPerGroup: number): number[] {
    const group: number[] = [];
    for (let k = 1; k <= numberPerGroup; k++) {
      group.push(this.tempNumbers.pop());
    }
    group.sort(this.ascending);
    return group;
  }

  divideRest(rest: number) {
    for (let i = 1; i <= rest; i++) {
      const group: number[] = this.results[i];
      group.push(this.tempNumbers.pop());
      group.sort(this.ascending);
    }
  }

  ascending(a: number, b: number) {
    return a - b;
  }

  /**
   * 최대 번호만큼의 인원수(번호)를 생성
   */
  generateNumbers() {
    const maxNumber: number = this.maxNumber;
    for (let i = 1; i <= maxNumber; i++) {
      if (this.numbersToExclude.includes(i)) {
        continue;
      }

      this.tempNumbers.push(i);
    }
    this.shuffle(this.tempNumbers);
  }

  /**
   * 리셋
   */
  reset() {
    this.tempNumbers = [];
    this.results = [];
  }

  /**
   *
   * @param numbers number array 셔플
   */
  shuffle(numbers: number[]) {
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }

  /**
   * 제외할 번호를 list(numbersToExclude) 에 추가
   * @param event 
   */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const inputNumber = Number(event.value);

    if (inputNumber === 0) {
      input.value = '';
      return;
    }

    if (this.numbersToExclude.includes(inputNumber)) {
      this.openDialog();
      input.value = '';
      input.focus();
      return;
    }
    
    // Add inputNumber
    this.numbersToExclude.push(inputNumber);

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /**
   * 제외 번호 list에서 제거
   * @param exclusionNumber 
   */
  remove(exclusionNumber: number): void {
    const index = this.numbersToExclude.indexOf(exclusionNumber);

    if (index >= 0) {
      this.numbersToExclude.splice(index, 1);
    }
  }

  /**
   * 이미 추가했다는 alert 노출
   */
  openDialog() {
    this.dialog.open(DialogComponent);
  }
}
