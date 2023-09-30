import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenApiModel } from 'src/models/tokenApi.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            return this.handleUnAuthorizedError(request, next)
          }
        }
        return throwError(() => new Error("Some other error occured"))
      })
    );
  }
  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.auth.getToken()!;
    tokenApiModel.refreshToken = this.auth.getRefreshToken()!;
    return this.auth.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        this.auth.storeToken(data.accessToken);
        this.auth.storeRefreshToken(data.refreshToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }
        });
        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          })
          Toast.fire({
            icon: 'warning',
            title: 'Login First',
            text: 'Please login to Explore'
          }),
            this.router.navigate(['login']);
        })
      })
    );
  }
}
