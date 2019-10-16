import { useState, useEffect } from 'react';

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    // console.log(e.nativeEvent.text);
    setValue(e.nativeEvent.text);
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return {
    value,
    onChange: handleChange
  };
}

exports.useFormInput = useFormInput;
