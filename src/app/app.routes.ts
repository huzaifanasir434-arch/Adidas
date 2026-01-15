import { EditProductComponent } from './edit-product/edit-product';
import { Routes } from '@angular/router';
import { Category } from './category/category';
import { CategoriesComponent } from './categories/categories';
import { Login } from './login/login';
import { Register } from './register/register';


export const routes: Routes = [

    { path: '', redirectTo: 'category/samba', pathMatch: 'full' },

  { path: 'category/:category', component: CategoriesComponent },

  { path: 'edit-product/:id', component: EditProductComponent },

  { path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.ProfileComponent) },

  {
  path: 'order-history',
  loadComponent: () => import('./order-history/order-history').then(m => m.OrderHistoryComponent)
},

   { path: 'login', component: Login },

  { path: 'register', component: Register },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./product-details/product-details')
        .then(m => m.ProductDetails)
  },

  {
  path: 'orders',
  loadComponent: () =>
    import('./order/order')
      .then(m => m.OrdersComponent)
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
