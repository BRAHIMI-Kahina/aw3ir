import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeteoComponent } from './meteo/meteo.component';
import { MeteoDetailComponent } from './meteo-detail/meteo-detail.component';

const routes: Routes = [
  {
    path: '', // Route pour la page principale
    component: MeteoComponent,
  },
  {
    path: 'meteo/:name', // Route pour afficher la météo d'une ville spécifique
    component: MeteoDetailComponent,
  },
  {
    path: '**', // Route pour les pages inexistantes, redirige vers la page d'accueil
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], // Ajout du paramètre enableTracing pour le débogage
  exports: [RouterModule]
})
export class AppRoutingModule { }
