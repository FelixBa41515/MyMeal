import {inject, Injectable} from '@angular/core'
import {Camera, CameraResultType, CameraSource, PermissionStatus, Photo} from '@capacitor/camera'
import {Preferences} from '@capacitor/preferences'
import {Capacitor} from '@capacitor/core'
import {Directory, Filesystem, ReadFileResult} from '@capacitor/filesystem'
import {ErrorService} from './error.service'
import { getStorage, ref } from "firebase/storage";
import {deleteObject, getDownloadURL, uploadString} from '@angular/fire/storage'
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  #permissionGranted: PermissionStatus = {camera: 'granted', photos: 'granted'}
  #errorService = inject(ErrorService)

  constructor() {
    this.#loadData().then();
  }

  async #loadData() {
    await this.#retrievePermissions()
  }

  async takePhoto(): Promise<Photo | undefined> {

    if (!this.#haveCameraPermission() || !this.#havePhotosPermission()) {
      await this.#requestPermissions()
    }

    if (!this.#haveCameraPermission() || !this.#havePhotosPermission()) {
      this.#errorService.enqueueErrorMessage(`Can't take a photo because the right to do so has not been granted.`)
      return undefined
    }

    const image = await Camera.getPhoto({
      quality: 80,
      resultType: CameraResultType.Base64,
      source: this.#determinePhotoSource(),
    })

  image.dataUrl = `data:image/${image.format};base64,${image.base64String}`


    return image
  }


  async #requestPermissions(): Promise<void> {
    try {
      if (Capacitor.isNative) {
        this.#permissionGranted = await Camera.requestPermissions({permissions: ['photos', 'camera']});
      } else {
        // Handle web platform or other non-native platforms
        console.warn(`Camera permissions are not applicable on the ${Capacitor.getPlatform()} platform.`);
      }
    } catch (error) {
      console.error(`Error requesting permissions: ${error}`);
    }
  }

  async #retrievePermissions(): Promise<void> {
    try {
      if (Capacitor.isNative) {
        this.#permissionGranted = await Camera.checkPermissions();
      } else {
        console.warn(`Camera permissions are not applicable on the ${Capacitor.getPlatform()} platform.`);
      }
    } catch (error) {
      console.error(`Error retrieving permissions: ${error}`);
    }
  }


  #determinePhotoSource(): CameraSource {
    if (!Capacitor.isNativePlatform()) {
      return CameraSource.Camera
    }

    if (this.#havePhotosPermission() && this.#haveCameraPermission()) {
      return CameraSource.Prompt
    } else {
      return this.#havePhotosPermission() ?
        CameraSource.Photos : CameraSource.Camera
    }
  }


  #haveCameraPermission(): boolean {
    return this.#permissionGranted.camera === 'granted'
  }


  #havePhotosPermission(): boolean {
    return this.#permissionGranted.photos === 'granted'
  }


  async uploadImage(base64String: string, extension: string): Promise<string> {

    const date = Date.now().toString()
    const storage = getStorage();
    const storageRef = ref(storage, date);

    const metadata = {
      name: date,
      contentType: 'image/jpeg',
    };
    await uploadString(storageRef, base64String, 'base64', metadata).then((snapshot) => {
      console.log('Uploaded a base64 string!');
    });
  return date;
  }

  async getImage(name: string):Promise<string>{
    const storage = getStorage();
    let imageUrl = ''
    await getDownloadURL(ref(storage, name))
      .then((url) => {

        imageUrl = url
      })
      .catch((error) => {
        return ''
      });
    return imageUrl
  }

  deleteImage(name:string){
    const storage = getStorage();

    const desertRef = ref(storage, name);

    deleteObject(desertRef).then(() => {
    }).catch((error) => {
      console.log('file could not be deleted')
    });
  }
}
