const Joi = require('@hapi/joi');
const Subscription = require("../models/subscription");
const ValidationError = require("../../errors/errors").ValidationError;


"use strict"

let validators = {
  "Subscription": {
    scopes: {
      default: Subscription.SubscriptionValidationSchema
    }
  }
}

function scopeExists(validator, scope) {
  return Object.keys(validator.scopes).find(key => key == scope) != undefined;
}

function getSchema(model, scope) {
  let validator = validators[model];
  if(!validator){
    throw new Error("Validator does not exist");
  }
  // Fist check if the given validator has multiples scopes
  if(validator.scopes){
    // if the caller has passed a value for 'scope'
    if(scope){
      if(!scopeExists(validator, scope)){
        throw new Error(`Scope:  ${scope} does not exist in ${model} validator`);
      }else {
        return validator.scopes[scope];
      }
    }else {
      return validator.scopes.default;
    }
  }else {
    return validator;
  }
}

function validate(model, object, scope){
  // this, was refactored to this https://stackoverflow.com/questions/57956609/joi-1-default-validate-is-not-a-function

  // return validationSchema.validate(object, getSchema(model, scope), {
  //   allowUnknown: true
  // });
  return getSchema(model, scope).validate(object, {
    allowUnknow:true
  })
}
// Actual middleware factory
module.exports = function ValidationMiddlware(model, scope){
  return (req, res, next) => {
    const validationResult = validate(model, req.body, scope);
    if(validationResult.error){
      throw new ValidationError(validationResult.error.message, model);
    }else {
      next();
    }
  }
}