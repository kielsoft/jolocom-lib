import { IDidDocument } from "../identity/didDocument/types";
import { IServiceEndpointsSection, IPublicKeySection } from "../identity/didDocument/sections/types";
import { Credential } from "../credentials/credential/credential";
import { ISignedCredential } from "../credentials/signedCredential/types";


export interface IIdentityWalletCreateArgs {
  privateIdentityKey: Buffer
  identity: IIdentity
}

export interface IPrivateKeyWithId {
  key: Buffer
  id: string
}

export interface IIdentity {
    didDocument: IDidDocument
    publicProfile: any
    getDID(): string
    getServiceEndpoints(): IServiceEndpointsSection[]
    getPublicKeySection(): IPublicKeySection[]
}

export interface IIdentityWallet {
    sign: {
        credential: Promise<ISignedCredential>
    }
    identity: IIdentity
    create: any
    getIdentity(): IIdentity
    getIdentityKey(): { key: Buffer; id: string }
    signCredential(credential: Credential): Promise<ISignedCredential>
}