import {Component, Input, OnInit} from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/infirmier';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CabinetMedicalService} from '../services/cabinet-medical.service';
import {PatientInterface} from '../dataInterfaces/patient';
import {sexeEnum} from '../dataInterfaces/sexe';

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css']
})
export class InfirmierComponent implements OnInit {
  @Input() infirmier: InfirmierInterface;
  addNewPatientForm: FormGroup;
  newPatient: PatientInterface;
  private submitted = false;

  constructor(private formBuilder: FormBuilder, private cms: CabinetMedicalService) {
    this.addNewPatientForm = InfirmierComponent.createFormGroup(formBuilder);
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

  get f() { return this.addNewPatientForm.controls; }

  async onSubmit() {
    this.submitted = true;

    if (this.addNewPatientForm.invalid) {
      return;
    }

    this.newPatient = this.createPatient();
    await this.cms.addPatient(this.newPatient);
  }

  createPatient(): PatientInterface {
    return {
      prenom: this.addNewPatientForm.value.prenom,
      nom: this.addNewPatientForm.value.nom,
      sexe: this.addNewPatientForm.value.sexe === 'M' ? sexeEnum.M : sexeEnum.F,
      numeroSecuriteSociale: this.addNewPatientForm.value.numSecu,
      adresse: CabinetMedicalService.getAdresseFromFormGroup(this.addNewPatientForm.value.adresse)
    };
  }

  get picture() {
    return '/data/' + this.infirmier.photo;
  }

  get patients() {
    return this.infirmier.patients;
  }
}

