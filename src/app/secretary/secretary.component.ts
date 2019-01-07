import {Component, OnInit} from '@angular/core';
import {CabinetMedicalService} from '../services/cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {
  private data: CabinetInterface;

  constructor(private cms: CabinetMedicalService) {
    this.initCabinet(cms);
  }

  async initCabinet(cms: CabinetMedicalService) {
    this.data = await cms.getData('/data/cabinetInfirmier.xml');
  }

  ngOnInit() {}

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
    this.cms.affectation('none', event.container.data[event.currentIndex].numeroSecuriteSociale);
  }

  get infirmiers() {
    return this.data.infirmiers;
  }

  get nonAffect() {
    return this.data.patientsNonAffectes;
  }
}
