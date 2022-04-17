import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Commune } from '../models/Communes';
import { MO } from '../models/MO';
import { Province } from '../models/Province';
import { Statut } from '../models/Statut';
import { PdiService } from '../services/pdi.service';

@Component({
  selector: 'app-new-projet',
  templateUrl: './new-projet.component.html',
  styleUrls: ['./new-projet.component.css']
})
export class NewProjetComponent implements OnInit {

  projetForm: FormGroup;
  communes: Commune[]
  statuts: Statut[]
  mos: MO[]
  selectedCommune: number
  selectedMaitreOuvrage: number
  selectedMO: number
  selectedStatut: number
    constructor(private pdiService: PdiService,private router: Router,private fb: FormBuilder) { }
  
    ngOnInit(): void {
      this.projetForm  = this.fb.group({
          projet: [''],
          projet_ar : [''],
          // partenaires : this.fb.group({
          //   partenaire : [''],
          //   contribution : ['']
          // }),
          partenaires: this.fb.array([this.addPartenaireGroup()]),
          commune: []
      })
      this.onGetCommunes()
      this.onGetStatuts()
      this.onGetMOS()
     
    }
    addPatenaires():void{
     console.log( console.log(this.projetForm));
      (<FormArray>(this.projetForm.get('partenaires'))).push(this.addPartenaireGroup())
    }
    removePatenaires():void{
      console.log( console.log(this.projetForm));
      if( (<FormArray>(this.projetForm.get('partenaires'))).length!=1)
       (<FormArray>(this.projetForm.get('partenaires'))).removeAt( (<FormArray>(this.projetForm.get('partenaires'))).length-1)
     }
    returnPart(){
      return (this.projetForm.get('partenaires') as FormArray).controls
    }
    addPartenaireGroup(): FormGroup{
     return  this.fb.group({
            partenaire : [''],
            contribution : ['']
          }) as FormGroup
    }
    onRowClick(){
  
    }
    onSubmit(){
      console.log(this.projetForm.value)
     
    }
    onSaveProjet(f:NgForm){
    console.log(this.selectedMaitreOuvrage,"$$$$$$$$$$$$$$$$")
    if(f.value.commune){
      f.value.commune = `${this.pdiService.host}/communes/${this.selectedCommune}`
    }
      if(f.value.statut){
        f.value.statut = `${this.pdiService.host}/statuts/${this.selectedStatut}`
      }
     if(f.value.maitreOuvrage){
      f.value.maitreOuvrage = `${this.pdiService.host}/maitreOuvrages/${this.selectedMaitreOuvrage}`
     }
     
      console.log(f.value.maitreOuvrage,"$$$$$$$$$$$$$$$$")
      this.pdiService.addResource("projets",f.value).subscribe(data=>{
       
        
        console.log(f.value)
        f.reset()
            },err=>{
              console.log(err)
            })
   
  }
  onGetCommunes(){
    this.pdiService.getResourceCommuneAll("communes").subscribe(data=>{
 
     this.communes = data;
     console.log(data)
    },err=>{
      console.log(err)
    })
  
  }
  onGetStatuts(){
    this.pdiService.getResourceStatutAll("statuts").subscribe(data=>{
      console.log(data,"*****************")
     this.statuts = data;
     console.log(data)
    },err=>{
      console.log(err)
    })
  
  }
  onGetMOS(){
    this.pdiService.getResourceMOAll("maitreOuvrages").subscribe(data=>{
    
     this.mos = data;
     console.log(data)
    },err=>{
      console.log(err)
    })
  
  }
  gotoList(){
    this.router.navigateByUrl('/projets');
  }
}
