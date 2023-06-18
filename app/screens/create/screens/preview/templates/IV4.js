const calculateSubtotal = (price, quantity) => price * quantity

export const IV4 = (profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note) => {
  const html = `
<html lang="en">
<head>
  <style>
    @font-face {
      font-family: Junge;
      src: url(Junge-Regular.ttf);
    }

    .clearfix:after {
      content: "";
      display: table;
      clear: both;
    }

    a {
      color: #001028;
      text-decoration: none;
    }

    body {
      font-family: Junge;
      position: relative;
      width: 21cm;
      height: 29.7cm;
      margin: 0 auto;
      color: #001028;
      background: #FFFFFF;
      font-size: 14px;
    }

    .arrow {
      margin-bottom: 4px;
    }

    .arrow.back {
      text-align: right;
    }

    .inner-arrow {
      padding-right: 10px;
      height: 30px;
      display: inline-block;
      background-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 125, 49)'};
      text-align: center;

      line-height: 30px;
      vertical-align: middle;
      color: #ffffff
    }

    .inner-arrow a {
      color: #ffffff
    }

    .arrow.back .inner-arrow {
      background-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 217, 49)'};
      padding-right: 0;
      padding-left: 10px;
    }

    .arrow:before,
    .arrow:after {
      content: '';
      display: inline-block;
      width: 0;
      height: 0;
      border: 15px solid transparent;
      vertical-align: middle;
    }

    .arrow:before {
      border-top-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 125, 49)'};
      border-bottom-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 125, 49)'};
      border-right-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 125, 49)'};
    }

    .arrow.back:before {
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-right-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 217, 49)'};
      border-left-color: transparent;
    }

    .arrow:after {
      border-left-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 125, 49)'};
    }

    .arrow.back:after {
      border-left-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 217, 49)'};
      border-top-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 217, 49)'};
      border-bottom-color: ${profile?.invoiceColor ? profile?.invoiceColor : 'rgb(233, 217, 49)'};
      border-right-color: transparent;
    }

    .arrow span {
      display: inline-block;
      width: 80px;
      margin-right: 20px;
      text-align: right;
    }

    .arrow.back span {
      margin-right: 0;
      margin-left: 20px;
      text-align: left;
      color: #ffffff
    }

    h1 {
      color: #5D6975;
      font-family: Junge;
      font-size: 2.4em;
      line-height: 1.4em;
      font-weight: normal;
      text-align: center;
      border-top: 1px solid #5D6975;
      border-bottom: 1px solid #5D6975;
      margin: 0 0 2em 0;
    }

    h1 small {
      font-size: 0.45em;
      line-height: 1.5em;
      float: left;
    }

    h1 small:last-child {
      float: right;
    }

    #project {
      float: left;
    }

    #company {
      float: right;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      margin-bottom: 30px;
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

    table td.sub {
      border-top: 1px solid #C1CED9;
    }

    table td.grand {
      border-top: 1px solid #5D6975;
    }

    table tr:nth-child(2n-1) td {
      background: #EEEEEE;
    }

    table tr:last-child td {
      background: #DDDDDD;
    }

    #details {
      margin-bottom: 30px;
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
  <main>
    <h1 class="clearfix"><small><span>DATE</span><br />${new Date(date).toDateString()}</small> INVOICE ${invoiceId} <small style="width: 100px"><span></span><br /></small></h1>
    <table>
      <thead>
        <tr>
          <th class="service">Item</th>
          <th class="desc">Description</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Sub-Total</th>
        </tr>
      </thead>
      <tbody>
      ${items?.map((item) => {
    return `
          <tr>
            <td class="service">${item.name}</td>
            <td class="desc">${item.description ? item.description : '...'}</td>
            <td class="unit">${item.quantity ? item.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '...'}</td>
            <td class="qty">$${item.price ? item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '...'}</td>
            <td class="total">$${calculateSubtotal(item.price, item.quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
          </tr>
                        `
  }).join('')
    }
        <tr>
          <td colspan="4" class="sub">SUBTOTAL</td>
          <td class="sub total">$${subTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
        <tr>
          <td colspan="4">TAX ${vat}%</td>
          <td class="total">$${vat?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
        <tr>
          <td colspan="4" class="grand total">GRAND TOTAL</td>
          <td class="grand total">$${total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        </tr>
      </tbody>
    </table>
    <div id="details" class="clearfix">
      <div id="project">
        <div class="arrow" style="display: ${invoiceContact?.name ? 'flex' : 'none'};">
          <div class="inner-arrow"><span>CLIENT</span> ${invoiceContact?.name}</div>
        </div>
        <div class="arrow" style="display: ${invoiceContact?.address ? 'initial' : 'none'}">
          <div class="inner-arrow"><span>ADDRESS</span>${invoiceContact?.address ? (`${invoiceContact?.address} ${invoiceContact?.city ? `, ${invoiceContact?.city}` : ''} ${invoiceContact?.state ? invoiceContact?.state : ''} ${invoiceContact?.country ? `, ${invoiceContact?.country}` : ''}`) : ''}</div>
        </div>
        <div class="arrow" style="display: ${invoiceContact?.phoneNumbers[0]?.number ? 'flex' : 'none'};">
          <div class="inner-arrow"><span>PHONE</span> ${invoiceContact?.phoneNumbers[0]?.number}</div>
        </div>
        <div class="arrow" style="display: ${invoiceContact?.email ? 'initial' : 'none'}">
          <div class="inner-arrow"><span>EMAIL</span> <a href="mailto:${invoiceContact?.email}">${invoiceContact?.email}">${invoiceContact?.email}">${invoiceContact?.email}</a></div>
        </div>
      </div>
      <div id="company" style="display: flex; flex-direction: column; align-items: flex-end;">
        <div class="arrow back" style="display: ${profile?.name ? 'initial' : 'none'}">
          <div class="inner-arrow">${profile?.name} <span>COMPANY</span></div>
        </div>
        <div class="arrow back" ${profile?.contact ? '' : 'none'}">
          <div class="inner-arrow">${profile?.contact} <span>PHONE</span></div>
        </div>
        <div class="arrow back" ${profile?.email ? '' : 'none'}">
          <div class="inner-arrow"><a href="mailto:${profile?.email}">${profile?.email}</a> <span>EMAIL</span></div>
        </div>
      </div>
    </div>
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