import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import TopbarComponentModule from './shared/components/root/topbar/topbar.component.module';
import SidebarComponentModule from './shared/components/root/sidebar/sidebar.component.module';
import PopupComponentModule from '@components/root/popup/popup.component.module';
import ToastComponentModule from './shared/components/root/toast/toast.component.module';
import JwtHttpInterceptor from './shared/auth/jwt-http-interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TopbarComponentModule,
    SidebarComponentModule,
    PopupComponentModule,
    ToastComponentModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
