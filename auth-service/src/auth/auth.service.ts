import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';

import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { RolePermission } from '../entities/role-permission.entity';
import { RefreshToken } from '../entities/refresh-token.entity';
import { Role } from '../entities/role.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,

    @InjectRepository(User)
    private readonly users: Repository<User>,

    @InjectRepository(UserRole)
    private readonly userRoles: Repository<UserRole>,

    @InjectRepository(Role)
    private readonly roles: Repository<Role>,

    @InjectRepository(RolePermission)
    private readonly rolePerms: Repository<RolePermission>,

    @InjectRepository(RefreshToken)
    private readonly refreshTokens: Repository<RefreshToken>,
  ) {}

  async register(email: string, password: string) {
    const existingUser = await this.users.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = this.users.create({ email, passwordHash });
    await this.users.save(user);

    // Attach default "user" role
    const userRole = await this.roles.findOne({ where: { name: 'user' } });
    if (userRole) {
      const newUserRole = this.userRoles.create({ user, role: userRole });
      await this.userRoles.save(newUserRole);
    }

    return { message: 'registered' };
  }

  async login(email: string, password: string) {
    const user = await this.users.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    // Fetch roles
    const roles = await this.userRoles.find({
      where: { user: { id: user.id } },
      relations: { role: true, user: true },
    });
    const roleNames = roles.map((r) => r.role.name);

    // Fetch permissions via roles
    const roleIds = roles.map((r) => r.role.id);
    let permissionKeys: string[] = [];
    if (roleIds.length > 0) {
      const perms = await this.rolePerms
        .createQueryBuilder('rp')
        .leftJoinAndSelect('rp.permission', 'permission')
        .where('rp.roleId IN (:...roleIds)', { roleIds })
        .getMany();
      permissionKeys = [...new Set(perms.map((x) => x.permission.key))];
    }

    const accessToken = await this.jwt.signAsync({
      sub: user.id,
      email: user.email,
      roles: roleNames,
      permissions: permissionKeys,
    });

    const refreshToken = randomBytes(48).toString('hex');
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Refresh token expires in 7 days

    const newRefreshToken = this.refreshTokens.create({
      user,
      tokenHash: refreshTokenHash,
      expiresAt,
    });
    await this.refreshTokens.save(newRefreshToken);

    return { accessToken, refreshToken };
  }
}
