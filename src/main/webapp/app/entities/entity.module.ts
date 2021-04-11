import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.JHipsterClientModule),
      },
      {
        path: 'coursier',
        loadChildren: () => import('./coursier/coursier.module').then(m => m.JHipsterCoursierModule),
      },
      {
        path: 'commercant',
        loadChildren: () => import('./commercant/commercant.module').then(m => m.JHipsterCommercantModule),
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./utilisateur/utilisateur.module').then(m => m.JHipsterUtilisateurModule),
      },
      {
        path: 'panier',
        loadChildren: () => import('./panier/panier.module').then(m => m.JHipsterPanierModule),
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.JHipsterCourseModule),
      },
      {
        path: 'produit',
        loadChildren: () => import('./produit/produit.module').then(m => m.JHipsterProduitModule),
      },
      {
        path: 'commerce',
        loadChildren: () => import('./commerce/commerce.module').then(m => m.JHipsterCommerceModule),
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./restaurant/restaurant.module').then(m => m.JHipsterRestaurantModule),
      },
      {
        path: 'autre-commerce',
        loadChildren: () => import('./autre-commerce/autre-commerce.module').then(m => m.JHipsterAutreCommerceModule),
      },
      {
        path: 'commande',
        loadChildren: () => import('./commande/commande.module').then(m => m.JHipsterCommandeModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JHipsterEntityModule {}
