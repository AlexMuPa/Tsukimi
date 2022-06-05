import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Loged {
  isLoged: boolean
}
export interface Modal {
  isActive: boolean
}

export interface Menu {
  bars: boolean;
  user: boolean;
}
@Injectable()
export class SharingService {
  private Loged: BehaviorSubject<Loged> = new BehaviorSubject<Loged>({isLoged: false});
  private modal: BehaviorSubject<Modal> = new BehaviorSubject<Modal>({isActive: false});
  private menu: BehaviorSubject<Menu> = new BehaviorSubject<Menu>({bars: false, user: false});

  getLoged(){
    return this.Loged.asObservable();
  }

  setLoged(login: Loged){
    this.Loged.next(login);
  }

  getModal(){
    return this.modal.asObservable();
  }

  setModal(modal: Modal){
    this.modal.next(modal);
  }

  getMenu(){
    return this.menu.asObservable();
  }

  setMenu(menu: Menu){
    this.menu.next(menu);
  }

}
