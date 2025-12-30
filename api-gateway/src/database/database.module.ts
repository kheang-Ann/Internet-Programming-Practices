import { DynamicModule, Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm'; // Make sure DataSource is imported
import { DATA_SOURCE } from './database.constants';
// import { Category } from 'src/modules/category/entities/category.entity';

type DbOptions = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
};

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(options: DbOptions): DynamicModule {
    const dataSourceProvider = {
      provide: DATA_SOURCE,
      useFactory: async () => {
        const ds = new DataSource({
          type: 'postgres',
          host: options.host,
          port: options.port,
          username: options.username,
          password: options.password,
          database: options.database,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Ensure entities are loaded
          synchronize: true,
        });

        return ds.initialize();
      },
    };

    return {
      module: DatabaseModule,
      providers: [dataSourceProvider],
      exports: [dataSourceProvider], // This makes DATA_SOURCE available globally
    };
  }

  static forFeature(entities: any[]): DynamicModule {
    const repoProviders = entities.map((entity) => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      provide: `${entity.name.toUpperCase()}_REPO`,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      useFactory: (ds: DataSource) => ds.getRepository(entity),
      inject: [DATA_SOURCE], // This relies on DATA_SOURCE being available
    }));

    return {
      module: DatabaseModule,
      // We don't need "imports: [DatabaseModule]" here because the module is @Global()
      providers: repoProviders,
      exports: repoProviders,
    };
  }
}
