const getCustomerDetails = async() => {
    const api_call = await fetch('http://localhost:5000/customer');
    let data = await api_call.json();
    console.log(data)
    return data;
}

getCustomerDetails();

const transfer = async(a, b, amountTransfered) => {
    const customerDetails = await getCustomerDetails();
    const customer1 = customerDetails.filter((item) => {
        return item.email === a
    });
    const customer2 = customerDetails.filter((item) => {
        return item.email === b
    });
    const customer1_id = customer1[0]._id;
    const customer2_id = customer2[0]._id;
    const customer1_newbalance = Number(customer1[0].balance) - Number(amountTransfered);
    const customer2_newbalance = Number(customer2[0].balance) + Number(amountTransfered);
    // updating customer 1
    axios.put(`http://localhost:5000/customer/update/${customer1_id}`, {
        name: customer1[0].name,
        email: customer1[0].email,
        balance: customer1_newbalance
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => console.log(err));
    
    // updating customer 2
    axios.put(`http://localhost:5000/customer/update/${customer2_id}`, {
        name: customer2[0].name,
        email: customer2[0].email,
        balance: customer2_newbalance
    })
    .then(res => {
        console.log(res)
    }) 
    .catch(err => console.log(err));
}