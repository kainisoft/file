import {
    animate,
    AnimationBuilder,
    AnimationPlayer,
    style,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { first } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SplashScreenService {
    private element!: HTMLElement | null;
    private player!: AnimationPlayer;

    constructor(
        @Inject(DOCUMENT)
        private document: Document,
        private animationBuilder: AnimationBuilder,
        private router: Router
    ) {
        this.init();
    }

    protected init() {
        this.element = this.document.getElementById('root-loading');

        if (this.element) {
            this.router.events
                .pipe(first((event) => event instanceof NavigationEnd))
                .subscribe(() => {
                    setTimeout(() => this.hide());
                });
        }
    }

    protected hide() {
        this.player = this.animationBuilder
            .build([
                style({ opacity: 1 }),
                animate(
                    '400ms ease',
                    style({
                        opacity: 0,
                        zIndex: -10,
                    })
                ),
            ])
            .create(this.element);

        this.player.onDone(() => this.element?.remove());

        setTimeout(() => this.player.play());
    }
}
