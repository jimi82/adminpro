import { Component, OnInit, Inject } from '@angular/core';

import { SettingService } from '../../services/service.index';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styles: []
})
export class AccountSettingComponent implements OnInit {

  constructor(public _settingsService: SettingService) { }

  ngOnInit() {
    this.setCheck();
  }

  changeColor(themeapp: string, link: any) {

    this.applyCheck(link);
    this._settingsService.applyTheme(themeapp);
  }

  applyCheck(link: any) {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  setCheck() {
    const selectors: any = document.getElementsByClassName('selector');
    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === this._settingsService.settings.theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
