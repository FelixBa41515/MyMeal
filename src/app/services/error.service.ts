import {inject, Injectable} from '@angular/core'
import {ToastController} from '@ionic/angular'

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    toastController = inject(ToastController)
    #errorMessages: string[] = []

    constructor() {
    }

    enqueueErrorMessage(message: string): void {
        this.#errorMessages.push(message)

        if (this.#errorMessages.length === 1) {
            this.#showErrorMessage().then()
        }
    }

    async #showErrorMessage(): Promise<void> {
        if (this.#errorMessages.length === 0) {
            return
        }

        const toast = await this.toastController.create({
            message: this.#errorMessages[0],
            duration: 1500,
            position: 'top',
        })

        toast.onDidDismiss().then(() => {
            this.#errorMessages = this.#errorMessages.slice(1)
            this.#showErrorMessage()
        })

        await toast.present()
    }
}
