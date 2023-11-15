import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';

const importModules = [
  MaterialModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule
];

const shareComponents = [
  LoaderComponent,
  AlertDialogComponent,
  PreLoaderComponent
]

@NgModule({
  declarations: [
    LoaderComponent,
    AlertDialogComponent,
    PreLoaderComponent,
  ],
  imports: [CommonModule, ...importModules],
  exports: [...importModules, ...shareComponents],
})
export class SharedModule {}
