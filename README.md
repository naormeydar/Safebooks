## Safebooks AI Home Assignment

### Intro

Develop a webpage that fetches and displays a list of companies in a table format. Upon clicking on a table row, a side panel should emerge, showcasing the profile card of the selected company. It's important to note that both the icon in the Vendor column and the design of the side panel component are determined by the `vendorType`.

the design should support 2 breakpoints, provided on the figma asset.

### Getting Started

install

```
npm i
```

run

```
npm start // go to localhost:3000 to view the app running
```

### Assets

- base `Table` component & `useRightPane` usage [example](https://github.com/safebooks-ai/frontend-assignment/blob/main/src/components/pages/vendors-page.tsx)
- [fetchVendors](https://github.com/safebooks-ai/frontend-assignment/blob/main/src/services/vendors/api.ts)
- [figma](https://www.figma.com/file/7tI9RAtDXee922Um9IytUc/Table?type=design&node-id=3-1719&mode=design&t=roOh95DgLYErKSDl-0)

### General comments:

- no subtitle field provided (need to be under the vendor's name in the right panel)
- no Payment field provided for IndependentVendor type (need to be under PAYMENT in the right panel for independent vendor)
- values VendorType enums have been change: business is 1, independent is 2
