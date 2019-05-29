import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'main',
  loadChildren: './pages/tabs/tabs.module#TabsPageModule',
  // canActivate: [UsuarioGuard]
  canLoad: [UsuarioGuard] // se usa el CanLoad para los modulos qe son cargados mediante LazyLoad

   },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: '',
    pathMatch: 'full', // el pathmatch es para asegurar que si esta en la ruta '', haga la redireccion de abajo
    redirectTo: 'main/tabs/tab1'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
