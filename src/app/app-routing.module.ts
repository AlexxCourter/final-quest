import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestComponent } from './quest/quest.component';
import { QuestPathComponent } from './quest/quest-path/quest-path.component';
import { QuestOutcomeComponent } from './quest/quest-outcome/quest-outcome.component';
import { InventoryComponent } from './inventory/inventory.component';
import { StatsComponent } from './stats/stats.component';
import { InventoryItemComponent } from './inventory/inventory-item/inventory-item.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/quest', pathMatch: 'full'},
  {path: 'quest', component: QuestComponent, children: [
    {path: ':location', component: QuestPathComponent},
    {path: ':location/:direction', component: QuestOutcomeComponent},
    
  ]},
  {path: 'inventory', component: InventoryComponent, children: [
    {path: ':id', component: InventoryDetailComponent}
  ]},
  {path: 'stats', component: StatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
