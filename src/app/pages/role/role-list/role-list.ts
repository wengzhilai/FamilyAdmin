import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ToPostService } from '../../../@core/Service/ToPost.Service';
import { CommonService } from '../../../@core/Service/Common.Service';
import { RequestPagesModel } from "../../../@core/Model/Transport/RequestPagesModel";
import { AppReturnDTO } from "../../../@core/Model/Transport/AppReturnDTO";
import { RequestSaveModel, PostBaseModel } from "../../../@core/Model/Transport";
import { ServerDataSource } from "../../../@core/Classes/SmartTable/ServerDataSource";
import { Http } from '@angular/http';


@Component({
  selector: 'role-list',
  templateUrl: './role-list.html',
  styleUrls: ['./role-list.scss']
})
export class RoleListPage implements OnInit {
  source: ServerDataSource;

  settings = {
    noDataMessage: "无数据",

    add: {
      confirmCreate: true,
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      columnTitle: "操作"
    },
    columns: {
      ID: {
        title: '角色ID',
        type: 'number',
        editable: false
      },
      NAME: {
        title: '角色名',
        type: 'string',
      }
    },
  };

  constructor(
    private service: SmartTableService,
    private toPostService: ToPostService,
    private commonService: CommonService,
    http: Http,
  ) {
    this.source = new ServerDataSource(this.toPostService, this.commonService, { endPoint: 'role/list' });
  }

  ngOnInit() {

  }

  editConfirm(event): void {
    console.log(event)
    if (window.confirm('确定要修改吗?')) {
      let postClass: RequestSaveModel = new RequestSaveModel();
      postClass.Data = event.newData;
      postClass.SaveKeys = ["NAME", "IS_LOCKED"];
      this.toPostService.Post("role/save", postClass).then((data) => {
        if (data.IsSuccess) {
          event.confirm.resolve();
        }
        else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

  createConfirm(event): void {
    console.log(event.newData)

    if (window.confirm('确定要添加吗？')) {
      let postClass: RequestSaveModel = new RequestSaveModel();
      postClass.Data = event.newData;
      this.toPostService.Post("role/save", postClass).then((data: AppReturnDTO) => {
        if (data.IsSuccess) {
          event.confirm.resolve();
        }
        else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }


  onDeleteConfirm(event): void {
    if (window.confirm('确定要删除吗?')) {
      let postClass: PostBaseModel = new PostBaseModel();
      postClass.Key = event.data.ID;
      this.toPostService.Post("role/delete", postClass).then((data: AppReturnDTO) => {
        if (data.IsSuccess) {
          event.confirm.resolve();
        }
        else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }

}
