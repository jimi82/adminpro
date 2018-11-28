import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingService, SidebarService, SharedService, UserService, LoginGuardGuard } from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { UploadFileService } from './upload-file/upload-file.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [SettingService, SharedService, SidebarService, UserService, LoginGuardGuard, UploadFileService]
})
export class ServiceModule { }
