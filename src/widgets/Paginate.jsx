import { Box, Flex, Text, Select, Show, Divider } from '@chakra-ui/react'
import { useMemo, useRef, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { AiFillCaretRight, AiFillCaretLeft } from 'react-icons/ai'

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

  const pageRef = useRef(Math.ceil(payload.length / range))

  const selectRef = useRef()

  const rangeRef = useRef(range)

  const arrayRange = useMemo(
    () =>
      payload?.filter((entry) => {
        let index = payload.indexOf(entry)
        return index >= (page - 1) * rangeRef.current && index + 1 <= page * rangeRef.current;
      }),
    [page,payload]
  );

  return (
    <Box>
      {render(arrayRange)}

      {pageRef.current > 1 && (
        <Flex w="full" justify={"center"} mt={"3em" || topMargin}>
          <Flex
            py="2rem"
            borderRadius={"10px"}
            border={"1px solid #f7f7f7"}
            align="center"
            justify={"space-around"}
            {...boxProps}
            flexBasis={["full", "full"]}>
            <Flex
              px={"0.5em"}
              pointerEvents={page === 1 ? "none" : "initial"}
              pr={["1rem", "5rem"]}
              opacity={page === 1 ? "0.3" : "initial"}
              cursor="pointer"
              onClick={() => {
                selectRef.current.selectedIndex = page;
                setPage((page) => page - 1);
              }}>
              <Flex align="center" w="fit-content">
                <AiFillCaretLeft />
                <Text marginX="auto" fontSize="14">
                  Previous
                </Text>
              </Flex>
            </Flex>

            <Divider orientation='vertical' borderColor="#f7f7f7" borderWidth="1px"/>

            <Flex flex={[0.7, 0.7]} justify="center" align="center">
              <Show above="md">
                <Text fontSize={"11px"}>Page</Text>
              </Show>
              <Select
                px="0em"
                mx="2"
                border={"1px solid #f7f7f7"}
                borderRadius={"5px"}
                h="30px"
                ref={selectRef}
                fontSize={"13px"}
                onChange={(e) => setPage(+e.target.value)}
                maxW="100px"
                icon={<MdKeyboardArrowDown fontSize={"14px"} />}>
                {returnNumberArray(pageRef.current).map((key) => (
                  <option key={key} value={key + ""}>
                    {key + ""}{" "}
                  </option>
                ))}
              </Select>
              <Show above="md">
                <Text fontSize={"11px"}>of {pageRef.current}</Text>
              </Show>
            </Flex>

            <Divider orientation='vertical' borderColor="#f7f7f7" borderWidth="1px"/>    

            <Flex
              cursor="pointer"
              onClick={() => {
                selectRef.current.selectedIndex = page;
                setPage((page) => page + 1);
              }}
              pointerEvents={page === pageRef.current ? "none" : "initial"}
              opacity={page === pageRef.current ? "0.3" : "initial"}
              pl={["1rem", "5rem"]}
              align={"center"}>
              <Flex align="center" w="fit-content">
                <Text marginX="auto" fontSize="14">
                  Next
                </Text>
                <AiFillCaretRight />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default Paginate
