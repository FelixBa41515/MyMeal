import {inject, Injectable} from '@angular/core'
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject'
import {
  Auth,
  GoogleAuthProvider,
  PhoneAuthProvider,
  GithubAuthProvider,
  signInWithCredential,
  signOut,
  updateProfile,
  User,
} from '@angular/fire/auth'
import {Router} from '@angular/router'
import {FirebaseAuthentication} from '@capacitor-firebase/authentication'
import {Capacitor} from '@capacitor/core'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #currentUser: BehaviorSubject<null | User> = new BehaviorSubject<null | User>(null)
  currentUser = this.#currentUser.asObservable()

  #verificationId?: string

  #auth = inject(Auth)
  #router = inject(Router)

  constructor() {
    this.#auth.onAuthStateChanged(user => this.#setCurrentUser(user))
  }

  isLoggedIn(): boolean {
    return !!this.#currentUser.value
  }


  getDisplayName(): string | undefined {
    return this.#currentUser.value?.displayName ?? undefined
  }

  getEmail(): string | undefined {
    return this.#currentUser.value?.email ?? undefined
  }

  getUserUID(): string | undefined {
    return this.#currentUser.value?.uid
  }

  async signOut(): Promise<void> {
    await FirebaseAuthentication.signOut()

    if (Capacitor.isNativePlatform()) {
      await signOut(this.#auth)
    }
  }

  async signInWithGitHub(): Promise<void> {
    // Sign in on the native layer.

    const authResult = await FirebaseAuthentication.signInWithGithub()

    const accessToken = authResult?.credential?.accessToken

    if (!accessToken) {
      throw new Error('Authentication did not succeed, please try again.')
    }

    if (Capacitor.isNativePlatform()) {
      const credential = GithubAuthProvider.credential(accessToken)
      await signInWithCredential(this.#auth, credential)
    }

  }

  async signInWithGoogle(): Promise<void> {
    const authResult = await FirebaseAuthentication.signInWithGoogle()
    const idToken = authResult?.credential?.idToken

    if (!idToken) {
      throw new Error('Authentication did not succeed, please try again.')
    }

    // Sign in on the web layer.
    if (Capacitor.isNativePlatform()) {
      const credential = GoogleAuthProvider.credential(idToken)
      await signInWithCredential(this.#auth, credential)
    }

  }


  async sendPhoneVerificationCode(phoneNumber: string): Promise<void> {
    const listener = FirebaseAuthentication.addListener('phoneCodeSent', ({verificationId}) => {
      this.#verificationId = verificationId
      listener.remove()
    })
    await FirebaseAuthentication.signInWithPhoneNumber({phoneNumber})
  }


  async signInWithPhoneNumber(verificationCode: string): Promise<void> {
    if (!this.#verificationId) {
      throw new Error(`No valid verificationId found, ensure the sendPhoneVerificationCode method was called first.`)
    }

    const credential = PhoneAuthProvider.credential(this.#verificationId, verificationCode)
    await signInWithCredential(this.#auth, credential)
  }

  async updateDisplayName(displayName: string): Promise<void> {
    if (!this.#currentUser.value) {
      throw new Error('Not authenticated')
    }

    await updateProfile(this.#currentUser.value, {
      displayName,
    })
  }


  async #setCurrentUser(user: User | null): Promise<void> {
    this.#currentUser.next(user)
    if (this.#currentUser.value) {
      await this.#router.navigate(['/'])
    } else {
      await this.#router.navigate(['/login'])
    }
  }
}
