import { Injectable } from '@angular/core'
import {
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular'
import { Clipboard } from '@capacitor/clipboard'
import * as fs from 'file-saver'
import { Share } from "@capacitor/share"
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
   
  constructor(
    private modalController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }


  setElementInLocalstorage(key:string, element: any){
    return localStorage.setItem(key, JSON.stringify(element));
  }

  getElementFromLocalstorage(Key: string){
    return JSON.parse(localStorage.getItem(Key) as string);
  }

  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.loadingController.create(opts);
    await loading.present()
  }

  async dismissLoading() {
    return await this.loadingController.dismiss();
  }

  async shareImageInMobile(url: string) {
    let base64: string
    let path = `${Date.now()}.jpg`

    this.presentLoading()

    if (url.includes('https')) {
      base64 = (await this.convertUrlToBase64(url)) as string
    } else {
      base64 = url
    }

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache,
    }).then(async (res) => {
      this.dismissModal()
      await Share.share({ url: res.uri }).then(() => {
        this.presentToast({
          message: 'Imagen compartida exitomamente',
          color: 'primary',
          icon: 'share-social-outline',
          duration: 1000,
        })
      })

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache,
      })
    })
  }

  async convertUrlToBase64(url: string) {
    let response = await fetch(url)
    let blob = await response.blob()

    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onerror = reject
      reader.onload = () => {
        resolve(reader.result)
      }

      reader.readAsDataURL(blob)
    })
  }
  async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts)
    await modal.present()
  }
  saveImageInWeb(url: string) {
    return fs.saveAs(`${Date.now()}.jpg`)
  }

  dismissModal() {
    return this.modalController.dismiss()
  }

  async copyToClipboard(string: string) {
    return await Clipboard.write({ string })
  }

  async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts)
    toast.present()
  }
}
