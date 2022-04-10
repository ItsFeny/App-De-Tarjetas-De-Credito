import { CardService } from './../../services/card.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  //arreglo para crear las listas de las tarjetas de credito eh interpolarlo en el tr
  listcard: any[] = [];
  CambioNombre = 'agregar';
  id: number | undefined;


  //agregar como un id a los campos mediante las variables con form group 
  //nota se importa un modulo llamado reactiveform para que funcione
  forms: FormGroup;
  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private _CardServices: CardService) 
  {
    this.forms = this.fb.group({
      name:['', Validators.required],
      cardNumber:['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fecha:['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv:['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  ngOnInit(): void 
  {
    this.ObtenerTarjeta();
    
  }

  //metodo para obtener los datos de la api y hacer que la variable lista de tarjeta ejecute esos datos
  ObtenerTarjeta()
{
    this._CardServices.GetListCard().subscribe(data =>{
      console.log(data);
      this.listcard = data;
    }, error =>{
      console.log(error);
    })
}

  
 

  //Metodo para que funciono el boton guardar del formulario
  AddCard()
  {
    
    const card: any = 
    {
      name: this.forms.get('name')?.value,
      cardNumber: this.forms.get('cardNumber')?.value,
      fecha: this.forms.get('fecha')?.value,
      cvv: this.forms.get('cvv')?.value
    }
    
    if(this.id == undefined)
    {
       //Agregamos la tarjeta

       //accede a la lista de tarjetas y le agrega los valores del input
       this._CardServices.SaveCard(card).subscribe(data => {
     
      //aqui se llama el Toastr que es para enviar una signal de algo 
      this.toastr.success('Guardado con exito!', 'Tarjeta registrada');
      
      //llamada al metodo obtener tarjeta
      this.ObtenerTarjeta(); 
  
      //resetea los campos 
      this.forms.reset(); 
  
      }, error => {
        this.toastr.error('Fallo al agregar la tarjeta', 'Error');
        console.log(error);
      });
   }

    else
    {
       card.id = this.id;
       
       //Editamos la tarjeta
       this._CardServices.UpdateCard(this.id, card).subscribe(data => {
         this.forms.reset();
         this.CambioNombre = "agregar";
         this.id = undefined;
         this.toastr.info('La informacion de la tarjeta fue actualizada con exito!', 'Tarjeta Actualizada');
         this.ObtenerTarjeta();
       }, error =>
       {
         console.log(error);
       })
    }
    
}



  DeleteCard(id: number)
  {
    this._CardServices.DeleteCard(id).subscribe(data => {
    this.toastr.error('La tarjeta de credito fue eliminidad','Tarjeta de credito elimindada');
    this.ObtenerTarjeta();
    }, error => {
      console.log(error);
    })
}

 EditCard(tarjeta: any)
 {
   this.CambioNombre = "editar";
   this.id = tarjeta.id;

   this.forms.patchValue({
     name: tarjeta.name,
     cardNumber: tarjeta.cardNumber,
     fecha: tarjeta.fecha,
     cvv: tarjeta.cvv
   })
 }

}


