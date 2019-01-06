import {Component, Input, OnInit} from '@angular/core';
import {PatientInterface} from '../dataInterfaces/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @Input() patient: PatientInterface;
  @Input() infirmierID: number;

  constructor() { }

  ngOnInit() {
  }

}
