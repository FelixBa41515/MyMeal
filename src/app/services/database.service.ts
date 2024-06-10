import {inject, Injectable} from '@angular/core'
import {AuthService} from './auth.service'
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc, docData,
  getDocs,
  DocumentReference,
  Firestore,
  orderBy,
  query, updateDoc,
  where, limit, getDoc
} from '@angular/fire/firestore'

import {catchError, firstValueFrom, map, Observable} from 'rxjs'
import firebase from 'firebase/compat'
import DocumentData = firebase.firestore.DocumentData
import {IRecipe} from '../../models/IRecipe'
import {IUserRecipe} from '../../models/IUserRecipe'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  #authService = inject(AuthService)
  #firestore = inject(Firestore)

  constructor() {
  }


  async saveUserRecipe(recipe: IRecipe): Promise<void> {
    const user = this.#authService.getUserUID()

    if (!user) {
      throw new Error('Authenticated')
    }

    const userRecipeCollectionRef = this.#getCollectionRef<IUserRecipe>('UserRecipes')
    const querySnapshot = await getDocs(query(userRecipeCollectionRef, where('userId', '==', user)))

    if (!querySnapshot.empty) {
      const userRecipeDoc = querySnapshot.docs[0]
      const userRecipeId = userRecipeDoc.id
      await this.updateUserRecipe(recipe, userRecipeId)
    } else {
      const newUserRecipe: IUserRecipe = {
        userId: user,
        recipes: [recipe]
      }
      await addDoc<IUserRecipe, IUserRecipe>(
        this.#getCollectionRef<IUserRecipe>('UserRecipes'),
        newUserRecipe,
      )
    }
  }


  async updateUserRecipe(recipe: IRecipe, id: string): Promise<void> {
    const user = this.#authService.getUserUID()

    if (!user) {
      throw new Error('Authenticated')
    }

    const userRecipeDocRef = this.#getDocumentRef<IUserRecipe>('UserRecipes', id);
    const userRecipeDoc$ = docData(userRecipeDocRef) as Observable<IUserRecipe | undefined>;
    const userRecipeDoc = await firstValueFrom(userRecipeDoc$);

    if (!userRecipeDoc) {
      throw new Error('User recipe document not found')
    }

    const existingRecipes = userRecipeDoc.recipes || []

    const updatedRecipes = [...existingRecipes, recipe]

    await updateDoc(userRecipeDocRef, {recipes: updatedRecipes})
  }

 async retrieveRecipes(): Promise<Observable<IUserRecipe> | undefined> {
    const user = this.#authService.getUserUID();

    if (!user) {
      throw new Error('Authenticated');
    }
    const userRecipeCollectionRef = this.#getCollectionRef<IUserRecipe>('UserRecipes')
    const querySnapshot = await getDocs(query(userRecipeCollectionRef, where('userId', '==', user)))

   if (querySnapshot.docs.length === 0) {
     return undefined
   }
    return collectionData<IUserRecipe>(
      query<IUserRecipe,IUserRecipe>(
        this.#getCollectionRef('UserRecipes'),
        where('userId', '==', user),
        limit(1)
      ),
      { idField: 'userId' }
    ).pipe(
      map((userRecipes) => {
        if (userRecipes.length > 0) {
          return userRecipes[0];
        } else {
          throw new Error('Document not found');
        }
      }),
      catchError((error) => {
        throw new Error('Error fetching document: ' + error);
      })
    );
  }

  async removeRecipe(recipeId: number): Promise<void> {
    const user = this.#authService.getUserUID();

    if (!user) {
      throw new Error('Authenticated');
    }

    const userRecipeCollectionRef = this.#getCollectionRef<IUserRecipe>('UserRecipes');
    const querySnapshot = await getDocs(query(userRecipeCollectionRef, where('userId', '==', user)));

    if (querySnapshot.empty) {
      throw new Error('User recipe document not found');
    }

    const userRecipeDoc = querySnapshot.docs[0];
    const userRecipeId = userRecipeDoc.id;

    const userRecipeDocRef = this.#getDocumentRef<IUserRecipe>('UserRecipes', userRecipeId);
    const userRecipeDoc$ = docData(userRecipeDocRef) as Observable<IUserRecipe | undefined>;
    const userRecipeData = await firstValueFrom(userRecipeDoc$);

    if (!userRecipeData) {
      throw new Error('User recipe document not found');
    }

    const existingRecipes = userRecipeData.recipes || [];

    const recipeIndex = existingRecipes.findIndex(recipe => recipe.id === recipeId);

    if (recipeIndex !== -1) {
      existingRecipes.splice(recipeIndex, 1);

      await updateDoc(userRecipeDocRef, { recipes: existingRecipes });
    } else {
      throw new Error('Recipe not found in user recipes');
    }
  }




  #getCollectionRef<T extends DocumentData>(collectionName: string): CollectionReference<T, T> {
    return collection(this.#firestore, collectionName) as unknown as CollectionReference<T, T>
  }


  #getDocumentRef<T extends DocumentData>(collectionName: string, id: string): DocumentReference<T, T> {
    return doc(this.#firestore, `${collectionName}/${id}`) as unknown as DocumentReference<T, T>
  }
}
