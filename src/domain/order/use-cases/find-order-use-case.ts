import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { UserType } from '@prisma/client';
import { OrderRepository } from '../repositories/order-repository';

export interface FindOrderUseCaseRequest {
  id: string;
  idOfCurrentUser: string;
}

export interface FindOrderUseCaseResponse {}

@Injectable()
export class FindOrderUseCase
  implements UseCase<FindOrderUseCaseRequest, FindOrderUseCaseResponse>
{
  constructor(
    private adminRepository: AdminRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(
    request: FindOrderUseCaseRequest,
  ): Promise<FindOrderUseCaseResponse> {
    const { id, idOfCurrentUser } = request;
    const isUserAdmin = await this.adminRepository.findById(idOfCurrentUser);

    const order = await this.orderRepository.findById(id);
    if (!isUserAdmin || !order)
      throw new NotFoundException('User order not found!');

    if (isUserAdmin.type != UserType.ADMIN) {
      if (order.clientId != idOfCurrentUser) {
        throw new UnauthorizedException();
      }
    }

    return { order };
  }
}
