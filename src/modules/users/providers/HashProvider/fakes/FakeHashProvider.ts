import IHashProvider from "../models/IHashProvider";

export default class FakeHashProvider implements IHashProvider{

  generateHash(payload: string): Promise<string> {

    return new Promise((
       resolve, reject
       ) => {
          resolve(payload);
         });
  }


  compareHash(payload: string, hash: string): Promise<boolean> {

    return new Promise((
      resolve, reject
      ) => {
       resolve(payload === hash)
      });
  }

}
