import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
  
  
@ValidatorConstraint({ async: false })
export class DateRangeValidator implements ValidatorConstraintInterface {
    validate(value: number | Date, args: ValidationArguments) {
        const { object } = args;
  
        const startDateStr = object['startDate'];
        const endDateStr = object['endDate'];

        if (startDateStr && !endDateStr) {
            args.constraints.push('endDateMissing');
            return false;
        }

        if (endDateStr && !startDateStr) {
            args.constraints.push('startDateMissing');
            return false;
        }

        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);
    
        if (endDate < startDate) {
            args.constraints.push('invalidDateRange');
            return false;
        }
    
        return true;
    }
  
    defaultMessage(args: ValidationArguments) {
        if (args.constraints.includes('startDateMissing')) {
            return 'startDate is missing.';
        }
      
        if (args.constraints.includes('endDateMissing')) {
            return 'endDate is missing.';
        }

        if (args.constraints.includes('invalidDateRange')) {
            return 'endDate should be greater than startDate.';
        }    
    }
}
  
export function IsDateRange(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: DateRangeValidator,
        });
    };
}
