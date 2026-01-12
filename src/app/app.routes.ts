import { EditProductComponent } from './edit-product/edit-product';
import { Routes } from '@angular/router';
// import { Category } from './category/category';
import { CategoriesComponent } from './categories/categories';


export const routes: Routes = [

    { path: '', redirectTo: 'category/samba', pathMatch: 'full' },

  { path: 'category/:category', component: CategoriesComponent },

  { path: 'edit-product/:id', component: EditProductComponent },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./product-details/product-details')
        .then(m => m.ProductDetails)
  },

  { path: '**', redirectTo: 'category/samba' }

];

// ..................................................................

// { path: '', redirectTo: 'category/samba', pathMatch: 'full' },

//   {
//     path: 'category/:category',
//     component: CategoriesComponent,
//     children: [
//       {
//          path: 'edit-product/:id',
//         component: EditProductComponent
//       },
//       {
//         path: 'product/:id',
//         loadComponent: () =>
//           import('./product-details/product-details')
//             .then(m => m.ProductDetails)
//       }
//     ]
//   },

//   { path: '**', redirectTo: 'category/samba' }
// ];



// .................................................................// Old Code

//   { path: '', redirectTo: 'category/samba', pathMatch: 'full' },

//   { path: 'category/:category', component: CategoriesComponent },

//   { path: 'edit-product/:id', component: EditProductComponent },

//   { path: '**', redirectTo: 'category/samba' }
// ];
