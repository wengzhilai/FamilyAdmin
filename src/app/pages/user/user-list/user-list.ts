import { Component, OnInit } from '@angular/core';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ToPostService } from '../../../@core/Service/ToPost.Service';
import { CommonService } from '../../../@core/Service/Common.Service';
import { RequestPagesModel } from "../../../@core/Model/Transport/RequestPagesModel";
import { AppReturnDTO } from "../../../@core/Model/Transport/AppReturnDTO";
import { RequestSaveModel } from "../../../@core/Model/Transport/RequestSaveModel";
import { ServerDataSource } from "../../../@core/Classes/SmartTable/ServerDataSource";
import { Http } from '@angular/http';


@Component({
  selector: 'user-list',
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListPage implements OnInit {
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
        title: '用户ID',
        type: 'number',
        editable: false
      },
      NAME: {
        title: '姓名',
        type: 'string',
      },
      LOGIN_NAME: {
        title: '登录名',
        type: 'string',
        editable: false
      },
      LOGIN_COUNT: {
        title: '登录次数',
        type: 'string',
        editable: false
      },
      LAST_ACTIVE_TIME: {
        title: '最后活动时间',
        type: 'string',
        editable: false
      },
      IS_LOCKED: {
        title: '状态',
        type: 'number',
      },
    },
  };

  constructor(
    private service: SmartTableService,
    private toPostService: ToPostService,
    private commonService: CommonService,
    http: Http,
  ) {
    this.source = new ServerDataSource(this.toPostService,this.commonService, { endPoint: 'User/List' });
  }

  ngOnInit() {

  }

  editConfirm(event): void {
    console.log(event)
    if (window.confirm('确定要修改吗?')) {
      let postClass: RequestSaveModel = new RequestSaveModel();
      postClass.Data = event.newData;
      postClass.SaveKeys = ["NAME", "IS_LOCKED"];
      this.toPostService.Post("user/save", postClass).then((data) => {
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
      this.toPostService.Post("user/save", postClass).then((data: AppReturnDTO) => {
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
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

}
