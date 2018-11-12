export interface IPublicKeySectionAttrs {
  id: string
  type: string
  publicKeyHex: string
}

export interface IAuthenticationSectionAttrs {
  publicKey: string
  type: string
}

export interface IServiceEndpointSectionAttrs {
  id: string
  type: string
  serviceEndpoint: string
  description: string
}

export interface IServiceEndpointsSection {
    getType(): string
    getServiceEndpoint(): string
    toJSON(): IServiceEndpointSectionAttrs
}

export interface IPublicKeySection {
    fromEcdsa(publicKey: Buffer, id: string): IPublicKeySection
    getIdentifier(): string 
    getType(): string 
    getPublicKeyHex(): string 
    toJSON(): IPublicKeySectionAttrs 
    fromJSON(json: IPublicKeySectionAttrs): IPublicKeySection 
  }