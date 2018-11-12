import { classToPlain, plainToClass, Exclude, Expose } from 'class-transformer'
import { IPublicKeySectionAttrs, IPublicKeySection } from './types'
import 'reflect-metadata'

@Exclude()
export class PublicKeySection implements IPublicKeySection {
  @Expose()
  private id: string

  @Expose()
  private 'type': string

  @Expose()
  private publicKeyHex: string

  public fromEcdsa(publicKey: Buffer, id: string): PublicKeySection {
    const publicKeySection = new PublicKeySection()
    publicKeySection.id = id
    publicKeySection.type = 'Secp256k1VerificationKey2018'
    publicKeySection.publicKeyHex = publicKey.toString('hex')

    return publicKeySection
  }

  public getIdentifier(): string {
    return this.id
  }

  public getType(): string {
    return this.type
  }

  public getPublicKeyHex(): string {
    return this.publicKeyHex
  }

  public toJSON(): IPublicKeySectionAttrs {
    return classToPlain(this) as IPublicKeySectionAttrs
  }

  public fromJSON(json: IPublicKeySectionAttrs): PublicKeySection {
    return plainToClass(PublicKeySection, json)
  }
}
