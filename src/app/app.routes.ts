import { EditProductComponent } from './edit-product/edit-product';
import { Routes } from '@angular/router';
import { Category } from './category/category';
import { CategoriesComponent } from './categories/categories';


export const routes: Routes = [

  { path: '', redirectTo: 'category/samba', pathMatch: 'full' },

  { path: 'category/:category', component: CategoriesComponent },

  { path: 'edit-product/:id', component: EditProductComponent },

  { path: '**', redirectTo: 'category/samba' }
];

   // ✅ Dynamic route LAST
  // { path: ':category', component: CategoriesComponent },


    // ✅ ALWAYS put specific routes FIRST
  // { path: 'edit-product/:id', component: EditProductComponent },


//   { path: 'category', component: Category },
//   {
//         path: 'samba',
//         component: Samba,
//       },
//  {
//         path: 'gazelle',
//         component: Gazelle,
//       }
