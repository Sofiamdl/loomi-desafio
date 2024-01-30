import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';
import { UserType } from '@prisma/client';
import { OrderRepository } from '../repositories/order-repository';

export interface DeleteOrderUseCaseRequest {
  id: string;
  idOfCurrentUser: string;
}

export interface DeleteOrderUseCaseResponse {}

@Injectable()
export class DeleteOrderUseCase
  implements UseCase<DeleteOrderUseCaseRequest, DeleteOrderUseCaseResponse>
{
  constructor(
    private adminRepository: AdminRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(
    request: DeleteOrderUseCaseRequest,
  ): Promise<DeleteOrderUseCaseResponse> {
    const { id, idOfCurrentUser } = request;
    const isUserAdmin = await this.adminRepository.findById(idOfCurrentUser);

    const isSameUser = await this.orderRepository.findById(id);
    if (!isUserAdmin || !isSameUser)
      throw new NotFoundException('User order not found!');

    if (isUserAdmin.type != UserType.ADMIN) {
      if (isSameUser.clientId != idOfCurrentUser) {
        throw new UnauthorizedException();
      }
    }

    await this.orderRepository.delete(id);

    return;
  }
}
