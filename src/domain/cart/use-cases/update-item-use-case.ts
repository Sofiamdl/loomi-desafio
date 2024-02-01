import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { Item } from '../entities/item.entity';
import { ItemRepository } from '../repositories/item-repository';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { UserType } from '@prisma/client';
import { OrderRepository } from 'src/domain/order/repositories/order-repository';

export interface IUpdateItemData {
  quantity: number;
  unityPrice: number;
  subtotal: number;
}

export interface UpdateUseCaseRequest {
  id: string;
  quantity: number;
  idOfCurrentUser: string;
}

export interface UpdateUseCaseResponse {
  item: Item;
}

@Injectable()
export class UpdateItemUseCase
  implements UseCase<UpdateUseCaseRequest, UpdateUseCaseResponse>
{
  constructor(
    private itemRepository: ItemRepository,
    private adminRepository: AdminRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(request: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const { id, quantity, idOfCurrentUser } = request;

    const isUserAdmin = await this.adminRepository.findById(idOfCurrentUser);

    const itemFound = await this.itemRepository.findById(id);

    if (!isUserAdmin || !itemFound)
      throw new NotFoundException('User item not found!');

    if (isUserAdmin.type != UserType.ADMIN) {
      if (itemFound.order.clientId != idOfCurrentUser) {
        throw new UnauthorizedException();
      }
    }

    if (itemFound.product.quantity - quantity < 0)
      throw new BadRequestException('Amount of Product Not Available');

    const data: IUpdateItemData = {
      quantity,
      unityPrice: itemFound.product.price,
      subtotal: itemFound.product.price * quantity,
    };

    const item = await this.itemRepository.update(id, data);
    const total = await this.itemRepository.findSum(itemFound.orderId);
    await this.orderRepository.update(itemFound.orderId, { total });
    return { item };
  }
}
