import { useState, useEffect } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { Table } from '../common/table/table';
import { useRightPane } from '../common/right-panel/context';
import { IndependentVendor, BusinessVendor, VendorType } from '../../services/vendors/types';
import { fetchVendors } from '../../services/vendors/api';
import { vendorImage, renderBodyCell, statusMap } from '../../utils/utils';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PersonIcon from '@mui/icons-material/Person';

export const UsersPage = () => {
  const { open } = useRightPane();
  const [vendors, setVendors] = useState<Array<IndependentVendor | BusinessVendor>>([]);

  const cellContentLeft = (row: IndependentVendor | BusinessVendor, column: string) => {
    if (column === 'vendor') {
      return (
        <Box display="flex">
          {row.vendorType === VendorType.independent ? <PersonIcon /> : <ApartmentIcon />}
        </Box>
      );
    } else if (column === 'name') {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      return (
        <Box display="flex">
          <img src={vendorImage(randomNumber)} alt="Vendor" />
        </Box>
      );
    }
  };

  const rowContent = (row: IndependentVendor | BusinessVendor) => {
    console.log(row);
    const accountStatusContentStyle = {
      borderRadius: '10px',
      padding: '6px 8px',
      width: 'fit-content',
      backgroundColor: statusMap[row.accountStatus].backgroundColor,
      color: statusMap[row.accountStatus].color
    };

    const labelAndContentStyle = {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    };

    const labelStyle = {
      fontSize: '1.5rem'
    };

    return (
      <Box>
        <Box sx={{ padding: '30px 0px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {cellContentLeft(row, 'vendor')}
            <Typography variant='h5'>{row.vendor}</Typography>
          </Box>
          <Box>
            <Typography variant='h6' color='#ff0000'>Unknown</Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ padding: '24px 0px', display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={labelAndContentStyle}>
            <Box>AMOUNT:</Box>
            <Box component="span">
              <Typography variant="h5">{renderBodyCell(row, 'amount')}</Typography>
            </Box>
          </Box>
          <Box sx={labelAndContentStyle}>
            <Box>DATE:</Box>
            <Box component="span" sx={labelStyle}>{renderBodyCell(row, 'date')}</Box>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ padding: '24px 0px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
          <Box sx={{ display: 'flex', justifyContent: row.vendorType === VendorType.business ? 'space-between' : 'flex-start' }}>
            <Box sx={labelAndContentStyle}>
              <Box>STATUS:</Box>
              <Box component="span" sx={accountStatusContentStyle}>
                {renderBodyCell(row, 'accountStatus')}
              </Box>
            </Box>
            {row.vendorType === VendorType.business && (
              <Box sx={labelAndContentStyle}>
                <Box>EXCHANGE RATE:</Box>
                <Box component="span" sx={labelStyle}>
                  {renderBodyCell(row, 'exchangeRate')}
                </Box>
              </Box>
            )}
          </Box>
          {row.vendorType === VendorType.independent && (
            <Box sx={labelAndContentStyle}>
              <Box>COMMENT:</Box>
              <Box>{row.comment}</Box>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between', gap: '16px', border: '1px solid #9C27B0', borderRadius: '5px', padding: '16px' }}>
            {<Box>{row.vendorType === VendorType.business ? 'ACCOUNT NUMBER' : 'PHONE NUMBER'}</Box>}
            {<Box color='#9C27B0'>{row.vendorType === VendorType.business ? row.accountNumber : row.phoneNumber}</Box>}
          </Box>
          {row.vendorType === VendorType.business && (
            <>
              <Box sx={labelAndContentStyle}>
                <Box>PAID BY:</Box>
                <Box>{row.paidBy}</Box>
              </Box>
              <Box sx={labelAndContentStyle}>
                <Box>PAYMENT:</Box>
                <Box color='#ff0000'>Unknown</Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    );
  };

  const handleRowClicked = (row: IndependentVendor | BusinessVendor) => {
    open(<Box margin={3}>{rowContent(row)}</Box>);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchVendors();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching vendors:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h3" sx={{ margin: '40px 0px' }}>Business Checking</Typography>
      <Table<IndependentVendor | BusinessVendor>
        itemIdentifier='name'
        columns={['name', 'date', 'vendor', 'accountStatus', 'amount']}
        items={vendors}
        headCell={{
          render: (column) => {
            const words = column.replace(/([a-z])([A-Z])/g, '$1 $2');
            return words.charAt(0).toUpperCase() + words.slice(1).toLowerCase();
          },
        }}
        bodyCell={{
          render: (row, column) => {
            const cellContent = row[column as keyof typeof row];
            const accountStatusContentStyle = column === 'accountStatus' ? { borderRadius: '10px', padding: '6px 8px', width: 'fit-content', backgroundColor: statusMap[cellContent as number].backgroundColor, color: statusMap[cellContent as number].color } : {};
            const cellContentWrapperStyle = column === 'vendor' || column === 'name' ? { display: 'flex', alignItems: 'center', gap: '4px' } : {};
            return (
              <Box sx={cellContentWrapperStyle}>
                {cellContentLeft(row, column)}
                <Box component="span" sx={accountStatusContentStyle}>
                  {renderBodyCell(row, column)}
                </Box>
              </Box>
            );
          },
          props: { align: 'left' }
        }}
        rowClicked={handleRowClicked}
      />
    </Box>
  );
};