import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from 'src/app/models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild( 'test', true ) lista:IonList;
  @Input() terminada = true;
  constructor(
    public deseosService: DeseosService,
    private router:Router,
    public alertController:AlertController
  ) { 

  }

  ngOnInit() {}

  irLista(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`)
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`)
    }
  }

  borrarLista(lista:Lista){
    console.log('borrado')
    this.deseosService.borrarLista(lista); 
  }
  async editarNombre(lista:Lista){
    const alert = await this.alertController.create({
      header: 'Editar Nombre',
      inputs: [{
          name: 'titulo',
          type: 'text',
          // value: lista.title,
          placeholder: lista.title
        }],
        buttons:[
          {
            text:'Cancelar',
            role:'cancel',
            handler: () => {}
          },
          {
            text:'Editar',
            handler: (data) => {
              if(data.titulo.length === 0){
                return;
              }
              lista.title = data.titulo;
              this.deseosService.guardarStorage();
              this.lista.closeSlidingItems()
              // this.deseosService.editarLista(data.titulo,lista.title)
            }
          }
        ]
      });
      
      alert.present()
  }
}
