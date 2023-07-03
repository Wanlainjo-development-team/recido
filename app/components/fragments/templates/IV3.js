const calculateSubtotal = (price, quantity) => price * quantity

export const IV3 = (profile, invoiceId, date, invoiceContact, items, subTotal, vat, total, note) => {
  const html = `
  
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <style>
    * {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.8);
    }

    body {
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin: 0;
    }

    .container {
      width: 800px;
      max-width: 98%;
      padding: 2em;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #${profile?.invoiceColor != undefined ? profile?.invoiceColor : '4169e1'}30;
      padding-bottom: 1em;
    }

    nav .left {
      width: 200px;
    }

    nav .left .lists {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    nav .left .lists .heading {
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    nav .left .lists .text {
      font-size: 0.9rem;
      margin-bottom: 1em;
      text-align: left;
    }

    nav .right {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }

    nav .right .avatarContainer {
      min-width: 150px;
      height: 150px;
      background-color: rgba(0, 0, 0, 0.2509803922);
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    nav .right .avatarContainer img {
      -o-object-fit: cover;
      object-fit: cover;
      width: 150px;
      height: 150px;
    }

    nav .right .avatarContainer span {
      color: #ffffff;
      text-transform: uppercase;
      font-size: 1.5rem;
    }

    .billTo {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-top: 1em;
    }

    .billTo .left h6 {
      font-size: 0.7rem;
      text-transform: uppercase;
      margin: 0;
    }

    .billTo .left .customerName {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5em;
      margin-bottom: 1em;
    }

    .billTo .left .text {
      font-size: 0.9rem;
      margin: 0;
      margin-bottom: 0.3rem;
    }

    .billTo .right {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .billTo .right .heading {
      font-size: 1rem;
      font-weight: 600;
    }

    .billTo .right .text {
      font-size: 0.9rem;
      width: 150px;
      text-align: right;
      margin-bottom: 0.5em;
    }

    .invoice {
      display: flex;
      flex-direction: column;
    }

    .invoice .rows {
      margin-top: 1em;
    }

    .invoice .row {
      padding: 1em 0.5em;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: none;
    }

    .invoice .row:last-child {
      border-bottom: none;
    }

    .invoice .row:nth-child(odd) {
      background-color: #${profile?.invoiceColor != undefined ? profile?.invoiceColor : '4169e1'}20;
    }

    .invoice .row:nth-child(1) {
      background-color: #${profile?.invoiceColor != undefined ? profile?.invoiceColor : '4169e1'};
      border-bottom: none;
    }

    .invoice .row:nth-child(1) .col1,
    .invoice .row:nth-child(1) .col2,
    .invoice .row:nth-child(1) .col3,
    .invoice .row:nth-child(1) .col4 {
      font-weight: 600;
      color: #fff;
    }

    .invoice .row .col1,
    .invoice .row .col2,
    .invoice .row .col3,
    .invoice .row .col4 {
      font-size: 0.9rem;
    }

    .invoice .row .col1 {
      width: 60%;
      display: flex;
      flex-direction: column;
    }

    .invoice .row .col1 span:nth-child(1) {
      font-weight: 600;
    }

    .invoice .row .col1 span:nth-child(2) {
      font-size: 0.8rem;
    }

    .invoice .row .col2,
    .invoice .row .col3,
    .invoice .row .col4 {
      width: 13.3333333333%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .invoice .summary {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .invoice .summary .left,
    .invoice .summary .right {
      width: 50%;
    }

    .invoice .summary .right .row {
      border-bottom: 1px solid #${profile?.invoiceColor != undefined ? profile?.invoiceColor : '4169e1'}30;
    }

    .invoice .summary .right .row:nth-child(odd) {
      background-color: transparent;
    }

    .invoice .summary .right .row:nth-child(1) {
      border-bottom: none;
      background-color: #ffffff;
    }

    .invoice .summary .right .row:nth-child(1) .col1,
    .invoice .summary .right .row:nth-child(1) .col2 {
      font-weight: initial;
      color: rgba(0, 0, 0, 0.8);
    }

    .invoice .summary .right .row:last-child {
      border-bottom: none;
    }

    .invoice .summary .right .row:last-child .col2 {
      font-weight: 600;
    }

    .invoice .summary .right .row .col1 {
      font-size: 0.8rem;
      text-transform: uppercase;
      font-weight: 600;
    }

    .bottom {
      margin-top: 3em;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .bottom .defaultMessage,
    .bottom .discalimer {
      font-size: 0.9rem;
    }
  </style>
</head>

<body>
  <div class="container">
    <nav>
      <div class="left">
        <div class="lists">
          <span class="heading"> ${profile?.name} </span>
          <span class="text">${profile?.address}</span>
          <span class="text" style="display: ${profile?.contact != undefined ? 'flex' : 'none'}">${profile?.contact}</span>
          <span class="text">${profile?.email}</span>
        </div>
      </div>
      <div class="right">
        <div class="avatarContainer">
          <span style="display: ${profile?.photoURL ? 'none' : 'initial'}">Logo</span>
          <img style="display: ${!profile?.photoURL ? 'none' : 'initial'}" src="${profile?.photoURL}" alt="">
        </div>
      </div>
    </nav>

    <section class="billTo">
      <div class="left">
        <h6>Bill To</h6>

        <p class="customerName">${invoiceContact?.name || 'John Doe'}</p>

        <p class="text" style="display: ${invoiceContact?.address ? 'flex' : 'none'}">${invoiceContact?.address ? (`${invoiceContact?.address} ${invoiceContact?.city ? `, ${invoiceContact?.city}` : ''} ${invoiceContact?.state ? invoiceContact?.state : ''} ${invoiceContact?.country ? `, ${invoiceContact?.country}` : ''}`) : '' || '123456 Willson close'}</p>
        <p class="text">${invoiceContact?.phoneNumbers ? invoiceContact?.phoneNumbers[0]?.number : invoiceContact?.phone || '+234 009 3434 3434'}</p>
        <p class="text" style="display: ${invoiceContact?.email ? 'flex' : 'none'}">${invoiceContact?.email || 'someone@example.com'}</p>
      </div>

      <div class="right">
        <span class="heading">INVOICE</span>
        <span class="text">${invoiceId}</span>

        <span class="heading">Date</span>
        <span class="text">${new Date(date).toDateString()}</span>

        <span class="heading">Balance Due</span>
        <span class="text">${profile?.denom?.sign || '$'}${total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '2,000'}</span>
      </div>
    </section>

    <section class="invoice">
      <div class="rows">
        <div class="row">
          <div class="col1">DESCRIPTION</div>
          <div class="col2">RATE</div>
          <div class="col3">QTY</div>
          <div class="col4">AMOUNT</div>
        </div>

        ${items ?
      `
                ${items?.map((item) => {
        return `
                    <div class="row">
                                        <div class="col1">
                                            <span>${item?.name}</span>
                                            <span>${item?.description != '' ? item?.description : '...'}</span>
                                        </div>
                                        <div class="col2">${profile?.denom?.sign || '$'}${item?.price ? item?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</div>
                                        <div class="col3">${item?.quantity ? item?.quantity?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</div>
                                        <div class="col4">${profile?.denom?.sign || '$'}${calculateSubtotal(item?.price, item?.quantity)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                    </div>
                    `
      }).join('')
      }
                ` :
      `
            <div class="row">
            <div class="col1">
                <span>Item 1</span>
                <span>Some description for this item</span>
            </div>
            <div class="col2">$1,000</div>
            <div class="col3">2</div>
            <div class="col4">$2,000</div>
        </div>
            <div class="row">
            <div class="col1">
                <span>Item 1</span>
                <span>Some description for this item</span>
            </div>
            <div class="col2">$1,000</div>
            <div class="col3">2</div>
            <div class="col4">$2,000</div>
        </div>
            <div class="row">
            <div class="col1">
                <span>Item 1</span>
                <span>Some description for this item</span>
            </div>
            <div class="col2">$1,000</div>
            <div class="col3">2</div>
            <div class="col4">$2,000</div>
        </div>
        `
    }
      </div>

      <div class="summary">
        <div class="left"></div>
        <div class="right">
        <div class="row">
            <div class="col1">Subtotal</div>
            <div class="col2">${profile?.denom?.sign || '$'}${subTotal?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '1,000'}</div>
        </div>
        <div class="row">
            <div class="col1">total</div>
            <div class="col2">${profile?.denom?.sign || '$'}${total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '1,000'}</div>
        </div>
        <div class="row">
            <div class="col1">balance due</div>
            <div class="col2">${profile?.denom?.sign || '$'}${total?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '1,000'}</div>
        </div>
        </div>
      </div>
    </section>

    <section class="bottom">
      <p class="defaultMessage">${profile?.defaultEmailMessage}</p>
      <p class="discalimer">${profile?.disclaimer}</p>
    </section>
  </div>
</body>

</html>
    `

  return html
}