import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { UserRole } from '../entities/user-role.entity';
import { RolePermission } from '../entities/role-permission.entity';

@Injectable()
export class RbacService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Role)
        private readonly roles: Repository<Role>,
        @InjectRepository(Permission)
        private readonly permissions: Repository<Permission>,
        @InjectRepository(UserRole)
        private readonly userRoles: Repository<UserRole>,
        @InjectRepository(RolePermission)
        private readonly rolePermissions: Repository<RolePermission>,
    ) {}

    async onApplicationBootstrap() {
        // Seed roles
        const adminRole = await this.seedRole('admin');
        const userRole = await this.seedRole('user');

        // Seed permissions
        const orderReadPerm = await this.seedPermission('order.read');
        const orderCreatePerm = await this.seedPermission('order.create');
        const userManagePerm = await this.seedPermission('user.manage');

        // Link admin role to all permissions
        await this.linkPermissionToRole(adminRole, orderReadPerm);
        await this.linkPermissionToRole(adminRole, orderCreatePerm);
        await this.linkPermissionToRole(adminRole, userManagePerm);

        // Link user role to read permission
        await this.linkPermissionToRole(userRole, orderReadPerm);

        // Seed admin user
        await this.seedAdminUser(adminRole);
    }

    private async seedRole(name: string): Promise<Role> {
        let role = await this.roles.findOne({ where: { name } });
        if (!role) {
            role = this.roles.create({ name });
            await this.roles.save(role);
        }
        return role;
    }

    private async seedPermission(key: string): Promise<Permission> {
        let perm = await this.permissions.findOne({ where: { key } });
        if (!perm) {
            perm = this.permissions.create({ key });
            await this.permissions.save(perm);
        }
        return perm;
    }

    private async linkPermissionToRole(role: Role, permission: Permission) {
        let link = await this.rolePermissions.findOne({ where: { role: { id: role.id }, permission: { id: permission.id } } });
        if (!link) {
            link = this.rolePermissions.create({ role, permission });
            await this.rolePermissions.save(link);
        }
    }

    private async seedAdminUser(adminRole: Role) {
        const adminEmail = 'admin@example.com';
        let adminUser = await this.users.findOne({ where: { email: adminEmail } });
        if (!adminUser) {
            const passwordHash = await bcrypt.hash('password', 10);
            adminUser = this.users.create({ email: adminEmail, passwordHash });
            await this.users.save(adminUser);

            const userRoleLink = this.userRoles.create({ user: adminUser, role: adminRole });
            await this.userRoles.save(userRoleLink);
        }
    }
}
