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

  constructor(private formBuilder: FormBuilder, http: HttpClient, cms: CabinetMedicalService) {
    this.addNewPatientForm = AddPatientComponent.createFormGroup(formBuilder);
    this._http = http;
    this._cms = cms;
  }

  public static createFormGroup(formBuilder: FormBuilder) {
    return formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required]],
      sexe: ['M', [Validators.required]],
      numSecu: ['', [Validators.required, Validators.pattern('[1-4]\\d\\d((0[1-9])|(1[0-2]))\\d[0-9AB]\\d{8}')]],
      adresse: formBuilder.group({
        ville: ['', [Validators.required]],
        codePostal: ['', [Validators.required, Validators.pattern('\\d{5}')]],
        rue: ['', [Validators.required]],
        etage: [''],
        numRue: ['']
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


    this.submitted = false;
    this.addNewPatientForm.reset();

  }

  createPatient(): PatientInterface {

    return {
      prenom: this.addNewPatientForm.value.prenom,
      nom: this.addNewPatientForm.value.nom,
      sexe: this.addNewPatientForm.value.sexe,
      numeroSecuriteSociale: this.addNewPatientForm.value.numSecu,
      adresse: CabinetMedicalService.getAdresseFromFormGroup(this.addNewPatientForm.value.adresse)
    };
  }

  get f() { return this.addNewPatientForm.controls; }

  get a() {
    // @ts-ignore
    return this.addNewPatientForm.controls.adresse.controls;
  }
}

