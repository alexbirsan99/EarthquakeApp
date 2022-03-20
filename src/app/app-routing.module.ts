import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarthquakeListComponent } from './earthquake-list/earthquake-list.component';
import { EarthquakeMapComponent } from './earthquake-map/earthquake-map.component';

const routes: Routes = [
  {path: '', component: EarthquakeListComponent},
  {path: 'list', component: EarthquakeListComponent},
  {path: 'map', component: EarthquakeMapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
