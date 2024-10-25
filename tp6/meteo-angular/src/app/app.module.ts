// app.module.ts

import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";

import { RouterModule, Routes } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MeteoComponent } from "./meteo/meteo.component";
import { MeteoDetailComponent } from "./meteo-detail/meteo-detail.component";

const appRoutes: Routes = [
  {
    path: "", // La page principale utilisera le composant suivant
    component: MeteoComponent,
  },
  {
    path: "meteo/:name", // La page affichant la météo prendra comme paramètre 'name'
    component: MeteoDetailComponent, // Ce composant fera l'appel AJAX et affichera les données reçues par openWeatherMap
  },
  {
    path: "**", // Un chemin vers une page inexistante redirigera vers '/'
    redirectTo: "/",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [
    // Ajouter ici tous les composants de votre application
    AppComponent,
    MeteoComponent,
    MeteoDetailComponent,
  ],
  imports: [
    // Modules nécessaires pour l'application
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }), // Debugging purposes only
  ],
  providers: [DatePipe], // Si DatePipe est utilisé dans l'application
  bootstrap: [AppComponent],
})
export class AppModule { }