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
  selector: 'module-list',
  templateUrl: './module-list.html',
  styleUrls: ['./module-list.scss']
})
export class ModuleListPage implements OnInit {
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
      columnTitle: "操作",
    },
    columns: {
      ID: {
        title: '模块ID',
        type: 'number',
        editable: false
      },
      NAME: {
        title: '模块名',
        type: 'string',
      },
      PARENT_ID: {
        title: '上级ID',
        type: 'number',
      },
      LOCATION : {
        title: '地址',
        type: 'string',
      },
      CODE: {
        title: '代码',
        type: 'string',
      },
      IS_DEBUG: {
        title: '是否调试',
        type: 'number',
      },
      IS_HIDE: {
        title: '是否隐藏',
        type: 'number',
      },
      SHOW_ORDER: {
        title: '排序号',
        type: 'number',
      } ,
      DESCRIPTION: {
        title: '描述',
        type: 'string',
      },
      IMAGE_URL: {
        title: '图片地址',
        type: 'string',
      },
      DESKTOP_ROLE: {
        title: '是否首页显示',
        type: 'string',
      } ,
      W: {
        title: '宽',
        type: 'number',
      },
      H: {
        title: '高',
        type: 'number',
      }
    },
  };

  constructor(
    private service: SmartTableService,
    private toPostService: ToPostService,
    private commonService: CommonService,
    http: Http,
  ) {
    this.source = new ServerDataSource(this.toPostService, this.commonService, { endPoint: 'module/list' });
  }

  ngOnInit() {

  }

  editConfirm(event): void {
    console.log(event)
    if (window.confirm('确定要修改吗?')) {
      let postClass: RequestSaveModel = new RequestSaveModel();
      postClass.Data = event.newData;
      postClass.SaveKeys = [
        "NAME", 
        "PARENT_ID",
        "LOCATION" ,
        "CODE",
        "IS_DEBUG",
        "IS_HIDE",
        "SHOW_ORDER" ,
        "DESCRIPTION",
        "IMAGE_URL",
        "DESKTOP_ROLE" ,
        "W",
        "H"
      ];

      this.toPostService.Post("module/save", postClass).then((data) => {
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
      this.toPostService.Post("module/save", postClass).then((data: AppReturnDTO) => {
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
      this.toPostService.Post("module/delete", postClass).then((data: AppReturnDTO) => {
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

  onCreate(event): void{
    console.log(event)
    alert(1)
  }
}
