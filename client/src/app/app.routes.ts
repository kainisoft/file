import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'file-manager' },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'file-manager',
                loadChildren: () =>
                    import('./modules/file-manager/file-manager.routes'),
            },
        ],
    },
    {
        path: '404',
        pathMatch: 'full',
        loadChildren: () =>
            import('./modules/error/error-404/error-404.routes'),
    },
    { path: '**', redirectTo: '404' },
];
