import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { UserType } from '@prisma/client';
import { ItemRepository } from '../repositories/item-repository';
import { OrderRepository } from 'src/domain/order/repositories/order-repository';

export interface RemoveFromCartUseCaseRequest {
  id: string;
  idOfCurrentUser: string;
}

export interface RemoveFromCartUseCaseResponse {}

@Injectable()
export class RemoveFromCartUseCase
  implements
    UseCase<RemoveFromCartUseCaseRequest, RemoveFromCartUseCaseResponse>
{
  constructor(
    private adminRepository: AdminRepository,
    private itemRepository: ItemRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(
    request: RemoveFromCartUseCaseRequest,
  ): Promise<RemoveFromCartUseCaseResponse> {
    const { id, idOfCurrentUser } = request;
    const isUserAdmin = await this.adminRepository.findById(idOfCurrentUser);

    const itemFound = await this.itemRepository.findById(id);

    if (!isUserAdmin || !itemFound)
      throw new NotFoundException('User item not found!');

    if (isUserAdmin.type != UserType.ADMIN) {
      if (itemFound.order.clientId != idOfCurrentUser) {
        throw new UnauthorizedException();
      }
    }

    await this.itemRepository.delete(id);
    const total = await this.itemRepository.findSum(itemFound.orderId);
    await this.orderRepository.update(itemFound.orderId, { total });
    return;
  }
}
