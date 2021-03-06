import { Component } from '@angular/core';
import { ModalController, Modal } from "ionic-angular";

import { Quote } from "../../data/quote.interface";

import { QuotesService } from "../../services/quotes.service";
import { QuotePage } from "../quote/quote";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html'
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(private quotesService: QuotesService,
              private modalCtrl: ModalController,
              private settingsService: SettingsService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ionViewWillEnter() {
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote: Quote) {
    const modal: Modal = this.modalCtrl.create(QuotePage, quote);
    modal.onDidDismiss((remove: boolean) => {
      if (remove) {
        this.onRemoveFromFavorites(quote);
      }
    });

    modal.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorite(quote);
    this.quotes.splice(this.quotes.indexOf(quote), 1);
  }

  getQuoteBackground(): string {
    return this.settingsService.isAlternativeBackground() ? 'alternativeQuoteBackground' : 'quoteBackground';
  }
}
