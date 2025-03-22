import { COMMA, ENTER, PERIOD, SHIFT, SPACE } from "@angular/cdk/keycodes";
import { Component } from "@angular/core";
import { MatChipInputEvent } from "@angular/material/chips";
import { MatDialog } from "@angular/material/dialog";
import * as _ from "lodash";
import { DeviceDetectorService } from "ngx-device-detector";
import { DialogComponent } from "src/app/dialog/dialog.component";
import { ExcelService } from "src/app/services/excel.service";

@Component({
  selector: "app-selective-divider",
  templateUrl: "./selective-divider.component.html",
  styleUrls: ["./selective-divider.component.css"],
})
export class SelectiveDividerComponent {
  numberOfPeople: number;
  numberOfGroup: number;
  tempNumbers: number[] = []; // 번호를 담을 bucket
  results: number[][] = []; // 최종 결과
  disableButton: boolean = true;

  // 번호 input-form 관련 변수들
  numbersToDivide: number[] = [];
  visible = true;
  removable = true;
  addOnBlur = true;
  selectable = true;
  readonly separatorKeysCodes: number[] = [ENTER];

  tooltipMessage: string;
  os: string;

  constructor(
    private excelService: ExcelService,
    private deviceService: DeviceDetectorService,
    private dialog: MatDialog
  ) {
    this.detectOS();
    this.initTooltipMessageForMobile();
  }
  checkButtonStatus() {
    if (this.hasAllInputs() && this.hasProperNumbers()) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  detectOS() {
    const deviceInfo = this.deviceService.getDeviceInfo();
    const os = deviceInfo.os;

    this.os = os;
  }

  initTooltipMessageForMobile() {
    const os = this.os.toLowerCase();
    const isDesktop = this.deviceService.isDesktop();

    if (isDesktop) {
      this.tooltipMessage = "입력 후 'Enter' 키를 누르세요.";
      return;
    }

    switch (os) {
      case "android":
        this.tooltipMessage = "입력 후 '이동' 버튼을 누르세요.";
        break;
      case "ios":
      case "mac":
        this.tooltipMessage = "입력 후 '↵' 혹은 'return' 버튼을 누르세요.";
    }
  }

  exportAsXLSX(): void {
    const data = _.cloneDeep(this.results);
    data.forEach((group: any[], index: number) => {
      group.unshift(++index + "조");
    });
    this.excelService.exportAsExcelFile(data, "sample");
  }

  /**
   * 모든 input에 입력했는지 확인
   */
  hasAllInputs(): boolean {
    return this.numberOfPeople > 0 && this.numberOfGroup > 0;
  }

  /**
   * 입력한 숫자가 올바른지 확인
   *
   * 최대인원수 >= 조 개수
   */
  hasProperNumbers(): boolean {
    return this.numberOfPeople >= this.numberOfGroup;
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

  generateNumbers() {
    this.tempNumbers = [...this.numbersToDivide];
    this.shuffle(this.numbersToDivide);
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
      input.value = "";
      return;
    }

    if (this.numbersToDivide.includes(inputNumber)) {
      this.openDialog();
      input.value = "";
      input.focus();
      return;
    }

    // Add inputNumber
    this.numbersToDivide.push(inputNumber);
    this.numberOfPeople = this.numbersToDivide.length;

    // Reset the input value and maintain focus
    if (input) {
      input.value = "";
      input.focus();
    }
  }

  /**
   * 제외 번호 list에서 제거
   * @param exclusionNumber
   */
  remove(exclusionNumber: number): void {
    const index = this.numbersToDivide.indexOf(exclusionNumber);

    if (index >= 0) {
      this.numbersToDivide.splice(index, 1);
    }
  }

  /**
   * 이미 추가했다는 alert 노출
   */
  openDialog() {
    this.dialog.open(DialogComponent);
  }

  onFocus(tooltip) {
    tooltip.show();
  }
}
