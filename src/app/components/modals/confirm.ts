import { Component } from '@angular/core';

@Component({
    selector: 'ngx-confirmModal',
    template: `
  <div class="modal-body text-center">
    <p>{{ message }}</p>
    <ng-container *ngFor="let item of inputs">
        <div class="input-group" >
            <input [(ngModel)]="bean[item.name]" type="text" placeholder="{{item.placeholder}}" class="form-control"/>
        </div>
    </ng-container>
  </div>
  <div class="modal-footer">
   <button type="button" class="btn btn-default" (click)="confirm()" >{{OkText}}</button>
   <button type="button" class="btn btn-primary" (click)="decline()" >{{ChancelText}}</button>
  </div>
  `,
})
export class ModalConfirmPage {

    OkText = "确定"
    ChancelText = "取消"
    message: string;
    OkHandler: any;
    CancelHandler: any
    inputs= [
        {
          name: 'apiUrl',
          value: "",
          placeholder: 'API连接地址'
        }
      ]
    bean:any={}
    constructor() { }
    confirm(): void {
        this.OkHandler(this.bean);
    }

    decline(): void {
        this.CancelHandler(null);
    }
}
