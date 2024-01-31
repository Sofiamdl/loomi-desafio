import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UseCase } from '../../../core/use-case';
import { OrderStatus, UserType } from '@prisma/client';
import { OrderRepository } from '../repositories/order-repository';
import { Order } from '../entities/order.entity';
import { AdminRepository } from 'src/domain/admin/repositories/admin-repository';

export interface IQueryFindAllOrder {
  page: number;
  pageAmount: number;
  status: OrderStatus;
  fromDate: Date;
  toDate: Date;
  maxPrice: number;
  minPrice: number;
  clientId: string;
}

export interface FindAllOrderUseCaseRequest {
  query: IQueryFindAllOrder;
  idOfCurrentUser: string;
}

export interface FindAllOrderUseCaseResponse {
  orders: Order[];
}

@Injectable()
export class FindAllOrderUseCase
  implements UseCase<FindAllOrderUseCaseRequest, FindAllOrderUseCaseResponse>
{
  constructor(
    private adminRepository: AdminRepository,
    private orderRepository: OrderRepository,
  ) {}

  async execute(
    data: FindAllOrderUseCaseRequest,
  ): Promise<FindAllOrderUseCaseResponse> {
    if (data?.query?.clientId) {
      const isUserAdmin = await this.adminRepository.findById(
        data.idOfCurrentUser,
      );

      if (!isUserAdmin) throw new NotFoundException('User order not found!');

      if (isUserAdmin.type != UserType.ADMIN) {
        if (data.query.clientId != data.idOfCurrentUser) {
          throw new UnauthorizedException();
        }
      }
    }
    const orders = await this.orderRepository.findAll(data.query);
    return { orders };
  }
}
