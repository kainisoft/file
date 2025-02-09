import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class FileManagerService {
    constructor(private http: HttpClient) {}

    upload(file: File) {
        const formData = new FormData();
        formData.append('file', file);

        return this.http
            .post(`${environment.api}/file`, formData, { responseType: 'blob' })
            .pipe(
                map((response) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(response);

                    return new Promise<string>((resolve, reject) => {
                        reader.onload = () => {
                            resolve(reader.result as string);
                        };
                        reader.onerror = (error) => {
                            reject(error);
                        };
                    });
                })
            );
    }
}
