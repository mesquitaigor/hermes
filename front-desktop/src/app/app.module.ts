import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { LoginPageModule } from './modules/login/login.page.module';
import { HttpClientModule } from '@angular/common/http';
import TopbarComponentModule from './shared/components/root/topbar/topbar.component.module';
import SidebarComponentModule from './shared/components/root/sidebar/sidebar.component.module';
import PopupComponentModule from './shared/components/root/popup/popup.component.module';
import ToastComponentModule from './shared/components/root/toast/toast.component.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    LoginPageModule,
    HttpClientModule,
    TopbarComponentModule,
    SidebarComponentModule,
    PopupComponentModule,
    ToastComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
