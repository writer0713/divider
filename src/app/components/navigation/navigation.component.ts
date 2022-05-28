import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.component.html",
  styleUrls: ["./navigation.component.css"],
})
export class NavigationComponent implements OnInit {
  currentPath: string;
  constructor(private router: Router, private location: Location) {
    this.initPath();
  }

  private initPath() {
    const path = this.location.path().replace("/", ""); // ex. /basic -> basic
    this.currentPath = path.length === 0 ? "basic" : path;

    console.log(path);
  }

  ngOnInit(): void {}

  route(path: String) {
    this.router.navigate([path]);
  }
}
