import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Commune } from '../models/Communes';
import { Province } from '../models/Province';
import { PdiService } from '../services/pdi.service';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  currentCommune: Commune
  provinces: Province[]
  selectedProvince: number
  currentProvince:Province;
  url: string
    constructor(private router:Router,private activatedRoute: ActivatedRoute,private pdiService:PdiService) { }
    onRowClick(){

    }
    ngOnInit(): void {
      this.onGetProvinces()
       this.url = atob(this.activatedRoute.snapshot.params['id'])
      this.pdiService.getOneResourceCommune(this.url).subscribe(data=>{
        console.log(data,"qqqqqqqqqqqqqqqq")
       
     this.selectedProvince = data['province'].id

        this.currentCommune = data;

      },err=>{
        console.log(err)
      })
      console.log(this.url);
    }
    onGetProvinces(){
      this.pdiService.getResourceAll("provinces").subscribe(data=>{
       this.provinces = data;
       console.log(data)
      },err=>{
        console.log(err)
      })
    
    }
    onUpdateCommune(f: NgForm){
      console.log(f.value)
      f.value.province = `${this.pdiService.host}/provinces/${this.selectedProvince}`
      console.log(f.value)
      this.pdiService.updateResource(this.url,f.value).subscribe(data=>{
        console.log(data,"**********************")
  
        alert("mise a jour effectué avec succés")
      },err=>{
        
      })
    }
    gotoList(){
      this.router.navigateByUrl('/communes');
    }
}
