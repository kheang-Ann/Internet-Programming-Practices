import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategy } from './common/guards/strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { APP_GUARD } from '@nestjs/core';
// import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// ✅ IMPORT YOUR CUSTOM GRAPHQL MODULE
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    // ✅ ADD GraphqlModule TO THE IMPORTS ARRAY
    GraphqlModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // This forces the use of the Express driver
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      playground: true,
      introspection: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_SECRET'),
      }),
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'auth-service',
          port: 3000,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class AppModule {}
