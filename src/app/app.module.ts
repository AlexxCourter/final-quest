import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { QuestComponent } from './quest/quest.component';
import { QuestPathComponent } from './quest/quest-path/quest-path.component';
import { QuestOutcomeComponent } from './quest/quest-outcome/quest-outcome.component';
import { InventoryComponent } from './inventory/inventory.component';
import { StatsComponent } from './stats/stats.component';
import { InventoryItemComponent } from './inventory/inventory-item/inventory-item.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventoryDetailComponent } from './inventory/inventory-detail/inventory-detail.component';
import { ResultHandlerComponent } from './quest/quest-outcome/result-handler/result-handler.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    QuestComponent,
    QuestPathComponent,
    QuestOutcomeComponent,
    InventoryComponent,
    StatsComponent,
    InventoryItemComponent,
    InventoryListComponent,
    InventoryDetailComponent,
    ResultHandlerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
