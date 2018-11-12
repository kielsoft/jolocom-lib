import { IPublicKeySectionAttrs, IAuthenticationSectionAttrs, IServiceEndpointSectionAttrs, IServiceEndpointsSection, IPublicKeySection  } from './sections/types'
import { ILinkedDataSignatureAttrs } from '../../linkedDataSignature/types'
import { IVerifiable } from '../../types';


export interface IDidDocumentAttrs {
  '@context': string
  id: string
  authentication: IAuthenticationSectionAttrs[]
  publicKey: IPublicKeySectionAttrs[]
  service: IServiceEndpointSectionAttrs[]
  created: Date
  proof: ILinkedDataSignatureAttrs
}

export interface IDidDocument extends IVerifiable {
    addServiceEndpoint(endpoint: IServiceEndpointsSection): void
    getDID(): string
    getServiceEndpoints(): IServiceEndpointsSection[]
    getPublicKeySection(): IPublicKeySection[]
    toJSON(): IDidDocumentAttrs
}