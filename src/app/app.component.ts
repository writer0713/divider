import { Component } from "@angular/core";
import { MatExpansionPanel, MatExpansionPanelHeader, MatAccordion, MatFormField, MatOption, MatSelect } from "@angular/material";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "GROUP DIVIDER";

  maxNumber: number;
  numberOfGroup: number;
  disableButton: boolean = true;

  tempNumbers: number[] = [];
  results: number[][] = [];

  constructor() { }

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

    let total: number = this.maxNumber;
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
}
