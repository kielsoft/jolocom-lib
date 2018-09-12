import 'reflect-metadata'
import { parse } from './parse/parser'
import { Credential } from './credentials/credential/credential'
import { CredentialRequest } from './credentialRequest/credentialRequest'
import { CredentialResponse } from './credentialResponse/credentialResponse'
import { registries } from './registries'
import { IdentityManager } from './identityManager/identityManager'

export const JolocomLib = {
  parse,
  registry : registries,
  identityManager : {
    create: IdentityManager.create
  },
  unsigned : {
    createCredential: Credential.create,
    createCredentialRequest: CredentialRequest.create,
    createCredentialResponse: CredentialResponse.create
  }
}

export enum keyTypes {
  jolocomIdentityKey = 'm/73\'/0\'/0\'/0',
  ethereumKey = 'm/44\'/60\'/0\'/0/0'
}

export { claimsMetadata } from 'cred-types-jolocom-core'