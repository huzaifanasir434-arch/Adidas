import { Routes } from '@angular/router';
import { Samba } from './samba/samba';
import { Gazelle } from './gazelle/gazelle';
import { Category } from './category/category';

export const routes: Routes = [
  { path: 'category', component: Category },
  {
        path: 'samba',
        component: Samba,
      },
 {
        path: 'gazelle',
        component: Gazelle,
      }

];
