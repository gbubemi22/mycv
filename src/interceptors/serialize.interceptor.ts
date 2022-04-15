/* eslint-disable prettier/prettier */
import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
    // eslint-disable-next-line @typescript-eslint/ban-types
    new (...args: any[]): {}
}

export function serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
 constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled
    // by the request handler
    

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before response is sent out
       return plainToClass(this.dto, data,{
           excludeExtraneousValues: true,
       })
      }),
    )
  }
}
