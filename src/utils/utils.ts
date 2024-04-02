import React from 'react';
import { AccountStatus, IndependentVendor, BusinessVendor } from '../services/vendors/types';
import avatar1 from '../assets/avatar-1.png';
import avatar2 from '../assets/avatar-2.png';
import avatar3 from '../assets/avatar-3.png';
import avatar4 from '../assets/avatar-4.png';
import avatar5 from '../assets/avatar-5.png';

export const vendorImage = (imageNumber: number): string => {
    switch (imageNumber) {
        case 1: return avatar1;
        case 2: return avatar2;
        case 3: return avatar3;
        case 4: return avatar4;
        default: return avatar5;
    }
}

export const renderBodyCell = (row: IndependentVendor | BusinessVendor, column: string): React.ReactNode => {
    const cellContent = row[column as keyof typeof row];
    if (column === 'exchangeRate') console.log(row);

    switch (column) {
        case 'date':
            const dateOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
            return new Date(cellContent as string).toLocaleDateString('en-US', dateOptions);
        case 'accountStatus':
            return statusMap[cellContent as number].label;
        case 'amount':
            return `$${cellContent}`;
        case 'exchangeRate':
            const from = (row as BusinessVendor).exchangeRate.from;
            const to = (row as BusinessVendor).exchangeRate.to;
            return `${currencyMap[from.currency]}${from.value} = ${currencyMap[to.currency]}${to.value}`;
        default:
            return String(cellContent);
    }
};

export const statusMap: { [key: number]: {label: string, backgroundColor: string, color: string} } = {
    [AccountStatus.Active]: {label: 'Active', backgroundColor: '#ebebeb', color: '#000000'},
    [AccountStatus.Inactive]: {label: 'Approved', backgroundColor: '#2e7e32', color: '#ffffff'},
    [AccountStatus.Pending]: {label: 'Pending Approval', backgroundColor: '#9c27b0', color: '#ffffff'},
    [AccountStatus.Suspended]: { label: 'Suspended', backgroundColor: '#ef6c02', color: '#ffffff'},
};

export const currencyMap: {[key: string]: string} = {
    ['USD']: '$',
    ['CAD']: '$',
    ['EUR']: '€',
    ['AOD']: '$',
    ['JPY']: '¥',
    ['GBP']: '£',
}
