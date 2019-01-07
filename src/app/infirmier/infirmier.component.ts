import {Component, Input, OnInit} from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {CabinetMedicalService} from '../services/cabinet-medical.service';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit {
  @Input() infirmier: InfirmierInterface;

  constructor(private cms: CabinetMedicalService) {}

  ngOnInit() {

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    // @ts-ignore
    this.cms.affectation(event.container.id, event.container.data[event.currentIndex].numeroSecuriteSociale);
  }

  get picture() {
    return '/data/' + this.infirmier.photo;
  }

  get patients() {
    return this.infirmier.patients;
  }
}

