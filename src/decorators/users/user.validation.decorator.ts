// src/decorators/validation.decorators.ts
import { NotFoundException, BadRequestException } from '@nestjs/common';

/**
 * Validates the ID parameter is not null or undefined
 * @param paramIndex The index of the ID parameter (default: 0)
 */
export function ValidateUserId(paramIndex = 0) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const id = args[paramIndex];
      if (!id) {
        throw new NotFoundException('ID is required');
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

/**
 * Validates string params meets minimum length
 * @param minLength Minimum length required
 * @param paramIndex The index of the parameter to validate (default: 0)
 */
export function ValidateMinLength(minLength: number, paramIndex = 0) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const param = args[paramIndex];
      if (typeof param === 'string' && param.length < minLength) {
        throw new BadRequestException(`Parameter at position ${paramIndex} must be at least ${minLength} characters long`);
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

/**
 * Validates if email is valid
 * @param paramIndex The index of the parameter to validate (default: 0)
 */
export function ValidateEmail(paramIndex = 0) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    descriptor.value = function (...args: any[]) {
      const email = args[paramIndex];
      if (typeof email === 'string' && !emailRegex.test(email)) {
        throw new BadRequestException('Invalid email format');
      }
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}

/**
 * Combines multiple validation decorators
 * @param decorators Array of decorator functions to apply
 */
export function Validate(...decorators: Function[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // Apply each decorator in sequence
    return decorators.reduce((desc, decorator) => {
      return decorator(target, propertyKey, desc) || desc;
    }, descriptor);
  };
}