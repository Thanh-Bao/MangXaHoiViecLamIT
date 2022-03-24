import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from './schema/admin.schema';
import { IsUsernameUnique, IsUsernameUniqueFieldConstraint } from './validator/isUsernameUnique';

@Module({
	imports: [
		MongooseModule.forFeature([{ 
			name: 'Admin', 
			schema: AdminSchema
		}]),
	],
	controllers: [AdminController],
	providers: [IsUsernameUniqueFieldConstraint, AdminService]
})
export class AdminModule {}
