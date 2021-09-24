import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToolComponent } from './layouts/tool/tool.component';

const routes: Routes = [
  {
    path:'',component:ToolComponent
  },
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
