import {Component, OnInit} from '@angular/core';
import {CabinetMedicalService} from '../services/cabinet-medical.service';
import {CabinetInterface} from '../dataInterfaces/cabinet';

@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css']
})
export class SecretaryComponent implements OnInit {
  private data: CabinetInterface;

  constructor(cms: CabinetMedicalService) {
    this.initCabinet(cms);
  }

  async initCabinet(cms: CabinetMedicalService) {
    this.data = await cms.getData('/data/cabinetInfirmier.xml');
  }

  ngOnInit() {}

  get infirmiers() {
    console.log(this.data);

    return this.data.infirmiers;
  }
}
