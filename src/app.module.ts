import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import 'colors';
import { CategorysModule } from './categories/categories.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { ItemsModule } from './items/items.module';
import { UploadsModule } from './uploads/uploads.module';
import { FlashsalesModule } from './flashsales/flashsales.module';
import { OrdersModule } from './orders/orders.module';
import { ScheduleModule } from '@nestjs/schedule';
import * as config from 'config';
import { ConfigurationService } from './configuration/configuration.service';
import { Connection } from 'mongoose';
import { ConfigurationModule } from './configuration/configuration.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: async (configurationService: ConfigurationService) => ({
        uri: configurationService.MONGODB_URI,
        connectionFactory: (connection: Connection) => {
          if (connection.readyState === 1) {
            Logger.log(
              ` Alhamdulillah! MongoDB Connected with: ${connection.host} `
                .bgWhite.black,
            );
          }

          connection.on('disconnected', () => {
            Logger.warn('DB disconnected');
          });

          connection.on('error', (error) => {
            Logger.error(
              ` DB connection failed! for error: ${error} `.bgRed.black
                .underline.bold,
            );
          });

          //! MongoDB AutoPopulate Plugin Initialization
          return connection;
        },
      }),
      inject: [ConfigurationService],
    }),
    UsersModule,
    AuthModule,
    CategorysModule,
    VouchersModule,
    ItemsModule,
    UploadsModule,
    FlashsalesModule,
    ConfigurationModule,
    CoreModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
