import { BaseMetadata } from 'cred-types-jolocom-core'
import { Credential } from '../credentials/credential/credential'
import { SignedCredential } from '../credentials/signedCredential/signedCredential'
import { IIdentityWalletCreateArgs, IPrivateKeyWithId, IIdentity, IIdentityWallet } from './types'
import { Identity } from '../identity/identity'
import { privateKeyToPublicKey, privateKeyToDID } from '../utils/crypto'
import { ICredentialRequestPayloadCreationAttrs } from '../interactionFlows/credentialRequest/types'
import { JSONWebToken } from '../interactionFlows/JSONWebToken'
import { IAuthPayloadCreationAttrs } from '../interactionFlows/authentication/types'
import { AuthenticationPayload } from '../interactionFlows/authentication/authenticationPayload'
import { CredentialRequestPayload } from '../interactionFlows/credentialRequest/credentialRequestPayload'
import { CredentialResponsePayload } from '../interactionFlows/credentialResponse/credentialResponsePayload'
import { ICredentialResponsePayloadCreationAttrs } from '../interactionFlows/credentialResponse/types'
import { CredentialsReceivePayload } from '../interactionFlows/credentialsReceive/credentialsReceivePayload'
import { ICredentialsReceivePayloadCreationAttrs } from '../interactionFlows/credentialsReceive/types'
import { ICredentialOfferReqPayloadCreationAttrs } from '../interactionFlows/credentialOfferRequest/types'
import { ICredentialOfferResPayloadCreationAttrs } from '../interactionFlows/credentialOfferResponse/types'
import { CredentialOfferRequestPayload } from '../interactionFlows/credentialOfferRequest/credentialOfferRequestPayload'
import {
  CredentialOfferResponsePayload
} from '../interactionFlows/credentialOfferResponse/credentialOfferResponsePayload'
import { IRegistryInstanceCreationArgs } from '../registries/types';
import { DidDocument } from '../identity/didDocument';
import { createJolocomRegistry } from '../registries/jolocomRegistry';

export class IdentityWallet implements IIdentityWallet{
  private identityDocument: IIdentity
  private privateIdentityKey: IPrivateKeyWithId

  public create = {
    credential: Credential.create,
    signedCredential: async <T extends BaseMetadata>({
      metadata,
      claim,
      subject
    }: {
      metadata: T
      claim: typeof metadata['claimInterface']
      subject?: string
    }) => {
      if (!subject) {
        subject = this.getIdentity().getDID()
      }

      return await SignedCredential.create({ metadata, claim, privateIdentityKey: this.privateIdentityKey, subject })
    },
    credentialRequestJSONWebToken: (
      payload: ICredentialRequestPayloadCreationAttrs
    ): JSONWebToken<CredentialRequestPayload> => {
      return JSONWebToken.create({ privateKey: this.privateIdentityKey, payload }) as JSONWebToken<
        CredentialRequestPayload
      >
    },
    credentialResponseJSONWebToken: (
      payload: ICredentialResponsePayloadCreationAttrs
    ): JSONWebToken<CredentialResponsePayload> => {
      return JSONWebToken.create({ privateKey: this.privateIdentityKey, payload }) as JSONWebToken<
        CredentialResponsePayload
      >
    },
    authenticationJSONWebToken: (payload: IAuthPayloadCreationAttrs): JSONWebToken<AuthenticationPayload> => {
      return JSONWebToken.create({ privateKey: this.privateIdentityKey, payload }) as JSONWebToken<
        AuthenticationPayload
      >
    },
    credentialsReceiveJSONWebToken: (
      payload: ICredentialsReceivePayloadCreationAttrs
    ): JSONWebToken<CredentialsReceivePayload> => {
      return JSONWebToken.create({
        privateKey: this.privateIdentityKey,
        payload
      }) as JSONWebToken<CredentialsReceivePayload>
    },
    credentialOfferRequestJSONWebToken: (
      payload: ICredentialOfferReqPayloadCreationAttrs
    ): JSONWebToken<CredentialOfferRequestPayload> => {
      return JSONWebToken.create({ privateKey: this.privateIdentityKey, payload }) as JSONWebToken<
        CredentialOfferRequestPayload
      >
    },
    credentialOfferResponseJSONWebToken: (
      payload: ICredentialOfferResPayloadCreationAttrs
    ): JSONWebToken<CredentialOfferResponsePayload> => {
      return JSONWebToken.create({ privateKey: this.privateIdentityKey, payload }) as JSONWebToken<
        CredentialOfferResponsePayload
      >
    }
  }

  public sign = {
    credential: this.signCredential.bind(this)
  }

  public identity

  public static create({ privateIdentityKey, identity }: IIdentityWalletCreateArgs): IdentityWallet {
    const identityWallet = new IdentityWallet()
    const pubKey = privateKeyToPublicKey(privateIdentityKey).toString('hex')
    const entry = identity.getPublicKeySection().find(pubKeySec => pubKeySec.getPublicKeyHex() === pubKey)

    identityWallet.privateIdentityKey = {
      key: privateIdentityKey,
      id: entry.getIdentifier()
    }

    identityWallet.identityDocument = identity
    identityWallet.setIdentity(identity)

    return identityWallet
  }

  public getIdentity(): IIdentity {
    return this.identityDocument
  }

  private setIdentity(identity: IIdentity): void {
    this.identity = {
      publicProfile: identity.publicProfile
    }
  }

  public getIdentityKey(): { key: Buffer; id: string } {
    return this.privateIdentityKey
  }

  public async signCredential(credential: Credential): Promise<SignedCredential> {
    const signedCredential = SignedCredential.fromCredential(credential)
    await signedCredential.generateSignature(this.privateIdentityKey)

    return signedCredential
  }

  public static async createWithRegistryInstanceArgs(args: IRegistryInstanceCreationArgs): Promise<IdentityWallet> {
    const { privateIdentityKey, privateEthereumKey } = args
    const ddo = await new DidDocument().fromPrivateKey(privateIdentityKey)
    const identity = Identity.create({ didDocument: ddo.toJSON() })
    const identityWallet = IdentityWallet.create({ privateIdentityKey: privateIdentityKey, identity })

    await createJolocomRegistry().commit({ wallet: identityWallet, privateEthereumKey })
    return identityWallet
  }

  public static async authenticateIdentityKey(privateIdentityKey: Buffer): Promise<IdentityWallet> {
    const did = privateKeyToDID(privateIdentityKey)
    const identity = await createJolocomRegistry().resolve(did)

    return IdentityWallet.create({ privateIdentityKey, identity })
  }
}
