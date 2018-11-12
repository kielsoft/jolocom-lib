import { classToPlain, plainToClass, Exclude, Expose } from 'class-transformer'
import { IServiceEndpointSectionAttrs, IServiceEndpointsSection } from './types'
import 'reflect-metadata'

@Exclude()
export class ServiceEndpointsSection implements IServiceEndpointsSection {

  @Expose()
  private id: string

  @Expose()
  private type: string

  @Expose()
  private serviceEndpoint: string

  @Expose()
  private description: string

  public getType(): string {
    return this.type
  }

  public getServiceEndpoint(): string {
    return this.serviceEndpoint
  }

  public toJSON(): IServiceEndpointSectionAttrs {
    return classToPlain(this) as IServiceEndpointSectionAttrs
  }

  public static fromJSON(json: IServiceEndpointSectionAttrs): ServiceEndpointsSection {
    return plainToClass(ServiceEndpointsSection, json)
  }

}
