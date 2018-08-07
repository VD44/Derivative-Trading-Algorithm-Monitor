import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatTableModule, MatAutocompleteModule } from '@angular/material';
import { MyDashComponent } from './my-dash/my-dash.component';
import { MyMainComponent } from './my-main/my-main.component';
import { MyAboutComponent } from './my-about/my-about.component';

const appRoutes: Routes = [
  { path: '', component: MyDashComponent },
  { path: 'main/:id',      component: MyMainComponent },
  { path: 'about',      component: MyAboutComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    MyDashComponent,
    MyMainComponent,
    MyAboutComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
