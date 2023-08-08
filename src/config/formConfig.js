const messages = {
  min: 'нужно больше',
  max: 'нужно меньше',
  email: 'Указанный адрес электронной почты некорректен',
  regexp: 'Поле имеет неверный формат',
  equals: 'Поля не совпадают',
  required: 'Заполните поле'
};
const input = (name, self, store) => {
  const modelValue = self.get(name);
  const mask = self.getMask(name); 
  const maskedValue = mask ? self.applyMask(name, modelValue) : modelValue; 
  return {
    modelValue: maskedValue,
    'onUpdate:modelValue': (v) => self.set(name, v),
    error: store.state.formErrors[self.formName] && store.state.formErrors[self.formName][name] && store.state.formErrors[self.formName][name][0],
  };
}

export default {
  messages, input
};