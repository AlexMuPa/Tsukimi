import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Loged {
  isLoged: boolean
}
export interface Modal {
  isActive: boolean
}
@Injectable()
export class SharingService {
  private Loged: BehaviorSubject<Loged> = new BehaviorSubject<Loged>({isLoged: false});
  private modal: BehaviorSubject<Modal> = new BehaviorSubject<Modal>({isActive: false});

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
    console.log(modal);
    this.modal.next(modal);
  }

}
