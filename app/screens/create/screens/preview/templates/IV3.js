const calculateSubtotal = (price, quantity) => price * quantity

export const IV3 = (profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note) => {
  const html = `
<html lang="en">

<head>
  <style>
    @font-face {
      font-family: SourceSansPro;
      src: url(SourceSansPro-Regular.ttf);
    }

    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }

    a {
      color: #${profile?.invoiceColor ? profile?.invoiceColor : '0087C3'};
      text-decoration: none;
    }

    body {
      position: relative;
      width: 21cm;
      height: 29.7cm;
      margin: 0 auto;
      color: #555555;
      background: #FFFFFF;
      font-family: Arial, sans-serif;
      font-size: 14px;
      font-family: SourceSansPro;
    }

    header {
      padding: 10px 0;
      margin-bottom: 20px;
      border-bottom: 1px solid #AAAAAA;
    }

    #logo {
      float: left;
      margin-top: 8px;
    }

    #logo img {
      height: 70px;
    }

    #company {
      float: right;
      text-align: right;
    }


    #details {
      margin-bottom: 50px;
    }

    #client {
      padding-left: 6px;
      border-left: 6px solid #${profile?.invoiceColor ? profile?.invoiceColor : '0087C3'};
      float: left;
    }

    #client .to {
      color: #777777;
    }

    h2.name {
      font-size: 1.4em;
      font-weight: normal;
      margin: 0;
    }

    #invoice {
      float: right;
      text-align: right;
    }

    #invoice h1 {
      color: #${profile?.invoiceColor ? profile?.invoiceColor : '0087C3'};
      font-size: 2.4em;
      line-height: 1em;
      font-weight: normal;
      margin: 0 0 10px 0;
    }

    #invoice .date {
      font-size: 1.1em;
      color: #777777;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }

    table th,
    table td {
      padding: 20px;
      background: #EEEEEE;
      text-align: center;
      border-bottom: 1px solid #FFFFFF;
    }

    table th {
      white-space: nowrap;
      font-weight: normal;
    }

    table td {
      text-align: right;
    }

    table td h3 {
      color: #${profile?.invoiceColor ? profile?.invoiceColor : '57B223'};
      font-size: 1.2em;
      font-weight: normal;
      margin: 0 0 0.2em 0;
    }

    table .no {
      color: #FFFFFF;
      background: #${profile?.invoiceColor ? profile?.invoiceColor : '57B223'};
    }

    table .desc {
      text-align: left;
    }

    table .unit {
      background: #DDDDDD;
    }

    table .qty {}

    table .total {
      background: #${profile?.invoiceColor ? profile?.invoiceColor : '57B223'};
      color: #FFFFFF;
    }

    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }

    table tbody tr:last-child td {
      border: none;
    }

    table tfoot td {
      padding: 10px 20px;
      background: #FFFFFF;
      border-bottom: none;
      font-size: 1.2em;
      white-space: nowrap;
      border-top: 1px solid #AAAAAA;
    }

    table tfoot tr:first-child td {
      border-top: none;
    }

    table tfoot tr:last-child td {
      color: #${profile?.invoiceColor ? profile?.invoiceColor : '57B223'};
      font-size: 1.4em;
      border-top: 1px solid #${profile?.invoiceColor ? profile?.invoiceColor : '57B223'};

    }

    table tfoot tr td:first-child {
      border: none;
    }

    #thanks {
      font-size: 2em;
      margin-bottom: 50px;
    }

    #notices {
      padding-left: 6px;
      border-left: 6px solid #${profile?.invoiceColor ? profile?.invoiceColor : '0087C3'};
    }

    #notices .notice {
      font-size: 1.2em;
    }

    footer {
      color: #777777;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #AAAAAA;
      padding: 8px 0;
      text-align: center;
    }
  </style>
</head>

<body style="width: 700px; max-width: 98%; margin: 20px auto;">
  <header class="clearfix">
    <div id="logo">
      <img src="${profile?.photoURL}" style="width: 80px; margin-right: .5em; display: ${profile?.photoURL ? 'initial' : 'none'}">
    </div>
    <div id="company">
      <h2 class="name" style="display: ${profile?.name ? 'initial' : 'none'}">${profile?.name}</h2>
      <div style="display: ${profile?.photoURL ? '' : 'none'}">${profile?.address}</div>
      <div style="display: ${profile?.website ? 'initial' : 'none'}>${profile?.website}</div>
      <div><a href="mailto:${profile?.email}">${profile?.email}</a></div>
    </div>
    </div>
  </header>
  <main>
    <div id="details" class="clearfix">
      <div id="client">
        <div class="to">INVOICE TO:</div>
        <h2 class="name" style="display: ${invoiceContact?.name ? 'flex' : 'none'};">${invoiceContact?.name}</h2>
        <div class="address" style="display: ${invoiceContact?.address ? 'initial' : 'none'}">${invoiceContact?.address ? (`${invoiceContact?.address} ${invoiceContact?.city ? `, ${invoiceContact?.city}` : ''} ${invoiceContact?.state ? invoiceContact?.state : ''} ${invoiceContact?.country ? `, ${invoiceContact?.country}` : ''}`) : ''}</div>
        <div class="email" style="display: ${invoiceContact?.phoneNumbers[0]?.number ? 'flex' : 'none'};">${invoiceContact?.phoneNumbers[0]?.number}</div>
        <div class="email" style="display: ${invoiceContact?.email ? 'initial' : 'none'}"><a href="mailto:${invoiceContact?.email}">${invoiceContact?.email}</a></div>
      </div>
      <div id="invoice">
        <h1>INVOICE ${invoiceId}</h1>
        <div class="date">Date of Invoice: ${new Date(date).toDateString()}</div>
      </div>
    </div>
    <table border="0" cellspacing="0" cellpadding="0">
      <thead>
        <tr>
          <th class="no">Item</th>
          <th class="desc">Description</th>
          <th class="unit">Quantity</th>
          <th class="qty">Unit Price</th>
          <th class="total">Sub-Total</th>
        </tr>
      </thead>
      <tbody>
      ${items?.map((item) => {
    return `
                        <tr>
                        <td class="no">${item.name}</td>
                        <td class="desc">${item.description ? item.description : '...'}</td>
                        <td class="unit">${item.quantity ? item.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</td>
                        <td class="qty">$${item.price ? item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</td>
                        <td class="total">$${calculateSubtotal(item.price, item.quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        </tr>
                        `
  }).join('')
    }
      <tfoot>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">SUBTOTAL</td>
          <td>$${subTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">TAX ${vat}%</td>
          <td>$${vat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
        <tr>
          <td colspan="2"></td>
          <td colspan="2">GRAND TOTAL</td>
          <td>$${total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
      </tfoot>
    </table>
    <div id="thanks">Thank you!</div>
    <div id="notices">
      <div>NOTICE:</div>
      <div class="notice">${note != '' ? note : profile?.disclaimer}</div>
    </div>
  </main>
  <footer>
    Invoice was created on a computer and is valid without the signature and seal.
  </footer>
</body>

</html>
    `

  return html
}