import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Transaction } from './transactions/entities/transaction.entity';
import { AccountsModule } from './accounts/accounts.module';
import { Account } from './accounts/entities/account.entity';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [Transaction, Account],
      autoLoadModels: true,
      synchronize: true,
      sync: {
        alter: true,
        // force: true,
      },
    }),
    TransactionsModule,
    AccountsModule,
    SharedModule,
    AuthModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
