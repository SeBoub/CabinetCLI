import {Component, Input, OnInit} from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CabinetMedicalService} from '../services/cabinet-medical.service';
import {PatientInterface} from '../dataInterfaces/patient';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit {
  @Input() infirmier: InfirmierInterface;
  addNewPatientForm: FormGroup;
  newPatient: PatientInterface;

  constructor(private formBuilder: FormBuilder, private cms: CabinetMedicalService) {
    this.addNewPatientForm = InfirmierComponent.createFormGroup(formBuilder);
  }

  public static createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: '',
      prenom: '',
      sexe: 'H',
      numSecu: '',
      adresse: formBuilder.group({
        ville: '',
        codePostal: '',
        rue: '',
        etage: '',
        numRue: ''
      })
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result = Object.assign({}, this.addNewPatientForm.value);
    result.adresse = Object.assign({}, result.adresse);

    this.newPatient.nom = this.addNewPatientForm.get('nom').value;
    this.newPatient.prenom = this.addNewPatientForm.get('prenom').value;
    this.newPatient.sexe = this.addNewPatientForm.get('sexe').value;
    this.newPatient.numeroSecuriteSociale = this.addNewPatientForm.get('numSecu').value;

    this.newPatient.adresse.numero = result.adresse.numRue;

    // Do useful stuff with the gathered data
    console.log(this.newPatient);
  }

  get picture() {
    return '/data/' + this.infirmier.photo;
  }

  get patients() {
    return this.infirmier.patients;
  }
}

