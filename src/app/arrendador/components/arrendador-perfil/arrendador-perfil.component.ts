import { Component } from '@angular/core';
import { ArrendadorDTO } from '../../../common/models/ArrendadorDTO';
import { ArrendadorService } from '../../../common/services/arrendador.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arrendador-perfil',
  standalone: true,
  imports: [],
  templateUrl: './arrendador-perfil.component.html',
  styleUrl: './arrendador-perfil.component.css'
})
export class ArrendadorPerfilComponent {

  arrendador: ArrendadorDTO;

  constructor(
    private arrendadorService: ArrendadorService,
    private route: ActivatedRoute
  ) {
    this.arrendador = new ArrendadorDTO();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.params.subscribe(params => {
      const idArrendador = params['idUsuario'];
      this.arrendadorService.getArrendador(idArrendador).then(arrendador => {
        this.arrendador = arrendador;
      }).catch((error) => {
        console.error(error);
      });
    });
  }

}
