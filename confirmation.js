const getOrderId = () => {
    return new URL(window.location.href).searchParams.get('order');
}

const getOrderFirstName = () => {
    return new URL(window.location.href).searchParams.get('firstName');
}

const orderId = getOrderId();
const orderName = getOrderFirstName();
console.log(orderId)

const orderTest = document.querySelector('.order');
orderTest.textContent = orderId;
const orderFirstName = document.querySelector('.firstName');
orderFirstName.textContent = orderName;