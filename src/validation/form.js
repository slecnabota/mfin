import IMask from 'imask';
import * as validations from './validations.js';
import config from '../config/formConfig.js';
import store from '../store/index.js';

class Form {
    formName = '';
    rules = {};
    masks = {};
    generateRandomId() {
        return Math.random().toString(36).substring(2, 15);
    }

    init(values) {
        this.formName = this.generateRandomId();
        store.commit("setValues", { formName: this.formName, values });
    }

    setRules(rules) {
        this.rules = { ...rules };
    }

    getStore() {
        return store.state;
    }

    get(name = null) {
        if (name === null) {
            return this.getStore().formValues[this.formName];
        }
        return this.getStore().formValues[this.formName][name];
    }

    set(name, value) {
        this.getStore().formValues[this.formName][name] = value;
    }
    setMasks(masks) {
        this.masks = { ...masks };
    }

    getMask(name) {
        return this.masks[name] || null;
    }

    applyMask(name, value) {
        const mask = this.getMask(name);
        if (mask) {
            const maskInstance = IMask.createMask({ mask });
            return maskInstance.resolve(value);
        }
        return value;
    }

    input(name) {
        return config.input(name, this);
    }
    validate() {
        let result = true;
        this.getStore().formErrors[this.formName] = {};
        for (const name in this.getStore().formValues[this.formName]) {
            const rules = this.rules[name];
            if (rules && rules.length) {
                for (const rule of rules) {
                    const ruleSplit = rule.split(':');
                    const ruleName = ruleSplit[0];
                    const ruleParam = ruleSplit[1];
                    const validation = validations[ruleName];
                    if (validation) {
                        if (!validation(this.getStore().formValues[this.formName], name, ruleParam)) {
                            result = false;
                            if (!this.getStore().formErrors[this.formName][name]) {
                                this.getStore().formErrors[this.formName][name] = [];
                            }
                            const message = config.messages[ruleName] || 'Error';
                            this.getStore().formErrors[this.formName][name].push(message);
                        }
                    } else {
                        console.error('Validation with name `' + ruleName + '` was not found');
                    }
                }
            }
            let resultMask = true;
            if (this.masks[name]) {
                if (!validations.maskFilled(this.applyMask(name, this.get(name)), name, this.getMask(name))) {
                    resultMask = false;
                    if (!this.getStore().formErrors[this.formName][name]) {
                        this.getStore().formErrors[this.formName][name] = [];
                    }
                    const message = config.messages.mask || 'Error';
                    this.getStore().formErrors[this.formName][name].push(message);
                    console.log('efjwkjfioejio')
                    console.log("resultat")
                }
            }
        }
        return result;
    }
}

export default Form;
