import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatChipsModule } from "@angular/material/chips";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DeviceDetectorModule } from "ngx-device-detector";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BasicDividerComponent } from "./components/basic-divider/basic-divider.component";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { SelectiveDividerComponent } from "./components/selective-divider/selective-divider.component";
import { DialogComponent } from "./dialog/dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    BasicDividerComponent,
    SelectiveDividerComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    DeviceDetectorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
