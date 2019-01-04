import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientInterface} from '../dataInterfaces/patient';
import {HttpClient} from '@angular/common/http';
import {CabinetMedicalService} from '../services/cabinet-medical.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  addNewPatientForm: FormGroup;
  newPatient: PatientInterface;
  _http: HttpClient;
  _cms: CabinetMedicalService;

  private submitted = false;

  constructor(private formBuilder: FormBuilder, http: HttpClient, cms: CabinetMedicalService){
    this.addNewPatientForm = AddPatientComponent.createFormGroup(formBuilder);
    this._http = http;
    this._cms = cms;
  }

  public static createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required]],
      sexe: ['H', [Validators.required]],
      numSecu: ['', [Validators.required]],
      adresse: formBuilder.group({
        ville: ['', [Validators.required]],
        codePostal: ['', [Validators.required]],
        rue: ['', [Validators.required]],
        etage: ['', [Validators.required]],
        numRue: ['', [Validators.required]]
      })
    });
  }

  ngOnInit() {
  }

  async onSubmit() {
    this.submitted = true;

    if (this.addNewPatientForm.invalid) {
      return;
    }

    this.newPatient = this.createPatient();
    await this._cms.addPatient(this.newPatient);
  }
}
