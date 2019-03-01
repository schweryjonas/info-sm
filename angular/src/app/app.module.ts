import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SparqlDataService } from './shared/sparql-data.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FilterComponent } from './evaluation/filter/filter.component';
import { TimelineChartComponent } from './evaluation/filter/timeline-chart/timeline-chart.component';
import { FrequencyChartComponent } from './evaluation/filter/frequency-chart/frequency-chart.component';
import { MapChartComponent } from './evaluation/filter/map-chart/map-chart.component';
import { ChartModule } from 'angular-highcharts';
import { LanguageService } from './shared/language.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ErrorComponent } from './error.component';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule} from '@angular/material/sort';
import  {MatTooltipModule} from '@angular/material/tooltip';
import { MatPaginatorI18nService} from './shared/mat-paginator-i18n.service'
import { MatPaginatorIntl } from '@angular/material';
import { DistributeDataService } from './shared/distribute-data.service';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    EvaluationComponent,
    FilterComponent,
    TimelineChartComponent,
    FrequencyChartComponent,
    MapChartComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    FormsModule,
    NgSelectModule,
    AngularFontAwesomeModule,
    MatTableModule,
    MatPaginatorModule,
    NoopAnimationsModule,
    MatSortModule,
    MatTooltipModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    SparqlDataService,
    LanguageService,
    DistributeDataService,
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorI18nService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}