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
  selector: 'query-list',
  templateUrl: './query-list.html',
  styleUrls: ['./query-list.scss']
})
export class QueryListPage implements OnInit {
  source: ServerDataSource;
  settings: any = ServerDataSource.getDefaultSetting();

  constructor(
    private service: SmartTableService,
    private toPostService: ToPostService,
    private commonService: CommonService,
    http: Http,
  ) {
    this.source = new ServerDataSource(this.toPostService, this.commonService, { endPoint: 'query/list' });

    this.settings.columns = {
      ID: {
        title: '查询ID',
        type: 'number',
        editable: false,
      },
      NAME: {
        title: '查询名',
        type: 'string',
      },
      CODE: {
        title: '代码',
        type: 'string',
      },
      AUTO_LOAD: {
        title: '自动加载',
        defaultValue:1,
        type: 'number',
      },
      PAGE_SIZE: {
        title: '页面大小',
        type: 'number',
        defaultValue:10
      },
      SHOW_CHECKBOX: {
        title: '允许多选',
        type: 'number',
        defaultValue:1,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: '1', title: '是' }, 
              { value: '0', title: '否' }, 
            ],
          },
        },
      },
      IS_DEBUG: {
        title: '是否隐藏',
        type: 'number',
        defaultValue:1,
        editor: {
          type: 'list',
          config: {
            list: [
              { value: '1', title: '是' }, 
              { value: '0', title: '否' }, 
            ],
          },
        },
      },
      FILTR_LEVEL: {
        title: '过滤层级',
        type: 'number',
        defaultValue:1,       
        
      },
      QUERY_CONF: {
        title: '查询脚本',
        type: 'string',
        inputWidth: 12,
        editor: {
          type: 'textarea'
        }
      },
      QUERY_CFG_JSON: {
        title: '列配置信息',
        type: 'string',
        inputWidth: 12,
        editor: {
          type: 'textarea'
        }
      },
      DESKTOP_ROLE: {
        title: '是否首页显示',
        type: 'string',
      },
      IN_PARA_JSON: {
        title: '传入的参数',
        type: 'string',
        inputWidth: 12,
        editor: {
          type: 'textarea'
        }
      },
      JS_STR: {
        title: 'JS脚本',
        type: 'string',
        inputWidth: 12,
        editor: {
          type: 'textarea'
        }
      },
      ROWS_BTN: {
        title: '行按钮',
        type: 'string',
      },
      HEARD_BTN: {
        title: '表头按钮',
        type: 'string',
      },
      REPORT_SCRIPT: {
        title: 'RPT报表脚本',
        type: 'string',
      },
      CHARTS_CFG: {
        title: 'CHARTS报表脚本',
        type: 'string',
      },
      CHARTS_TYPE: {
        title: 'CHARTS报表类型',
        type: 'string',
      },
      FILTR_STR: {
        title: '筛选脚本',
        type: 'string',
      },
      REMARK: {
        title: '备注',
        type: 'string',
        inputWidth: 12,
        editor: {
          type: 'textarea'
        }
      },
      NEW_DATA:{
        title: '输入的时间',
        type: 'string',
      }


    }
  }

  ngOnInit() {

  }

  /**
   * 
   * @param event 添加事件
   */
  onSave(event): void {
    console.log(event.data)
    let add = this.commonService.ShowModal({ class: 'modal-lg' })
    add.content.SetSettingsColumns(this.settings.columns)

    add.content.message = "修改查询"
    if (event.data != null) {
      add.content.bean = event.data
      add.content.message = "添加查询"
    }
    add.content.OkHandler = (bean,saveKeys) => {
      if (window.confirm('确定要保存吗？')) {
        let postClass: RequestSaveModel = new RequestSaveModel();
        postClass.Data = bean;
        postClass.SaveKeys = saveKeys;
        this.toPostService.Post("query/save", postClass).then((data: AppReturnDTO) => {
          console.log(data)
          if (data.IsSuccess) {
            this.source.refresh()
            add.hide()
          }
          else{
            this.commonService.hint(data.Msg)
          }
        });
      } else {
        add.hide()
      }
    }
    add.content.CancelHandler = (bean) => {
      add.hide()
    }
  }

  /**
   * 
   * @param event 添加事件
   */
  onDelete(event): void {
    console.log(event.data)
    if (window.confirm('确定要删除吗?')) {
      this.commonService.showLoading();
      let postClass: PostBaseModel = new PostBaseModel();
      postClass.Key = event.data.ID;
      this.toPostService.Post("query/delete", postClass).then((data: AppReturnDTO) => {
        this.commonService.hideLoading()
        if (data.IsSuccess) {
          this.source.refresh()
        }
      });
    }
  }

}
