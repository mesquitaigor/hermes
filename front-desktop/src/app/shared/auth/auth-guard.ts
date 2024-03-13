import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import AuthService from './auth.service';

export function authGuard(params?: {reverse: boolean}): CanActivateFn {
  return () => {
    const router = inject(Router)
    const oauthService: AuthService = inject(AuthService);
    
    if (oauthService.isAuthenticated() ) {
      if(!params?.reverse){
        return true
      }else{
        router.navigate(['/home']);
        return false
      }
    }else{
      if(!params?.reverse){
        router.navigate(['/login']);
        return false
      }
      return true
    }
  };
}