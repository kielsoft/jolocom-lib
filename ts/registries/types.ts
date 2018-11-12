import { IIpfsConnector } from '../ipfs/types'
import { IEthereumConnector } from '../ethereum/types'
import { IIdentityWallet } from '../identityWallet/types';

export interface IRegistryInstanceCreationArgs {
  privateIdentityKey: Buffer
  privateEthereumKey: Buffer
}

export interface IRegistryStaticCreationArgs {
  ipfsConnector: IIpfsConnector
  ethereumConnector: IEthereumConnector
}

export interface IRegistryCommitArgs {
  wallet: IIdentityWallet,
  privateEthereumKey: Buffer
}

