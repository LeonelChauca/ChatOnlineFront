import {
  HttpErrorResponse,
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';
import { ResponseInterface } from '../models/response.interface';
import { toast } from 'ngx-sonner';

export const toastInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const res = event.body as ResponseInterface;
        if (res.message) {
          toast.success(res.message);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.error && error.error.message) {
        toast.error(error.error.message);
      }
      throw error;
    }),
  );
};
