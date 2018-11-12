import { IEthereumResolverConfig } from './ethereum/types'
import { IIpfsConfig, IIpfsConnector } from './ipfs/types'

export interface ILibConfig {
  identity: IEthereumResolverConfig
  ipfs: IIpfsConfig
  IpfsConnector?: IIpfsConnector
}

export interface IVerifiable {
    validateSignatureWithPublicKey: (pubKey: Buffer) => Promise<boolean>
    getSigner: () => ISigner
}

export interface ISigner {
    did: string
    keyId: string
}