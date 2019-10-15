import { NgModule, Directive,OnInit, EventEmitter, Output, OnDestroy, Input,ElementRef,Renderer } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FilterNewPipe} from '../app/service/filter.pipe'
@NgModule({
  imports: [
  ],
  declarations: [
    FilterNewPipe
  ],
  exports: [
    FilterNewPipe
  ]
})

export class SharedModule { }
