import { ICredentialAttrs, IClaimSection } from '../credential/types'
import { ILinkedDataSignatureAttrs, ILinkedDataSignature } from '../../linkedDataSignature/types'
import { IVerifiable, ISigner } from '../../types';

export interface ISignedCredentialAttrs extends ICredentialAttrs {
  id: string
  issuer: string
  issued: string
  expires?: string
  claim: IClaimSection
  proof: ILinkedDataSignatureAttrs
}

export interface ISignedCredential extends IVerifiable {
    setIssuer(issuer: string): void
    setId(): void
    setIssued(issued: Date): void
    getId(): string 
    getIssued(): Date 
    getType(): string[]
    getIssuer(): string
    getSigner(): ISigner
    getExpiryDate(): Date
    getProofSection(): ILinkedDataSignature
    getSubject(): string 
    getCredentialSection(): IClaimSection 
    getDisplayName(): string 
    generateSignature({ key, id }: { key: Buffer; id: string }) 
    validateSignatureWithPublicKey(pubKey: Buffer): Promise<boolean> 
    toJSON(): ISignedCredentialAttrs 
    digest(): Promise<string> 
  }