import { Component, AfterViewInit, ElementRef } from '@angular/core';
declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  private clientId:string = '176107306813-li8ir255ojrmdmijv4qk79c2q8manpuc.apps.googleusercontent.com';

  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;

  public googleInit() {    
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: 'single_host_origin',
        scope: this.scope
      });
      this.attachSignin(document.getElementById('g-signin2'));
    });
  }

  public attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Email: ' + profile.getEmail());
        document.getElementById('display-email').textContent = profile.getEmail();
        this.auth2.signOut().then(function () {
          console.log('User signed out.');
          
        });
        this.auth2.disconnect();
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }

  public onSignout(){
    console.log("Signout");
    this.auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  constructor(private element: ElementRef) {
    console.log('ElementRef: ', this.element);
  }

  ngAfterViewInit() {
    this.googleInit();
  }
}
