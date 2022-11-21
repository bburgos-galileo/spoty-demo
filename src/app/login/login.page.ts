import { SpotifyService } from './../services/spoty.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;

  constructor(private fb: FormBuilder,
              private alertController: AlertController,
              private router: Router,
              private authService: AuthService,
              private spotifyService: SpotifyService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}
  async login() {
    const user = await this.authService.login(this.credentials.value);
    if (user) {
      this.spotifyService.getToken().subscribe();
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('El inicio de sesión falló', 'Intentalo nuevamente!');
		}
  }

  async createAccount() {
    const user = await this.authService.register(this.credentials.value);
    if (user) {
      this.spotifyService.getToken().subscribe();
			this.router.navigateByUrl('/home', { replaceUrl: true });
		} else {
			this.showAlert('Error al crear cuenta', 'Intentalo nuevamente!');
		}
  }

  async showAlert(header: any, message: any) {
		const alert = await this.alertController.create({
			header,
			message,
			buttons: ['OK']
		});
		await alert.present();
	}

}
