import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {

  public appPages = [
    { title: 'Credito', url: 'credit', icon: 'mail' },
    { title: 'Km/moto', url: 'moto', icon: 'paper-plane' }
  ];

  constructor(
  //  private afAuth: AngularFireAuth,
  //  private router: Router,
    ) { }

  public  signOut(): void {

    console.log(getAuth().currentUser);

     // this.afAuth.signOut();
   // this.router.navigate(['/']);
  }
}
