const cantiTag=document.getElementById('canti');
const subtotTag=document.getElementById('subtot');
const totalTag=document.getElementById('total');

const refresh=()=>{
    let canti = 0;
    let total = 0;
    let totalu = 0;
    const items=document.getElementsByName('items')
    items.forEach(item => {
        const count = item.querySelector('span[name=count').innerText
        const totalp = item.querySelector('p[name=totalp').innerText
        canti += parseInt(count)
        total += Number(totalp)
    })
    if (items.length === 0 || canti === 0) {
        cantiTag.innerText = '0'
        subtotTag.innerText = '0.00'
        totalTag.innerText = '0.00'
        pagar.addEventListener("click", () => {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "No hay productos seleccionados!",
            showConfirmButton: false,
            timer: 3000
          });
        })
    }else{
        cantiTag.innerText = canti
        subtotTag.innerText = total.toFixed(2)
        totalTag.innerText = total.toFixed(2)
        pagar.addEventListener("click", () => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Muchas Gracias por tu compra",
            showConfirmButton: false,
            timer: 3000
          });
        })  
    }
}


const add = (product_id, cart_price)=>{
    console.log(cart_price);
    const count= document.getElementById(`count-${product_id}`)
    count.innerText=parseInt(count.innerText) + 1
    totalu = Number(cart_price * parseInt(count.innerText)).toFixed(2)
    document.getElementById(`total-${product_id}`).innerHTML = totalu;
    refresh()
}


const subs =(product_id, cart_price)=>{
    const count= document.getElementById(`count-${product_id}`)
    if (parseInt(count.innerText) >= 1)
       count.innerText=parseInt(count.innerText) - 1;
       totalu = Number(cart_price * parseInt(count.innerText)).toFixed(2)
       document.getElementById(`total-${product_id}`).innerHTML = totalu;
       refresh()
}


const remove=(product_id)=> {
const count= document.getElementById(`count-${product_id}`)
if (parseInt(count.innerText) >= 1)
   count.innerText=0;
   totalu = 0.00
   document.getElementById(`total-${product_id}`).innerHTML = totalu;
   document.getElementById(`item-${product_id}`).remove()
   refresh()
}

refresh()






