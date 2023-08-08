const min = (values, name, param) => {
  const value = values[name]
  if (value.length > 0 && value.length <= param) {
    return false;
  } else {
    return true;
  }
};

const max = (values, name, param) => {
  const value = values[name]
  if (value.length >= param) {
    return false;
  } else {
    return true;
  }
};

const email = (values, name, param) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexp(values, name, emailPattern)
}

const regexp = (values, name, param) => {
  const value = values[name]
  const patternRegex = new RegExp(param);
  return patternRegex.test(value)
}

const required = (values, name, param) => {
  const value = values[name]
  if (value.length > 0) {
    return true;
  } else {
    return false;
  }
};

export {
  min, max, required, email, regexp
};
