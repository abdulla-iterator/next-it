import { useState } from 'react';

export default function useForm(initialState) {
  const [values, setValues] = useState(initialState);

  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
  }

  function handleChange(event) {
    let { name, value, type } = event.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
        
      [value] = event.target.files;
    }
    setValues({ ...values, [name]: value });
  }

  function resetForm() {
    setValues(initialState);
  }
  function clearForm() {
    // obj->array[value=null]->obj
    const blankState = Object.fromEntries(
      Object.entries(initialState).map(([key, value]) => [key, ''])
    );
    setValues(blankState);
  }

  return {
    handleChange,
    handleSubmit,
    clearForm,
    resetForm,
    values,
  };
}
