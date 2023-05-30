const calculateSubtotal = (price, quantity) => price * quantity

export const IV1 = (profile, order, date, invoiceContact, paymentTerms, items, subTotal, vat, total, note) => {
    const html = `
    <html lang="en">
    <body style="width: 700px; max-width: 98%; margin: 20px auto;">
        <style>
            * {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
    
            table,
            th,
            td {
                border: 1px solid rgba(0, 0, 0, 0.4);
                border-collapse: collapse;
            }
    
            td {
                padding: .5em;
            }
        </style>
        <nav style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <img src="${profile?.photoURL}" alt="" style="width: 80px; margin-right: .5em; display: ${profile?.photoURL ? 'initial' : 'none'}">
                <div>
                    <p style="font-size: 0.6rem; color: #0374E5; font-weight: 700; margin-bottom: .4em; display: ${profile?.name ? 'initial' : 'none'}">${profile?.name}</p>
                    <p style="font-size: 0.6rem; color: #0374E5; margin-bottom: .4em; display: ${profile?.photoURL ? '' : 'none'}">${profile?.address}</p>
                    <p style="font-size: 0.6rem; color: #0374E5; margin-bottom: .4em; display: ${profile?.website ? 'initial' : 'none'}">${profile?.website}</p>
                    <div>
                        <p
                            style="display: flex; justify-content: flex-start; align-items: center; font-size: 0.6rem; color: #0374E5;">
                            <span style="width: 50px; margin-bottom: .4em;">Email</span>
                            <span>${profile?.email}</span>
                        </p>
                        <p
                            style="display: flex; justify-content: flex-start; align-items: center; font-size: 0.6rem; color: #0374E5;">
                            <span style="width: 50px; margin-bottom: .4em;">Tel</span> <span>${profile?.contact}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div style="width: 250px;">
                <p style="font-size: 1.7rem; text-align: right; margin-right: .4em;">Sales Order</p>
                <div style="border: 1px solid rgba(0, 0, 0, 0.4); margin: 0; padding: .5em;">
                    <p
                        style="width: 100%; display: flex; justify-content: space-between; align-items: center; font-size: .8rem;">
                        <span style="color: #0374E5;">Order #</span><span>${order}</span>
                    </p>
                    <p
                        style="width: 100%; display: flex; justify-content: space-between; align-items: center; font-size: .8rem;">
                        <span style="color: #0374E5;">Date</span><span>${new Date(date).toDateString()}</span>
                    </p>
                </div>
            </div>
        </nav>
    
        <div
            style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; margin-top: 2em;">
            <div style="width: 50%; display: ${invoiceContact?.name ? 'flex' : 'none'}; justify-content: flex-start; align-items: flex-start;">
                <span style="font-size: .8rem; color: #0374E5;">Customer</span>
    
                <div style="margin-left: 90px;">
                    <p style="font-size: .8rem; font-weight: 700; width: 150px;">${invoiceContact?.name}</p>
                    <p style="font-size: .8rem; width: 150px; display: ${invoiceContact?.address ? 'initial' : 'none'}">${invoiceContact?.address ? (`${invoiceContact?.address} ${invoiceContact?.city ? `, ${invoiceContact?.city}` : ''} ${invoiceContact?.state ? invoiceContact?.state : ''} ${invoiceContact?.country ? `, ${invoiceContact?.country}` : ''}`) : ''}</p>
                </div>
            </div>
            <div
                style="width: 50%; display: ${invoiceContact?.phoneNumbers[0]?.number ? 'flex' : 'none'}; justify-content: flex-start; align-items: flex-start;">
                <span style="font-size: .8rem; color: #0374E5;">Contact</span>
    
                <div style="margin-left: 90px;">
                    <p style="font-size: .8rem; width: 150px;">${invoiceContact?.phoneNumbers[0]?.number}</p>
                    <p style="font-size: .8rem; width: 150px; display: ${invoiceContact?.email ? 'initial' : 'none'}">${invoiceContact?.email}</p>
                </div>
            </div>
        </div>
    
        <table style="width: 100%; margin-top: 2em;">
            <tr style="background-color: #E1E1E1;">
                <td style="font-size: .8rem; color: #0374E5;">Item</td>
                <td style="font-size: .8rem; color: #0374E5;">Description</td>
                <td style="font-size: .8rem; color: #0374E5;">Quantity</td>
                <td style="font-size: .8rem; color: #0374E5;">Unit Price</td>
                <td style="font-size: .8rem; color: #0374E5;">Sub-Total</td>
            </tr>
            ${items.map((item) => {
        return `
                        <tr>
                            <td style="font-size: .8rem;">${item.name}</td>
                            <td style="font-size: .8rem;">${item.description ? item.description : ''}</td>
                            <td style="font-size: .8rem;">${item.quantity ? item.quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</td>
                            <td style="font-size: .8rem;">$ ${item.price ? item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''}</td>
                            <td style="font-size: .8rem;">$ ${calculateSubtotal(item.price, item.quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                        </tr>
                        `
    }).join('')
        }
        </table>
    
        <div style="margin-top: 2em; width: 100%; display: flex; justify-content: flex-end; align-items: flex-start;">
            <table style="border: none;">
                <tr>
                    <td style="border: none; width: 100px; font-size: .8rem; color: #0374E5;">Sub-Total</td>
                    <td style="font-size: .8rem; text-align: right;">$ ${subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                    <td style="border: none; width: 100px; font-size: .8rem; color: #0374E5;">VAT (${vat}%)</td>
                    <td style="font-size: .8rem; text-align: right;">$ ${vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                    <td style="border: none; width: 100px; color: #0374E5; font-size: 1rem;">Total</td>
                    <td style="font-size: 1rem; text-align: right;">$ ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
            </table>
        </div>
        <div style="width: 100%; text-align: center; border: 1px solid black; padding: .3em; margin-top: 2em;">
              <strong>Note: </strong> <span style="font-size: 0.5rem">${note != '' ? note : profile?.disclaimer}</span>
          </div>
    </body>
    </html>
    `

    return html
}