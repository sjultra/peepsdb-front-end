import {
  Table,
  Thead,
  Tr,
  Th,
  TableContainer,
  Tbody,
  Td,
} from "@chakra-ui/react"

const TableComponent = ({
  children,

  paginate,

  limit,

  headers,

  body,

  renderBody,

  bodyEntries,
}) => {
  return (
    <TableContainer mt="1em">
      <Table variant="simple">
        <Thead>
          <Tr>
            {headers.map((headerEntry, index) => (
              <Th py="0.8em" key={index} fontSize={"14px"}>
                {headerEntry}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {renderBody
            ? renderBody()
            : body?.map((entry, index) => {
                return (
                  <Tr key={index}>
                    {bodyEntries.map((bodyEntry, index) => (
                      <Td key={index + 1} py="0.9em">
                        {entry[bodyEntry]}
                      </Td>
                    ))}
                  </Tr>
                )
              })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TableComponent
