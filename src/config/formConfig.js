import get from 'lodash/get'

const messages = {
  min: 'нужно больше',
  max: 'нужно меньше',
  email: 'Указанный адрес электронной почты некорректен',
  regexp: 'Поле имеет неверный формат',
  equals: 'Поля не совпадают',
  mask: 'Введите все символы маски',
  required: 'Заполните поле'
};

const input = (name, self) => {
  const modelValue = self.get(name);
  const maskedValue = self.getMask(name) ? self.applyMask(name, modelValue) : modelValue; 
  return {
      modelValue: maskedValue,
      'onUpdate:modelValue': (v) => self.set(name, v),
      error: get(self.getStore().formErrors, self.formName+'.'+name+'.0'),
  };
};

export default {
  messages, input
};
