import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {CabinetInterface} from '../dataInterfaces/cabinet';
import {Adresse} from '../dataInterfaces/adresse';
import {sexeEnum} from '../dataInterfaces/sexe';
import {PatientInterface} from '../dataInterfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class CabinetMedicalService {

  private cabinet: CabinetInterface;
  private _http: HttpClient;


  constructor(http: HttpClient) {
    this._http = http;
  }

  get http(): HttpClient {
    return this._http;
  }

  private static getAdressFrom(root: Element): Adresse {
    let node: Element;

    return {
      ville: (node = root.querySelector('adresse > ville')) ? node.textContent : '',
      codePostal: (node = root.querySelector('adresse > codePostal')) ? Number(node.textContent) : null,
      rue: (node = root.querySelector('adresse > rue')) ? node.textContent : '',
      numero: (node = root.querySelector('adresse > numéro')) ? node.textContent : '',
      etage: (node = root.querySelector('adresse > étage')) ? node.textContent : ''
    };
  }

  private static getPatientFrom(patients: Element): PatientInterface {
    return {
      prenom: patients.querySelector('prénom').textContent,
      nom: patients.querySelector('nom').textContent,
      sexe: patients.querySelector('sexe').textContent === 'M' ? sexeEnum.M : sexeEnum.F,
      numeroSecuriteSociale: patients.querySelector('numéro').textContent,
      adresse: CabinetMedicalService.getAdressFrom(patients)
    };
  }

  async getData( url: string ): Promise<CabinetInterface> {
    const data = await this.http.get(url, {responseType: 'text'}).toPromise();

    return new Promise<CabinetInterface>(((resolve, reject) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'application/xml');

      // Initialisation du cabinet (seulement les adresses, le reste est complété plus tard)
      this.cabinet = {
        infirmiers: [],
        patientsNonAffectes: [],
        adresse: CabinetMedicalService.getAdressFrom( doc.querySelector( 'cabinet' ) )
      };

      // Contient tous les infirmiers
      const infs = doc.querySelectorAll('infirmier');

      // Contient tous les patients
      const patients = doc.querySelectorAll('patients > patient');

      // Ajoute les infirmiers au cabinet
      infs.forEach((inf) => {
        this.cabinet.infirmiers.push({
          id: inf.id,
          prenom: inf.querySelector('prénom').textContent,
          nom: inf.querySelector('nom').textContent,
          photo: inf.querySelector('photo').textContent,
          patients: [],
          adresse: CabinetMedicalService.getAdressFrom(inf)
        });
      });

      // Ajoute les patients non affectés, au cabinet, et ceux qui sont affectés, aux infirmiers
      patients.forEach((pat) => {
        if (pat.querySelector('visite[intervenant]') === null) {
          this.cabinet.patientsNonAffectes.push(CabinetMedicalService.getPatientFrom(pat));
        } else {
          this.cabinet.infirmiers.forEach((inf) => {
            if (inf.id === pat.querySelector('visite').getAttribute('intervenant')) {

              inf.patients.push(CabinetMedicalService.getPatientFrom(pat));
            }
          });
        }
      });

      resolve(this.cabinet);

    }));
  }

  public async addPatient(patient: PatientInterface): Promise<PatientInterface> {
    const res = await this._http.post('/addPatient', {
      patientName: patient.nom,
      patientForname: patient.prenom,
      patientNumber: patient.numeroSecuriteSociale,
      patientSex: patient.sexe === sexeEnum.M ? 'M' : 'F',
      patientBirthday: 'AAAA-MM-JJ',
      patientFloor: patient.adresse.etage,
      patientStreetNumber: patient.adresse.numero,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    }, {observe: 'response'}).toPromise<HttpResponse<any>>();

    console.log('Add patient renvoie', res);
    if (res.status === 200) {
      // OK on peut ajouter en local
      this.cabinet.patientsNonAffectes.push( patient );
    }
    return null;
  }


}
