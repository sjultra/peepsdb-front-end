import { Box, Flex, Text, Select } from '@chakra-ui/react';
import { useMemo, useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai';


const returnNumberArray = (range,startValue=1)=>{
	let returnArr = [];
	if (range) {
		for (let index = startValue; index < range + startValue ; index++) {
			returnArr.push(index);
		}
	}
	return returnArr
}


const Paginate = ({
  payload,
  icons,
  topMargin,
  boxProps,
  range,
  render,
  barWidth,
}) => {
  const [page, setPage] = useState(1);

  const pageRef = useRef(Math.ceil(payload.length / range));

  const selectRef = useRef();

  const rangeRef = useRef(range)

  const arrayRange = useMemo(
    () =>
      payload?.filter((entry) => {
        let index = payload.indexOf(entry);
        return index >= (page - 1) * rangeRef.current && index + 1 <= page * rangeRef.current;
      }),
    [page,payload]
  );

  return (
    <Box>
      {render(arrayRange)}

      {pageRef.current > 1 && (
        <Flex w='full' justify={'center'} mt={'3em' || topMargin}>
          <Flex
            px={[0, '1em', '1.5em']}
            py='1em'
            borderY={'1px solid rgba(146, 146, 146,0.6)'}
            {...boxProps}
            flexBasis={['full', 'full', '85%', '75%']}
          >
            <Flex
              px={'0.5em'}
              borderRight={'2px solid rgba(146, 146, 146,0.3)'}
              pointerEvents={page === 1 ? 'none' : 'initial'}
              flex={[0.2, 0.2]}
              align={'center'}
              position='relative'
              opacity={page === 1 ? '0.5' : 'initial'}
              cursor='pointer'
              onClick={() => {
                selectRef.current.selectedIndex = page;
                setPage((page) => page - 1);
              }}
            >
              <Flex h='100%' top='0' align='center' right='0' zIndex={20}>
                <AiFillCaretLeft />
              </Flex>

              <Text marginX='auto' fontSize='14px'>
                Previous
              </Text>
            </Flex>

            <Flex flex={[0.7, 0.7]} justify='center' align='center'>
              <Text fontSize={'11px'}>Page</Text>
              <Select
                px='0.5em'
                mt='0.1em'
                border={'1px solid #E6E6E6'}
                borderRadius={'5px'}
                h='30px'
                ref={selectRef}
                fontSize={'13px'}
                onChange={(e) => setPage(+e.target.value)}
                maxW='90px'
                icon={<MdKeyboardArrowDown fontSize={'14px'} />}
              >
                {returnNumberArray(pageRef.current).map((key) => (
                  <option key={key} value={key + ''}>
                    {key + ''}{' '}
                  </option>
                ))}
              </Select>

              <Text fontSize={'11px'}>of {pageRef.current}</Text>
            </Flex>

            <Flex
              cursor='pointer'
              onClick={() => {
                selectRef.current.selectedIndex = page;
                setPage((page) => page + 1);
              }}
              pointerEvents={page === pageRef.current ? 'none' : 'initial'}
              px={'0.5em'}
              borderLeft={'2px solid rgba(146, 146, 146,0.3)'}
              flex={[0.2, 0.2]}
              align={'center'}
              position='relative'
            >
              <Text marginX='auto' fontSize='14px'>
                Next
              </Text>

              <Flex h='100%' top='0' align='center' right='0' zIndex={20}>
                <AiFillCaretRight />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default Paginate;
