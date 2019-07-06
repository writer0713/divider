import { Component } from "@angular/core";
import { MatFormField, MatOption, MatSelect } from "@angular/material";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "GROUP DIVIDER";

  maxNumber: number;
  numberPerGroup: number;
  numberOfGroup: number;
  disableButton: boolean = true;

  tempNumbers: number[] = [];
  results: number[][] = [];

  checkButtonStatus() {
    if (this.hasAllInputs() && this.hasProperNumbers()) {
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  hasAllInputs(): boolean {
    return this.maxNumber > 0 && this.numberOfGroup > 0;
  }

  hasProperNumbers(): boolean {
    return this.maxNumber >= this.numberOfGroup;
  }

  divide() {
    this.reset();
    this.generateNumbers();

    let total: number = this.maxNumber;
    let numberOfGroup: number = this.numberOfGroup;
    let numberPerGroup: number = total / numberOfGroup; // 한 조당 조원수
    let rest: number = total % numberOfGroup; // 남은 아이들

    for (let i = 1; i <= numberOfGroup; i++) {
      const group: number[] = [];
      for (let k = 1; k <= numberPerGroup; k++) {
        group.push(this.tempNumbers.pop());
      }
      group.sort((a, b) => a - b);

      this.results.push(group);
    }

    for (let z = 1; z <= rest; z++) {
      const group: number[] = this.results[z];
      group.push(this.tempNumbers.pop());
      group.sort((a, b) => a - b);
    }

    console.log(this.results);
  }

  generateNumbers() {
    const maxNumber: number = this.maxNumber;
    for (let i = 1; i <= maxNumber; i++) {
      this.tempNumbers.push(i);
    }
    this.shuffle(this.tempNumbers);
  }

  reset() {
    this.tempNumbers = [];
    this.results = [];
  }

  getRandomInt(max: number) {
    const min: number = 1;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  shuffle(numbers: number[]) {
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  }
}
