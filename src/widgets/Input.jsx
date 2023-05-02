import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Square,
  Tooltip,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { BsEye } from 'react-icons/bs';
import { MdOutlineEdit } from 'react-icons/md';
import { renderJSX } from '../utils/helpers';
import { IoSync } from 'react-icons/io5';

const InputElement = ({
  required,
  label,
  name,
  type,
  onChange,
  value,
  Sync,
  syncProps,
  inputStyles,
  containerStyles,
  labelStyles,
  h,
  fontSize,
  className,
  autofocus,
  preview,
  selectChild,
  tooltipText,
  isNotProvider,
  placeholder,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [previewFocused, setPreviewFocused] = useState(
    preview ? 'unfocused' : ''
  );

  const previewRef = useRef();

  const inputStyle =
    previewFocused === 'unfocused'
      ? {
          border: 'none',
          borderRadius: `12px`,
          background: 'white',
        }
      : {
          border: `1.36937px solid rgba(4, 9, 33, 0.04)`,
          borderRadius: `12px`,
          background: '#E8E8E8',
        };

  const clickEventOnPreview = preview
    ? {
        onBlur: () => setPreviewFocused('unfocused'),
      }
    : {};

  return (
    <Flex
      flexDirection="column"
      {...containerStyles}
      {...rest}
      className={className}
    >
      <FormControl>
        <FormLabel
          htmlFor={name}
          m="1rem 0"
          fontSize="15px"
          fontWeight="normal"
          color="rgba(4, 9, 33, 0.76)"
          {...labelStyles}
        >
          {label}
          {required ? (
            <Box as="span" color="#ff0000">
              *
            </Box>
          ) : (
            ''
          )}
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
                <IoSync fontSize="15px" color="primary.500" />
              </Square>
            </Tooltip>
          )}
        </FormLabel>
        {/* display select / input field accordingly */}
        {renderJSX(
          selectChild,
          selectChild,
          <InputGroup>
            <Input
              bg={`rgba(4, 9, 33, 0.04)`}
              h="50px"
              p="0 2rem"
              {...inputStyles}
              type={
                type === 'password'
                  ? showPassword
                    ? 'text'
                    : 'password'
                  : type || 'text'
              }
              name={name}
              fontSize={fontSize}
              value={value}
              ref={previewRef}
              pointerEvents={
                preview && previewFocused === 'unfocused' ? 'none' : 'initial'
              }
              onChange={(e) => onChange(e)}
              {...clickEventOnPreview}
              {...(placeholder ? { placeholder } : {})}
              {...inputStyle}
            />
            {type === 'password' || preview ? (
              <InputRightElement
                justifyContent={'center'}
                minW={preview ? '35px' : 'initial'}
                display="flex"
                align="center"
                h="100%"
              >
                {preview ? (
                  <MdOutlineEdit
                    fontSize={'19px'}
                    cursor="pointer"
                    onClick={() => {
                      setPreviewFocused('focused');
                      previewRef.current?.focus();
                    }}
                  />
                ) : showPassword ? (
                  <BsEye
                    className="bseye"
                    cursor={'pointer'}
                    onClick={() => setShowPassword((prev) => !prev)}
                    fontSize={'26px'}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    cursor="pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                    fontSize={'26px'}
                  />
                )}
              </InputRightElement>
            ) : (
              <></>
            )}
          </InputGroup>
        )}
      </FormControl>
    </Flex>
  );
};

export default InputElement;
