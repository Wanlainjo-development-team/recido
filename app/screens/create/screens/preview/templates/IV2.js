const calculateSubtotal = (price, quantity) => price * quantity

export const IV2 = (profile, order, date, invoiceContact, items, subTotal, vat, total, note) => {
  const html = `
<html lang="en">
<head>
  <style>
    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }

    a {
      color: #5D6975;
      text-decoration: underline;
    }

    body {
      position: relative;
      width: 21cm;
      height: 29.7cm;
      margin: 0 auto;
      color: #001028;
      background: #FFFFFF;
      font-family: Arial, sans-serif;
      font-size: 12px;
      font-family: Arial;
    }

    header {
      padding: 10px 0;
      margin-bottom: 30px;
    }

    #logo {
      text-align: center;
      margin-bottom: 10px;
    }

    #logo img {
      width: 90px;
    }

    h1 {
      border-top: 1px solid #5D6975;
      border-bottom: 1px solid #5D6975;
      color: #5D6975;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      margin: 0 0 20px 0;
      background: url(dimension.png);
    }

    #project {
      float: left;
    }

    #project span {
      color: #5D6975;
      text-align: right;
      width: 52px;
      margin-right: 10px;
      display: inline-block;
      font-size: 0.8em;
    }

    #company {
      float: right;
      text-align: right;
    }

    #project div,
    #company div {
      white-space: nowrap;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 20px;
    }

    table tr:nth-child(2n-1) td {
      background: #F5F5F5;
    }

    table th,
    table td {
      text-align: center;
    }

    table th {
      padding: 5px 20px;
      color: #5D6975;
      border-bottom: 1px solid #C1CED9;
      white-space: nowrap;
      font-weight: normal;
    }

    table .service,
    table .desc {
      text-align: left;
    }

    table td {
      padding: 20px;
      text-align: right;
    }

    table td.service,
    table td.desc {
      vertical-align: top;
    }

    table td.unit,
    table td.qty,
    table td.total {
      font-size: 1.2em;
    }

    table td.grand {
      border-top: 1px solid #5D6975;
      ;
    }

    #notices .notice {
      color: #5D6975;
      font-size: 1.2em;
    }

    footer {
      color: #5D6975;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #C1CED9;
      padding: 8px 0;
      text-align: center;
    }
  </style>
</head>

<body style="width: 700px; max-width: 98%; margin: 20px auto;">
  <header class="clearfix">
    <div id="logo">
    <img src="${profile?.photoURL}">
    </div>
    <h1>INVOICE ${order}</h1>
    <div id="company" class="clearfix">
        <div>${profile?.name}</div>
        <div>${profile?.address}</div>
        <div>${profile?.contact}</div>
        <div><a href="mailto:${profile?.email}">${profile?.email}</a></div>
    </div>
    <div id="project">
        <div><span>CLIENT</span> ${invoiceContact?.name}</div>
        <div style="display: ${invoiceContact?.address ? 'initial' : 'none'}"><span>ADDRESS</span>${invoiceContact?.address ? (`${invoiceContact?.address} ${invoiceContact?.city ? `, ${invoiceContact?.city}` : ''} ${invoiceContact?.state ? invoiceContact?.state : ''} ${invoiceContact?.country ? `, ${invoiceContact?.country}` : ''}`) : ''}</div>
        <div><span>DATE</span>${new Date(date).toDateString()}</div>
    </div>
  </header>
  <main>
    <table style="display: ${items.length >= 1 ? 'initial' : 'none'}">
      <thead>
        <tr>
            <th style="text-transform: uppercase" class="service">ITEM</th>
            <th style="text-transform: uppercase" class="desc">DESCRIPTION</th>
            <th style="text-transform: uppercase">Quantity</th>
            <th style="text-transform: uppercase">Unit Price</th>
            <th style="text-transform: uppercase">Sub-Total</th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => {
    return `
                    <tr>
                        <td style="font-size: .8rem;">${item.name}</td>
                        <td style="font-size: .8rem;">${item.discription ? item.discription : '...'}</td>
                        <td style="font-size: .8rem;">${item.quantity ? item.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</td>
                        <td style="font-size: .8rem;">$ ${item.price ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</td>
                        <td style="font-size: .8rem;">$ ${calculateSubtotal(item.price, item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                    </tr>
                    `
  }).join('')
    }

        <tr>
          <td colspan="4">Sub-Total</td>
          <td class="total">$${subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
        <tr>
          <td colspan="4">TAX 25%</td>
          <td class="total">$${vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
        <tr>
          <td colspan="4" class="grand total">GRAND TOTAL</td>
          <td class="grand total">$${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
      </tbody>
    </table>
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