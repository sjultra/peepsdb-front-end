import { Box, Square, Text, Tooltip, Select } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoSync } from 'react-icons/io5';
import { renderJSX } from '../utils/helpers';

const SelectInput = ({
  name,
  label,
  required,
  Sync,
  isNotProvider,
  tooltipText,
  options,
  defaultValue,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    !value && setValue(defaultValue);
  }, [defaultValue]);

  const onChangeFn = (e) => {
    let val = e?.target?.value;
    let value = onChange ? onChange(e) : val;
    console.log('value', value);

    setValue(value);
  };

  console.log('value recieved', defaultValue, value);

  return (
    <Box>
      <Text
        display={'inline-block'}
        my="1rem"
        color={'rgba(4, 9, 33, 0.76)'}
        fontSize={'13px'}
        as="label"
        htmlFor={name}
      >
        {label}
        {required ? <span>*</span> : ''}
        {renderJSX(
          Sync && isNotProvider,
          <Tooltip label={`Sync with ${tooltipText || name}`}>
            <Square
              onClick={Sync}
              mx="0.4em"
              cursor="pointer"
              display={'inline-flex'}
              size="19px"
              p="0.1em"
              borderRadius={'2px'}
              bg="#FAFAFA"
            >
              <IoSync fontSize={'15px'} color="var(--primary-color)" />
            </Square>
          </Tooltip>
        )}
      </Text>

      <Select
        background="#E8E8E8"
        borderRadius="12px"
        name={name}
        fontSize={'13px'}
        h="50px"
        w="full"
        value={value}
        onChange={onChangeFn}
        {...rest}
      >
        {options?.map((optionVal, index) => (
          <option value={optionVal?.value} key={index * Math.random()}>
            {optionVal?.label}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default SelectInput;
