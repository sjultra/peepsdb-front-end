import { Text, Tooltip, Square, Box, Input } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IoSync } from 'react-icons/io5';
import { renderJSX } from '../utils/helpers';

function useRedebounce() {
  const debouncer = useRef({});

  const redebounce = useCallback((cb, functionName, delay) => {
    let timeout = debouncer.current[functionName];
    return function () {
      if (timeout) {
        clearTimeout(timeout);
        debouncer.current[functionName] = undefined;
      }
      debouncer.current[functionName] = setTimeout(cb, delay);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const dc = debouncer.current;

    return () => {
      const debouncing = Object.keys(dc);
      debouncing.forEach((d) => {
        const timeout = dc[d];
        if (timeout) {
          clearTimeout(timeout);
          dc[d] = undefined;
        }
      });
    };
  }, []);

  return redebounce;
}

const SearcheableSelect = ({
  name,
  label,
  required,
  Sync,
  isNotProvider,
  h,
  options,
  tooltipText,
  defaultValue,
  onChange,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue || '');

  // const [isExpanded,setIsExpanded] = useState('hidden')

  const menuRef = useRef();

  // const onChangeFn   = (e)=>{
  //     let val = e?.target?.value
  //     let value = onChange? onChange(e): val;
  //     console.log('value',value)

  //     setValue(value);
  // }

  const expandOptions = () => {
    !menuRef?.current?.hasAttribute('open') &&
      menuRef.current?.toggleAttribute('open');
  };

  const closeOptions = () => {
    menuRef?.current?.hasAttribute('open') &&
      menuRef.current?.removeAttribute('open');
  };

  const optionArr = Array(options) || ['Nigeria', 'Africa', 'America'];

  return (
    <Box>
      <Text
        w="full"
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
      <Box as="details" ref={menuRef} position={'relative'} h={h || '50px'}>
        <Box h={h || '50px'} as="summary">
          <Input
            bg="#E8E8E8"
            h={h || '50px'}
            w="full"
            position={'absolute'}
            onBlur={closeOptions}
            top={0}
            left={0}
            onFocus={expandOptions}
            {...rest}
          />
        </Box>

        <Box
          tabIndex={name + Math.random()}
          onBlur={() => console.log('active element', document?.activeElement)}
          p={'0.6em 0.4em'}
          bg-="white"
          boxShadow={'0 3px 10px rgb(0 0 0 / 0.2)'}
          zIndex={100}
          position={'absolute'}
          top="115%"
          left={0}
          w="full"
        >
          {optionArr.map((value, key) => {
            const mt = key ? '0.8em' : 0;
            return (
              <Text
                onClick={() => {
                  console.log('clicking open');
                }}
                fontSize={'12px'}
                mt={mt}
                key={key}
              >
                {value}
              </Text>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default SearcheableSelect;
