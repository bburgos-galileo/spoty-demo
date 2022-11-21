import { SpotifyService } from './../services/spoty.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  featuredPlaylists;

  constructor(private spotifyService: SpotifyService, private router: Router, private authService: AuthService,) {
    this.getPlayList();
  }

  async getPlayList(){
		this.featuredPlaylists =  await this.spotifyService.getPlayList();
		console.log(this.featuredPlaylists);
	}

  viewDetail(playlist){
		console.log('image clicked');
		this.router.navigate(['/detail'], {queryParams: {data: JSON.stringify(playlist)}} );
	}

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

}
