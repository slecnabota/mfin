import { createStore } from 'vuex';

const store = createStore({
    state: {
        email: "example@gmail.com",
        formValues: {
        },
        formErrors: {
        }
    },
    mutations: {
        setEmail(state, email) {
            state.email = email;
        },
        setValues(state, { formName, values }) {
            state.formValues = {
                ...state.formValues,
                [formName]: values,
            }
        },
        setErrors(state, { formName, errors }) {
            state.formErrors = {
                ...state.formErrors,
                [formName]: errors,
            };
        },
        initialiseStore(state) {
            if (localStorage.getItem('email')) {
                state.email = localStorage.getItem('email');
            }
        }
    },
    actions: {},
    modules: {},
});

store.subscribe((mutation, state) => {
    if (mutation.type === 'setEmail') {
        localStorage.setItem('email', state.email);
    }
});

export default store;
