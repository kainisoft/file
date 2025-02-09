import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FileManagerService } from './file-manager.service';

@Component({
    selector: 'file-manager',
    templateUrl: 'file-manager.component.html',
    styleUrls: ['file-manager.component.scss'],
    providers: [FileManagerService],
    imports: [MatButton, MatIcon, ReactiveFormsModule],
})
export class FileManagerComponent {
    src: string = '';
    form = new FormGroup({
        file: new FormControl(null, { nonNullable: true }),
    });

    constructor(private fileManagerService: FileManagerService) {}

    @ViewChild('file', { static: true })
    set file(fileInput: ElementRef<HTMLInputElement>) {
        fileInput.nativeElement.onchange = (event: Event) => {
            const target = event.target as HTMLInputElement;
            const file = target.files?.item(0);

            this.fileManagerService.upload(file!).subscribe(async (res) => {
                this.src = await res;
            });
            this.form.controls.file.reset();
        };
    }
}
