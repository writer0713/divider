import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BasicDividerComponent } from "./components/basic-divider/basic-divider.component";
import { SelectiveDividerComponent } from "./components/selective-divider/selective-divider.component";

const routes: Routes = [
  { path: "basic", component: BasicDividerComponent },
  { path: "selective", component: SelectiveDividerComponent },
  { path: "", redirectTo: "/basic", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
