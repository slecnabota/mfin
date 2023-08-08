import IMask from 'imask'
import * as validations from './validations.js'
import config from '../config/formConfig.js'
import store from '../store/index.js'

class Form {
  formName = 'default'
  rules = {}
  masks = {}
  setMask(masks) {
    this.masks = { ...masks };
  }

  getMask(name) {
    return this.masks[name] || null;
  }
  applyMask(name, value) {
    const mask = this.getMask(name);
    if (mask) {
      return IMask.createMask({ mask }).resolve(value);
    }
    return value;
  }
  setRules(rules) {
    this.rules = { ...rules };
  }

  init(values, formName = 'default') {
    this.formName = formName
    store.commit("setValues", { formName: this.formName, values })
  }

  get(name = null) {
    if (name === null) {
      return store.state.formValues[this.formName];
    }
    return store.state.formValues[this.formName][name];
  }

  set(name, value) {
    store.state.formValues[this.formName][name] = value;
  }

  input(name) {
    return config.input(name, this, store)
  }

  validate() {
    let result = true;
    store.state.formErrors[this.formName] = {};
    for (const name in store.state.formValues[this.formName]) {
      const rules = this.rules[name];
      if (rules && rules.length) {
        for (const rule of rules) {
          const ruleSplit = rule.split(':');
          const ruleName = ruleSplit[0];
          const ruleParam = ruleSplit[1];
          const validation = validations[ruleName];
          if (validation) {
            if (!validation(store.state.formValues[this.formName], name, ruleParam)) {
              result = false;
              if (!store.state.formErrors[this.formName][name]) {
                store.state.formErrors[this.formName][name] = [];
              }
              const message = config.messages[ruleName] || 'Error';
              store.state.formErrors[this.formName][name].push(message)
            }
          } else {
            console.error('Validation with name `' + ruleName + '` was not found');
          }
        }
      }
    }
    return result;
  }
}

export default Form;
