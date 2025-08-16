import * as core from '@actions/core'

import { RequiredParamError } from './errors/required-param.error'
import { UnexpectedTypeError } from './errors/unexpected-type.error'
import { UnexpectedValueError } from './errors/unexpected-value.error'
import { validators } from './validators'

export function expect(value: string, type: keyof typeof validators): void {
  const Validator = validators[type]

  if (!Validator) {
    throw new UnexpectedTypeError()
  }

  const validator = new Validator()

  const params = validator.params.reduce((accumulator, param) => {
    const value = core.getInput(param)

    if (!value) {
      throw new RequiredParamError(param)
    }

    return {
      ...accumulator,
      [param]: value,
    }
  }, {})

  const valid = validator.validate(value, params)

  if (!valid) {
    throw new UnexpectedValueError()
  }
}
