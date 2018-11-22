import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  settings: Settings = {
    urlTheme: 'assets/css/colors/default.css',
    theme: 'default'
  };

  constructor(@Inject(DOCUMENT) private _document) { this.loadSettings(); }

  storeSettings() {
    // console.log('Guardando ajustes en el localStorage');
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse( localStorage.getItem('settings') );
      // console.log('Cargando ajustes del LocalStorage');
      // apply settings
      this.applyTheme(this.settings.theme);
    } else {
      console.log('Using defaut settings');
      this.applyTheme(this.settings.theme);
    }
  }

  applyTheme(themeapp: string) {
    const url = `assets/css/colors/${ themeapp }.css`;
    this._document.getElementById('themeapp').setAttribute('href', url);

    this.settings.theme = themeapp;
    this.settings.urlTheme = url;
    this.storeSettings();
  }
}

interface Settings {
  urlTheme: string;
  theme: string;
}
