import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormAddOkrComponent } from 'src/app/shared/form-add-okr/form-add-okr.component';

interface OKR {
  id: number;
  title: string;
  owner: string;
  status: string;
  year: number;
  progress: number;
  children: number[];
}

@Component({
  selector: 'app-strategic-map',
  templateUrl: './strategic-map.component.html',
  styleUrls: ['./strategic-map.component.scss'],
})
export class StrategicMapComponent  implements OnInit {
dismiss() {
throw new Error('Method not implemented.');
}

  okr1 = {
    initials: 'L',
    title: 'Vender 1 milhão de hot dog',
    progress: 50,
    owner: 'Flavio An...',
    ownerImage: 'path/to/image1.png',
    status: '2024',
    year: '2024'
  };

  okr2 = {
    initials: 'F',
    title: 'We\'re thought leaders in eco-friendly home cleaning',
    progress: 0,
    owner: 'Flavio An...',
    ownerImage: 'path/to/image2.png',
    status: 'Q4',
    year: '2024'
  };

  okr3 = {
    initials: 'L',
    title: 'OKR tri',
    progress: 0,
    owner: 'Flavio An...',
    ownerImage: 'path/to/image3.png',
    status: 'Sub',
    year: 'Q3 2024'
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  // getOkrById(id: number): OKR | undefined {
  //   return this.okrs.find(okr => okr.id === id);
  // }
  
  zoomLevel: number = 1;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;
  translateX: number = 0;
  translateY: number = 0;
  lastTranslateX: number = 0;
  lastTranslateY: number = 0;

  zoomIn() {
    this.zoomLevel += 0.1;
  }

  async openAddOKR() {
    console.log("open modal ")
    const modal = await this.modalCtrl.create({
      component: FormAddOkrComponent,
      cssClass: 'modal-strategic',
      componentProps: {
        hashOkrUp: 'teste'
      }
    });
    modal.present();
  }

  zoomOut() {
    if (this.zoomLevel > 0.1) {
      this.zoomLevel -= 0.1;
    }
  }

  @HostListener('wheel', ['$event'])
  onWheelScroll(event: WheelEvent) {
    if (event.deltaY < 0) {
      this.zoomIn();
    } else {
      this.zoomOut();
    }
    event.preventDefault();
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      this.translateX = this.lastTranslateX + (event.clientX - this.startX);
      this.translateY = this.lastTranslateY + (event.clientY - this.startY);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
    this.lastTranslateX = this.translateX;
    this.lastTranslateY = this.translateY;
  }

}
