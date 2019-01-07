# L3MProjetCLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Launch
Pour lancer l'application, il est nécessaire de lancer le serveur en premier lieu afin que les interactions
puissent se faire correctement, dans le cas contraire l'application sera dénuée de toutes données.

## Used technologies
Les technologies utilisées pour cette applications sont `Bootstrap` et `cdkDragDrop` de Angular Material.

## Features

Toutes les fonctionnalités demandées ont été implémentées, il est donc possible d'ajouter de nouveaux 
patients à l'aide du bouton se trouvant dans la section "Patients non affectés", le formulaire créé à
l'aide d'un FormBuilder vérifie la validité des informations (Pattern et présence d'informations dans les champs requis).
Les affectations, désaffectations et réaffectations se font simplement à l'aide du Drang and Drop en déplaçant les 
patients dans les zones voulues.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
