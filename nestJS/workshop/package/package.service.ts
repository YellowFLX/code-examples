import { eachDayOfInterval, subDays, isSameDay } from 'date-fns';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@libs/prisma';
import { UsersService } from '../../users';
import { FindAllPackagesDto, PackageFilterDto, UpdatePackageDto } from './dto';

interface UsageStatsParams {
  packageUuid: string;
}

@Injectable()
export class PackageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly user: UsersService,
  ) {}

  readonly defaultInclude: Prisma.PackageInclude = {
    user: { select: this.user.defaultSelect },
    meta: true,
    files: {
      include: {
        file: {
          select: { uuid: true, src: true, color: true },
        },
      },
      take: 1,
    },
    versions: {
      select: { uuid: true, published: true },
      orderBy: {
        published: 'desc',
      },
      take: 1,
    },
    tags: { include: { tag: true } },
    _count: {
      select: { favorites: true },
    },
  };

  readonly defaultMeta: Prisma.PackageMetaCreateInput = {
    fingerprint: '',
  };

  /**
   *
   * @param filter
   */
  getFilterWhere(filter: PackageFilterDto): Prisma.PackageWhereInput {
    const searchFilter: Prisma.PackageWhereInput = {
      OR: [
        { name: { contains: filter.search, mode: 'insensitive' } },
        {
          name: {
            search: filter.search?.split(' ').filter(Boolean).join(' | '),
            mode: 'insensitive',
          },
        },
        {
          description: { search: filter.search?.split(' ').filter(Boolean).join(' | ') },
        },
        { meta: { legacyAuthor: { contains: filter.search, mode: 'insensitive' } } },
        { meta: { legacyAuthorVkID: { contains: filter.search, mode: 'insensitive' } } },
        { user: { username: { contains: filter.search, mode: 'insensitive' } } },
        {
          user: {
            username: {
              search: filter.search?.split(' ').filter(Boolean).join(' | '),
              mode: 'insensitive',
            },
          },
        },
      ],
    };

    const publishedFilter: Prisma.PackageWhereInput = {
      versions: { some: { published: true } },
    };

    const verifiedFilter: Prisma.PackageWhereInput = {
      isVerified: filter.verified,
    };

    const userUuidFilter: Prisma.PackageWhereInput = {
      userUuid: filter.userUuid,
    };

    const tagsUuidFilter: Prisma.PackageWhereInput = {
      tags: { some: { tagUuid: { in: filter.tagsUuid } } },
    };

    return {
      ...(filter.hasOwnProperty('published') && publishedFilter),
      ...(filter.hasOwnProperty('search') && searchFilter),
      ...(filter.hasOwnProperty('verified') && verifiedFilter),
      ...(filter.hasOwnProperty('userUuid') && userUuidFilter),
      ...(filter.hasOwnProperty('tagsUuid') && tagsUuidFilter),
    };
  }

  /**
   *
   * @param sort
   */
  getOrderBy(
    sort: FindAllPackagesDto['sort'],
  ): Prisma.Enumerable<Prisma.PackageOrderByWithRelationAndSearchRelevanceInput> {
    switch (sort) {
      case 'created_at':
      default:
        return [
          { createdAt: 'desc' },
          { favorites: { _count: 'desc' } },
          { meta: { usages: 'desc' } },
        ];
      case 'updated_at':
        return { updatedAt: 'desc' };
      case 'name':
        return { name: 'asc' };
      case 'popular':
        return [{ favorites: { _count: 'desc' } }, { meta: { usages: 'desc' } }];
      case 'usages':
        return { meta: { usages: 'desc' } };
    }
  }

  /**
   * @param dto
   */
  async findAll(dto: FindAllPackagesDto) {
    const perPage = 15;

    const queryWhere = this.getFilterWhere(dto?.filter || {});

    const data = await this.prisma.package.findMany({
      where: queryWhere,
      take: perPage,
      skip: dto.page > 1 ? perPage * dto.page - 1 : 0,
      orderBy: this.getOrderBy(dto.sort),
      include: this.defaultInclude,
    });

    const count = await this.prisma.package.count({
      where: queryWhere,
    });

    return { data, perPage, count, page: dto.page };
  }

  async findOne(uuid: string) {
    return this.prisma.package.findUniqueOrThrow({
      where: { uuid },
      include: this.defaultInclude,
    });
  }

  /**
   *
   * @param params
   */
  async findUsageStats({ packageUuid }: UsageStatsParams) {
    const stats = await this.prisma.gameStats.findMany({
      where: { packageUuid },
    });

    const chart = eachDayOfInterval({
      start: subDays(new Date(), 14 - 1),
      end: new Date(),
    }).map((date) => {
      const value = stats.filter(
        (stat) => stat.type === 'START' && isSameDay(date, stat.createdAt),
      ).length;
      return { date, value: value };
    });

    const starts = stats.filter((stat) => stat.type === 'START').length;
    const ends = stats.filter((stat) => stat.type === 'END').length;

    const percents = Math.round((ends / starts) * 100) || 0;

    return {
      chart,
      starts,
      percents,
    };
  }

  /**
   *
   * @param updateDto
   */
  async update(updateDto: UpdatePackageDto) {
    if (
      !!(await this.prisma.package.count({
        where: { NOT: { uuid: updateDto.uuid }, name: updateDto.name },
      }))
    ) {
      throw new BadRequestException('Package with this name already exists');
    }

    return this.prisma.package.update({
      where: { uuid: updateDto.uuid },
      data: {
        name: updateDto.name,
        description: updateDto.description,
        isVerified: updateDto.isVerified,
      },
    });
  }

  /**
   *
   * @param uuid
   */
  async unpublish(uuid: string) {
    const pkg = await this.prisma.package.findUnique({
      where: { uuid },
      select: { versions: { where: { published: true }, select: { uuid: true } } },
    });

    if (!pkg) {
      return;
    }

    return this.prisma.packageVersion.update({
      where: { uuid: pkg.versions[0].uuid },
      data: { published: false },
    });
  }
}
