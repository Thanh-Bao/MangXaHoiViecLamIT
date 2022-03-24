import { Dependencies, Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from "../user.service";

@ValidatorConstraint({ name: 'IsUsernameUnique', async: true })
@Injectable()
export class IsUsernameUniqueFieldConstraint implements ValidatorConstraintInterface {
    constructor(private readonly adminService: UserService) {}

    async validate(value: string, args: ValidationArguments) {
        const user = await this.adminService.findByUsername(value);
        
        return user == null;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} already exists`;
    }
}

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],            
            validator: IsUsernameUniqueFieldConstraint,
        });
    };
}