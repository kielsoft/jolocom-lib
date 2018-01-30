import Did from "./did";
import { IAuthenticationCredentialAttrs } from "./types";

/* Describes AuthorizationCredential according to DID/DDO specifications
 * Source: https://w3c-ccg.github.io/did-spec/
 */
export default class AuthenticationCredential {
  public static ecdsaCredentials(publicKey: string, did: Did): any {
    return {
      id: this.generateGenericKeyId(did),
      type: ["CryptographicKey", "EcDsaSAKey"],
      owner: did,
      curve: "secp256k1",
      publicKeyBase64: publicKey,
    } as AuthenticationCredential;
  }

  public static generateGenericKeyId(did: Did): Did {
    const newDid = Object.create(Did.prototype);
    newDid.identifier = `${did.identifier}#keys/generic/1`;
    return newDid;
  }

  public static reviver(key: string, value: any): any {
    return key === "" ? AuthenticationCredential.fromJSON(value) : value;
  }

  public static fromJSON(json: IAuthenticationCredentialAttrs): AuthenticationCredential {
    const authCredential = Object.create(AuthenticationCredential.prototype);
    return Object.assign(authCredential, json, {
      id: Did.fromJSON(json.id),
      owner: Did.fromJSON(json.owner),
    });
  }

  public id: Did;
  public "type": string[];
  public owner: Did;
  public curve: string;
  public publicKeyBase64: string;
}
